// Server penilai ujian RINOYA Academy (Sekolah Tahap 3).
//
// POST { memberId, jenis, level, ruang, sessionId } + Authorization: Bearer <token>
//   - Nilai dihitung dari event "attempt" sesi ujian itu di learner_event (jawaban memakai Bantu dihitung salah).
//     Soal yang dihitung = JUMLAH_SOAL[jenis] pertama; kurang dari itu → 422 belum_lengkap.
//   - Soal harus dari paket yang memuat kompetensi cakupan ujian.
//   - Satu sesi = satu hasil (idempoten). Gagal hari ini → baru boleh mengulang besok (WIB).
//   - Ujian Akhir (kenaikan) SEKALI: sesi kedua ditolak; sesi yang ditinggal di tengah boleh diserahkan sebagian
//     ({ serahkan: true }), soal yang tidak dijawab dihitung salah.
//   - Efek: Ujian Semester 1 lulus → akademi_siswa.semester = 2. Tes Penempatan lulus (atau tes PAUD) → jenjang awal.
// Jawaban: 200 { ujian, levelBaru? } · 409 jenjang_beda / sudah_lulus / tunggu_besok / penempatan_ditutup ·
//          422 belum_lengkap / ruang_tidak_dikenal · 401/403 · 503 belum_aktif.

import { JENIS_UJIAN, JUMLAH_SOAL, SEKALI, bolehMengulang, lulusDari, nilaiDari, type HasilUjian, type JenisUjian } from "@/lib/akademi/ujian";
import { cakupanUjian } from "@/lib/akademi/ruang-ujian";
import { KOMPETENSI, PAKET, TRACK_AKTIF } from "@/lib/akademi/katalog";
import { petaDariBukti, ujianTerbuka } from "@/lib/akademi/peta";
import { eventDariBaris } from "@/lib/akademi/sertifikat-inti";
import { UUID, anggotaMilik, jawab, klien, semuaEvent, type Admin } from "@/lib/akademi/server";
import { LevelId } from "@akademi/schema";
import { normalisasiHasilUjian, ruangKuisKanonik } from "@/lib/akademi/modul";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KOLOM = "id, member_id, jenis, level, ruang, session_id, benar, total, nilai, lulus, created_at";
type BarisUjian = { jenis: string; level: string; ruang: string; session_id: string; benar: number; total: number; nilai: number; lulus: boolean; created_at: string };
const keHasil = (r: BarisUjian): HasilUjian => normalisasiHasilUjian([{ jenis: r.jenis as JenisUjian, level: r.level as LevelId, ruang: r.ruang, sessionId: r.session_id, benar: r.benar, total: r.total, nilai: r.nilai, lulus: r.lulus, at: r.created_at }], KOMPETENSI, TRACK_AKTIF)[0];

/** Jalankan lagi bila nilai tersimpan tetapi sinkron jenjang/semester gagal pada permintaan pertama. */
async function tanggapanHasil(admin: Admin, member: { id: string; family_id: string }, h: HasilUjian) {
  const sekarang = new Date().toISOString();
  let levelBaru: LevelId | undefined;
  if (h.lulus && h.jenis === "semester" && h.ruang === "S1") {
    const { error } = await admin.from("akademi_siswa").update({ semester: 2, updated_at: sekarang }).eq("member_id", member.id).eq("level", h.level).eq("semester", 1);
    if (error) return jawab(500, { error: "galat" });
  }
  if (h.jenis === "penempatan" && (h.lulus || h.level === "PAUD")) {
    const { data: siswa, error } = await admin.from("akademi_siswa").select("level, sumber").eq("member_id", member.id).maybeSingle();
    if (error) return jawab(500, { error: "galat" });
    if (siswa?.sumber !== "naik" && siswa?.level !== h.level) {
      const { error: gagal } = await admin.from("akademi_siswa").upsert({ member_id: member.id, family_id: member.family_id, level: h.level, semester: 1, sumber: "awal", level_sejak: sekarang, updated_at: sekarang }, { onConflict: "member_id" });
      if (gagal) return jawab(500, { error: "galat" });
    }
    levelBaru = siswa?.sumber === "naik" ? siswa.level as LevelId : h.level;
  }
  return jawab(200, { ujian: h, levelBaru });
}

