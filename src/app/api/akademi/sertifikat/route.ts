// Server penerbit sertifikat jenjang RINOYA Academy (Sekolah Tahap 1).
//
// POST { memberId, level }  + header Authorization: Bearer <token sesi Supabase>
//   1. Baca anggota & status siswa memakai token pemanggil (RLS memastikan pemanggil anggota rumah itu).
//   2. Jenjang yang diminta harus jenjang aktif anak di akademi_siswa (tidak bisa meluluskan jenjang lain).
//   3. Baca seluruh learner_event anak, hitung ulang kelulusan di server (waktu = created_at server).
//   4. Lulus → tulis sertifikat (nomor resmi diisi trigger) dan naikkan jenjang, keduanya dengan kunci service_role.
// Jawaban: 200 { sertifikat, levelBaru } · 422 { error: "belum_lulus", dikuasai, total } · 409 jenjang beda ·
//          401/403 tidak berhak · 503 penerbit belum dikonfigurasi (SUPABASE_SERVICE_ROLE_KEY kosong).

import { penilaianKampus, snapshotPraktik } from "@/lib/akademi/praktik-kampus";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { LevelId } from "@akademi/schema";
import { KOMPETENSI, TRACK_AKTIF } from "@/lib/akademi/katalog";
import { ruangKuisKanonik } from "@/lib/akademi/modul";
import { pemantapanUjiUntuk } from "@/lib/akademi/pemantapan-uji";
import { jenjangBerikut } from "@/lib/akademi/peta";
import { buatKode, eventDariBaris, nilaiKelulusan, type BarisEvent } from "@/lib/akademi/sertifikat-inti";
import type { Admin } from "@/lib/akademi/server";
import { predikat } from "@/lib/akademi/ujian";
import type { Database, Json } from "@/lib/supabase/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const KOLOM = "id, member_id, level, track, code, snapshot, issued_at, nomor, status";
const HALAMAN = 1000;
const MAKS_EVENT = 60_000;

const json = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

function ujianAkhir(admin: Admin, memberId: string, level: LevelId) {
  return admin.from("akademi_ujian").select("nilai").eq("member_id", memberId).eq("jenis", "kenaikan").eq("level", level).order("created_at", { ascending: true }).limit(1);
}