export async function POST(req: Request) {
  const k = klien(req);
  if (k === "belum_aktif") return jawab(503, { error: "penerbit_belum_aktif" });
  if (k === "tanpa_sesi") return jawab(401, { error: "tanpa_sesi" });
  const { pemanggil, admin } = k;

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const memberId = typeof body?.memberId === "string" ? body.memberId : "";
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
  const jenis = JENIS_UJIAN.find((j) => j === body?.jenis);
  const lv = LevelId.safeParse(body?.level);
  const diminta = typeof body?.ruang === "string" ? body.ruang : "";
  if (!UUID.test(memberId) || !UUID.test(sessionId) || !jenis || !lv.success) return jawab(400, { error: "permintaan_tidak_valid" });
  const level = lv.data;
  const ruang = jenis === "kuis" ? ruangKuisKanonik(level, diminta, KOMPETENSI, TRACK_AKTIF) : diminta;

  const member = await anggotaMilik(pemanggil, memberId);
  if (typeof member === "number") return jawab(member, { error: member === 401 ? "sesi_tidak_sah" : "tidak_berhak" });

  // sesi yang sama sudah dinilai → kembalikan apa adanya
  const { data: ada, error: gagalCekSesi } = await admin.from("akademi_ujian").select(KOLOM).eq("session_id", sessionId).maybeSingle();
  if (gagalCekSesi) return jawab(500, { error: "galat" });
  if (ada) {
    if (ada.member_id !== memberId) return jawab(403, { error: "tidak_berhak" });
    if (ada.jenis !== jenis || ada.level !== level || keHasil(ada).ruang !== ruang) return jawab(409, { error: "sesi_berbeda" });
    return tanggapanHasil(admin, member, keHasil(ada));
  }

  const cakupan = cakupanUjian(jenis, level, ruang, KOMPETENSI);
  if (!cakupan?.length) return jawab(422, { error: "ruang_tidak_dikenal" });

  const { data: siswa, error: gagalCekSiswa } = await admin.from("akademi_siswa").select("level, sumber, semester").eq("member_id", memberId).maybeSingle();
  if (gagalCekSiswa) return jawab(500, { error: "galat" });
  if (jenis === "penempatan") {
    const { count: sertifikat, error: gagalCekSertifikat } = await admin.from("akademi_certificate").select("id", { count: "exact", head: true }).eq("member_id", memberId);
    const { count: lulusTes, error: gagalCekPenempatan } = await admin.from("akademi_ujian").select("id", { count: "exact", head: true }).eq("member_id", memberId).eq("jenis", "penempatan").eq("lulus", true);
    if (gagalCekSertifikat || gagalCekPenempatan) return jawab(500, { error: "galat" });
    if (siswa?.sumber === "naik" || (sertifikat ?? 0) > 0 || (lulusTes ?? 0) > 0) return jawab(409, { error: "penempatan_ditutup" });
  } else if (!siswa || siswa.level !== level) {
    return jawab(409, { error: "jenjang_beda", levelAktif: siswa?.level });
  }

  const { data: riwayat, error: gagalCekRiwayat } = await admin.from("akademi_ujian").select(KOLOM).eq("member_id", memberId).eq("level", level);
  if (gagalCekRiwayat) return jawab(500, { error: "galat" });
  const hasilSebelumnya = (riwayat ?? []).map(keHasil);
  const boleh = bolehMengulang(hasilSebelumnya, jenis, level, ruang);
  if (!boleh.boleh) return jawab(409, { error: boleh.sekali ? "sudah_dikerjakan" : boleh.besok ? "tunggu_besok" : "sudah_lulus" });

  if (jenis !== "penempatan") {
    const jejak = await semuaEvent(admin, memberId);
    if (!jejak) return jawab(500, { error: "galat" });
    const bukti = eventDariBaris(jejak.filter((e) => e.session_id !== sessionId));
    const peta = petaDariBukti(bukti, PAKET, KOMPETENSI, level, TRACK_AKTIF, hasilSebelumnya);
    if (!ujianTerbuka(peta, jenis, ruang)) return jawab(409, { error: "ujian_terkunci" });
  }

  // Ujian Akhir sekali-jalan: sesi lain yang sudah mulai menjawab (walau belum diserahkan) mengunci sesi baru
  if (SEKALI.has(jenis)) {
    const { data: lain, error: gagalCekLain } = await admin
      .from("learner_event")
      .select("session_id")
      .eq("member_id", memberId)
      .eq("type", "attempt")
      .eq("payload->detail->>ujian", jenis)
      .eq("payload->detail->>level", level)
      .neq("session_id", sessionId)
      .limit(1);
    if (gagalCekLain) return jawab(500, { error: "galat" });
    if (lain?.length) return jawab(409, { error: "sudah_dikerjakan", sessionLain: lain[0].session_id });
  }

  const rows = await semuaEvent(admin, memberId, sessionId);
  if (!rows) return jawab(500, { error: "galat" });
  const sah = new Set(cakupan);
  const isiPaket = new Map(PAKET.map((p) => [p.id, p.competencyIds]));
  const jawaban = rows.filter((r) => r.type === "attempt");
  const n = JUMLAH_SOAL[jenis];
  // Ujian sekali-jalan boleh diserahkan sebagian (keluar di tengah jalan): soal yang tidak dijawab = salah
  if (jawaban.length < n && !(SEKALI.has(jenis) && jawaban.length > 0 && body?.serahkan === true)) return jawab(422, { error: "belum_lengkap", terjawab: jawaban.length, perlu: n });
  const dihitung = jawaban.slice(0, n);
  if (dihitung.some((r) => !(isiPaket.get(r.activity_id) ?? []).some((c) => sah.has(c)))) return jawab(422, { error: "soal_di_luar_cakupan" });
  const benar = dihitung.filter((r) => {
    const p = (r.payload ?? {}) as { correct?: unknown; hintUsed?: unknown };
    return p.correct === true && p.hintUsed !== true;
  }).length;
  const nilai = nilaiDari(benar, n);
  const lulus = lulusDari(jenis, nilai);

  const { data: baru, error } = await admin
    .from("akademi_ujian")
    .insert({ family_id: member.family_id, member_id: memberId, jenis, level, ruang, session_id: sessionId, benar, total: n, nilai, lulus })
    .select(KOLOM)
    .single();
  if (error || !baru) {
    console.error("[ujian] simpan gagal", error);
    return jawab(500, { error: "galat" });
  }

  return tanggapanHasil(admin, member, keHasil(baru));
}