async function tanggapanTerbit(admin: Admin, member: { id: string; family_id: string }, level: LevelId, berikut: LevelId | undefined, sertifikat: unknown) {
  if (!berikut) return json(200, { sertifikat });

  const sekarang = new Date().toISOString();
  const perubahan = { level: berikut, semester: 1, sumber: "naik" as const, level_sejak: sekarang, updated_at: sekarang };
  // Permintaan yang terlambat hanya boleh mengubah jenjang asal yang masih aktif.
  const berubah = await admin.from("akademi_siswa").update(perubahan).eq("member_id", member.id).eq("level", level).select("level").maybeSingle();
  if (berubah.error) return json(500, { error: "galat" });
  if (berubah.data) return json(200, { sertifikat, levelBaru: berubah.data.level });

  // Profil lama bisa belum punya baris siswa. Bila sudah ada, upsert ini membiarkan pangkatnya utuh.
  const ditambah = await admin.from("akademi_siswa")
    .upsert({ ...perubahan, member_id: member.id, family_id: member.family_id }, { onConflict: "member_id", ignoreDuplicates: true })
    .select("level").maybeSingle();
  if (ditambah.error) return json(500, { error: "galat" });
  if (ditambah.data) return json(200, { sertifikat, levelBaru: ditambah.data.level });

  const aktif = await admin.from("akademi_siswa").select("level").eq("member_id", member.id).maybeSingle();
  if (aktif.error || !aktif.data || aktif.data.level === level) return json(500, { error: "galat" });
  return json(200, { sertifikat, levelBaru: aktif.data.level });
}

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publik = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const rahasia = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !publik || !rahasia) return json(503, { error: "penerbit_belum_aktif" });

  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return json(401, { error: "tanpa_sesi" });

  const body = (await req.json().catch(() => null)) as { memberId?: unknown; level?: unknown } | null;
  const memberId = typeof body?.memberId === "string" ? body.memberId : "";
  const lv = LevelId.safeParse(body?.level);
  if (!UUID.test(memberId) || !lv.success) return json(400, { error: "permintaan_tidak_valid" });
  const level = lv.data;

  const opsi = { auth: { persistSession: false, autoRefreshToken: false } };
  const pemanggil = createClient<Database>(url, publik, { ...opsi, global: { headers: { Authorization: `Bearer ${token}` } } });
  const admin = createClient<Database>(url, rahasia, opsi);

  // 1. pemanggil berhak atas anggota ini (RLS member: hanya rumah sendiri)
  const { data: member, error: eMember } = await pemanggil.from("member").select("id, family_id").eq("id", memberId).maybeSingle();
  if (eMember) return json(401, { error: "sesi_tidak_sah" });
  if (!member) return json(403, { error: "tidak_berhak" });

  // 2. jenjang aktif siswa
  const { data: siswa, error: eSiswa } = await admin.from("akademi_siswa").select("level").eq("member_id", memberId).maybeSingle();
  if (eSiswa) return json(500, { error: "galat" });

  // Gunakan kembali sertifikat yang sudah terbit, termasuk saat kenaikan belum sempat tersimpan.
  const { data: ada, error: eSertifikat } = await admin.from("akademi_certificate").select(KOLOM).eq("member_id", memberId).eq("level", level).is("track", null).maybeSingle();
  if (eSertifikat) return json(500, { error: "galat" });
  if (ada) {
    if (siswa && siswa.level !== level) return json(200, { sertifikat: ada, levelBaru: siswa.level });
    const berikut = jenjangBerikut(level, KOMPETENSI);
    if (!berikut || ada.status !== "sah") return json(200, { sertifikat: ada });
    const { data: kenaikan, error } = await ujianAkhir(admin, memberId, level);
    if (error) return json(500, { error: "galat" });
    // Sertifikat lama bisa berasal dari sebelum Ujian Akhir menjadi syarat.
    if (!kenaikan?.length) return json(200, { sertifikat: ada });
    return tanggapanTerbit(admin, member, level, berikut, ada);
  }

  if (siswa && siswa.level !== level) return json(409, { error: "jenjang_beda", levelAktif: siswa.level });

  // 3. hitung ulang dari seluruh catatan belajar anak
  const rows: BarisEvent[] = [];
  for (let dari = 0; dari < MAKS_EVENT; dari += HALAMAN) {
    const { data, error } = await admin
      .from("learner_event")
      .select("id, member_id, session_id, activity_id, mechanic, type, payload, client_at, created_at")
      .eq("member_id", memberId)
      .order("created_at", { ascending: true })
      .range(dari, dari + HALAMAN - 1);
    if (error) {
      console.error("[sertifikat] baca learner_event gagal", error);
      return json(500, { error: "galat" });
    }
    rows.push(...((data ?? []) as BarisEvent[]));
    if (!data || data.length < HALAMAN) break;
  }
  const events = eventDariBaris(rows);
  const uji = await pemantapanUjiUntuk(member.id, level, new Date());
  const hasil = nilaiKelulusan(events, KOMPETENSI, level, uji);
  if (!hasil.lulus) return json(422, { error: "belum_lulus", dikuasai: hasil.dikuasai, total: hasil.total });

  // Ujian Akhir (sekali-jalan) wajib sudah dikerjakan; nilainya dibekukan apa adanya (<75 = predikat "Cukup")
  const { data: kenaikan, error: eUjian } = await ujianAkhir(admin, memberId, level);
  if (eUjian) return json(500, { error: "galat" });
  const nilaiAkhir = kenaikan?.[0]?.nilai;
  if (nilaiAkhir === undefined) return json(422, { error: "belum_ujian_kenaikan", dikuasai: hasil.dikuasai, total: hasil.total });
  hasil.snapshot.nilai = nilaiAkhir;
  hasil.snapshot.predikat = predikat(nilaiAkhir);
  const { data: semuaUjian } = await admin.from("akademi_ujian").select("jenis, ruang, nilai, lulus").eq("member_id", memberId).eq("level", level).or("lulus.eq.true,jenis.eq.kenaikan");
  const terbaikUjian = new Map<string, { jenis: string; ruang: string; nilai: number }>();
  for (const u of semuaUjian ?? []) {
    const ruang = u.jenis === "kuis" ? ruangKuisKanonik(level, u.ruang, KOMPETENSI, TRACK_AKTIF) : u.ruang;
    const k = `${u.jenis}|${ruang}`;
    if ((terbaikUjian.get(k)?.nilai ?? -1) < u.nilai) terbaikUjian.set(k, { jenis: u.jenis, ruang, nilai: u.nilai });
  }
  hasil.snapshot.ujian = [...terbaikUjian.values()];
  // Penilaian Praktik Kampus (pelengkap, bukan syarat): dihitung dari jejak gedung kampus di server
  const praktik = snapshotPraktik(penilaianKampus(events, KOMPETENSI, level));
  if (praktik) hasil.snapshot.praktik = praktik;

  // 4. terbitkan (kode unik; coba ulang bila kebetulan sama)
  let terbit: unknown = null;
  for (let coba = 0; coba < 4 && !terbit; coba++) {
    const { data, error } = await admin
      .from("akademi_certificate")
      .insert({ family_id: member.family_id, member_id: memberId, level, track: null, code: buatKode(), snapshot: hasil.snapshot as unknown as Json })
      .select(KOLOM)
      .single();
    if (!error) terbit = data;
    else if (error.code !== "23505") {
      console.error("[sertifikat] insert gagal", error);
      return json(500, { error: "galat" });
    } else {
      // unik ganda: mungkin permintaan lain sudah menerbitkan anak × jenjang ini
      const { data: lain } = await admin.from("akademi_certificate").select(KOLOM).eq("member_id", memberId).eq("level", level).is("track", null).maybeSingle();
      if (lain) terbit = lain;
    }
  }
  if (!terbit) return json(500, { error: "galat" });

  return tanggapanTerbit(admin, member, level, hasil.berikut, terbit);
}
