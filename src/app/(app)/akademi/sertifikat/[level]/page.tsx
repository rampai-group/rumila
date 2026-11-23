"use client";

// Sertifikat jenjang untuk anak yang sedang masuk: bila pangkat tercapai → terbitkan sekali, lalu kartu + Cetak/PDF +
// Bagikan tautan verifikasi. Bila belum → progres pangkat & kompetensi inti yang masih harus dikuasai.
// Layar penuh (terdaftar di shell), gaya tenang seperti Rapor.

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { levelDariSlug, levelIndex, levelMeta, type LevelId } from "@akademi/schema";
import { BALOO, NUNITO } from "@/components/launcher";
import { Icon } from "@/components/ui";
import { SERTIFIKAT_PRINT_CSS } from "@/components/akademi/sertifikat";
import { BUKU_PRINT_CSS, BukuSertifikat } from "@/components/akademi/buku-sertifikat";
import { useFotoAnak } from "@/lib/akademi/foto";
import { ambilUjian, useUjian } from "@/lib/akademi/ujian-klien";
import { useEvents } from "@/lib/akademi/jejak";
import { LEVEL_PANGKAT } from "@/lib/akademi/koleksi";
import { KOMPETENSI, PAKET, levelAnak, useBahasaAnak } from "@/lib/akademi/konten";
import { paketMisi, petaDariBukti, ujianTerbuka } from "@/lib/akademi/peta";
import { TRACK_AKTIF } from "@/lib/akademi/katalog";
import { useTanggalAkademi } from "@/lib/akademi/tanggal-akademi";
import { ambilSertifikat, PangkatBelumTercapai, terbitkan, URL_VERIFIKASI, useSertifikat } from "@/lib/akademi/sertifikat";
import { useCloud } from "@/lib/supabase/family";
import { useMe, useUI } from "@/lib/store";
import { labelSisaPenguasaan, RincianPenguasaan } from "@/components/akademi/portal/penguasaan";

const INK = "#0b2545";
const KARTU = "rounded-[22px] bg-white shadow-[0_4px_0_rgba(11,37,69,.08)]";

export default function SertifikatLevelPage() {
  const { level: raw } = useParams<{ level: string }>();
  // alamat memakai pangkat (/akademi/sertifikat/komandan)
  const level = levelDariSlug(raw ?? "");
  const valid = !!level && (LEVEL_PANGKAT as readonly string[]).includes(level);
  return <Kerangka>{valid ? <IsiSertifikat level={level as LevelId} /> : <TidakAda />}</Kerangka>;
}

function Kerangka({ children }: { children: React.ReactNode }) {
  return (
    <div className="sertifikat-root min-h-dvh latar-biru" style={{ fontFamily: NUNITO, color: INK }}>
      <style>{SERTIFIKAT_PRINT_CSS}</style>
      <div className="mx-auto flex max-w-[1040px] flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6" style={{ paddingTop: "max(16px, env(safe-area-inset-top))", paddingBottom: "max(32px, env(safe-area-inset-bottom))" }}>
        {children}
      </div>
    </div>
  );
}

function Kepala({ judul, sub }: { judul: string; sub: string }) {
  return (
    <header className="no-print flex items-center gap-3">
      <Link href="/akademi" aria-label="Kembali" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#f0e4d2] bg-white transition-transform active:scale-95" style={{ color: INK }}>
        <Icon name="arrow_back" size={22} />
      </Link>
      <div className="min-w-0 flex-1">
        <h1 style={{ fontFamily: BALOO, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.05 }}>{judul}</h1>
        <p className="text-[13px] font-bold text-ink-3">{sub}</p>
      </div>
    </header>
  );
}

function TidakAda() {
  return (
    <>
      <Kepala judul="Sertifikat" sub="RINOYA Academy" />
      <p className={`${KARTU} p-5 text-[14px] font-bold text-ink-3`}>Jenjang ini belum punya sertifikat.</p>
    </>
  );
}

function IsiSertifikat({ level }: { level: LevelId }) {
  const me = useMe();
  const showToast = useUI((s) => s.showToast);
  const familyId = useCloud((s) => s.familyId);
  const events = useEvents(me.id);
  const bahasa = useBahasaAnak(me.id);
  const inggris = bahasa === "en";
  const tanggal = useTanggalAkademi();
  const hasilUjian = useUjian(me.id);
  const peta = useMemo(() => petaDariBukti(events, PAKET, KOMPETENSI, level, TRACK_AKTIF, hasilUjian, tanggal), [events, level, hasilUjian, tanggal]);
  const meta = levelMeta(level);
  const jenjangAktif = levelAnak(me.id);
  const tautanLatih = useMemo(() => {
    const tautan = new Map<string, string>();
    if (levelIndex(level) > levelIndex(jenjangAktif)) return tautan;
    const misiTerbuka = new Set(peta.unit.flatMap((u) => u.misi).filter((m) => !m.terkunci).map((m) => m.kompetensi.id));
    for (const r of peta.rincianPemantapan) {
      if (!r.bisaDilatihHariIni || (level === jenjangAktif && !misiTerbuka.has(r.kompetensi.id))) continue;
      const paket = paketMisi(r.kompetensi.id, PAKET, events, level, r.paketBenar);
      if (paket) tautan.set(r.kompetensi.id, `/akademi/main/${paket.id}`);
    }
    return tautan;
  }, [events, jenjangAktif, level, peta]);
  const daftar = useSertifikat(me.id);
  const sert = daftar.find((s) => s.level === level && !s.track);
  const [sibuk, setSibuk] = useState(false);
  const foto = useFotoAnak(me.id);
  // Sertifikat yang terbit di perangkat lain: tarik dari server sekali saat halaman dibuka.
  useEffect(() => {
    if (!familyId) return;
    ambilSertifikat(me.id).catch((e) => console.error("[akademi] ambil sertifikat gagal", e));
    ambilUjian(me.id).catch((e) => console.error("[akademi] ambil ujian gagal", e));
  }, [familyId, me.id]);

  const terbit = async () => {
    setSibuk(true);
    try {
      const s = await terbitkan(me.id, level);
      showToast(s.pending ? "Sertifikat terbit. Akan disinkronkan saat online." : "Sertifikat terbit! 🎓");
    } catch (e) {
      console.error("[akademi] terbitkan sertifikat gagal", e);
      showToast(e instanceof PangkatBelumTercapai ? e.message : "Sertifikat belum bisa diterbitkan. Coba lagi, ya.");
    } finally {
      setSibuk(false);
    }
  };

  const bagikan = async () => {
    if (!sert) return;
    const url = URL_VERIFIKASI(sert.code);
    const title = `Sertifikat ${meta.pangkat} — ${me.name}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text: `${me.name} menuntaskan jenjang ${meta.pangkat}. Cek keasliannya:`, url });
        return;
      }
    } catch {
      /* dibatalkan pengguna → jatuh ke salin */
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast("Tautan verifikasi disalin.");
    } catch {
      showToast(url);
    }
  };

  if (sert) {
    return (
      <>
        <Kepala judul={`Sertifikat ${meta.pangkat}`} sub={me.name} />
        <style>{BUKU_PRINT_CSS}</style>
        <BukuSertifikat nama={me.name} level={level} kode={sert.code} nomor={sert.nomor} issuedAt={sert.issuedAt} snapshot={sert.snapshot} foto={foto} pending={sert.pending} />
        <div className="no-print flex flex-wrap justify-center gap-2">
          <button onClick={() => window.print()} className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-white transition-transform active:scale-95" style={{ fontFamily: BALOO, fontSize: 17, fontWeight: 800, background: "linear-gradient(155deg,#1f94f0,#0567c2 60%)", boxShadow: "0 3px 0 #0567c2" }}>
            <Icon name="print" size={22} /> Cetak / PDF
          </button>
          <button onClick={bagikan} className="inline-flex h-12 items-center gap-2 rounded-full border border-[#f0e4d2] bg-white px-6 transition-transform active:scale-95" style={{ fontFamily: BALOO, fontSize: 17, fontWeight: 800, color: INK }}>
            <Icon name="share" size={22} /> Bagikan tautan
          </button>
          <Link href={`/sertifikat/${sert.code}`} className="inline-flex h-12 items-center gap-2 rounded-full border border-[#f0e4d2] bg-white px-6 transition-transform active:scale-95" style={{ fontFamily: BALOO, fontSize: 17, fontWeight: 800, color: INK }}>
            <Icon name="verified" size={22} /> Halaman verifikasi
          </Link>
        </div>
        <p className="no-print text-center text-[12px] font-bold text-ink-3">
          Kode <b style={{ color: INK }}>{sert.code}</b> bisa dicek siapa saja di {URL_VERIFIKASI(sert.code).replace(/^https:\/\//, "")}. Halaman publik hanya menampilkan nama depan.
          {sert.pending && " · Salinan ini masih di perangkat; akan dikirim ke server saat online."}
        </p>
      </>
    );
  }

  if (peta.tercapai && !peta.kenaikanSelesai) {
    const siap = level === jenjangAktif && ujianTerbuka(peta, "kenaikan", "");
    const judulProgres = inggris ? `Working toward ${meta.pangkat}` : `Menuju pangkat ${meta.pangkat}`;
    const judulSiap = inggris ? "Final Exam ready" : "Siap Ujian Akhir";
    const petunjuk = siap
      ? inggris ? "You can practice before taking the Final Exam. You have one attempt, and your score appears on the certificate." : "Ujian Akhir hanya sekali dan nilainya tertulis di sertifikat. Kamu bisa mencoba latihan dulu."
      : inggris ? "Follow the next step on your map to unlock the Final Exam." : "Ikuti tahap yang tersedia di peta untuk membuka Ujian Akhir.";
    const label = siap ? inggris ? "Go to Final Exam" : "Ke Ujian Akhir" : inggris ? "Back to map" : "Kembali ke peta";
    return (
      <>
        <Kepala judul={siap ? judulSiap : judulProgres} sub={me.name} />
        <div className={`${KARTU} flex flex-col items-center gap-4 p-6 text-center`}>
          <Icon name="workspace_premium" size={56} style={{ color: "#e8590c" }} />
          <p className="max-w-[440px] leading-tight" style={{ fontFamily: BALOO, fontSize: 24, fontWeight: 800, color: INK }}>
            {inggris ? `All ${meta.pangkat} core skills mastered` : `Semua kompetensi inti ${meta.pangkat} sudah dikuasai`}
          </p>
          <p className="max-w-[460px] text-[14px] font-bold text-ink-3">{petunjuk}</p>
          <Link href={siap ? "/akademi/ujian?jenis=kenaikan&ruang=" : "/akademi"} className="inline-flex min-h-14 items-center gap-2 rounded-[18px] px-6 py-2 text-white" style={{ fontFamily: BALOO, fontSize: 19, fontWeight: 800, background: "linear-gradient(155deg,#ff8a5c,#e8590c 65%)", boxShadow: "0 4px 0 #b8460a" }}>
            <Icon name="arrow_forward" size={24} /> {label}
          </Link>
        </div>
      </>
    );
  }

  if (peta.lulusJenjang) {
    return (
      <>
        <Kepala judul={`Pangkat ${meta.pangkat} tercapai! 🎖️`} sub={me.name} />
        <div className={`${KARTU} flex flex-col items-center gap-4 p-6 text-center`}>
          <span className="flex size-24 items-center justify-center rounded-full" style={{ background: "linear-gradient(155deg,#ffe46b,#ffbe0b 65%)", boxShadow: "0 4px 0 #d99400", fontSize: 52 }}>
            🎓
          </span>
          <p className="max-w-[420px] leading-tight" style={{ fontFamily: BALOO, fontSize: 24, fontWeight: 800, color: INK }}>
            Semua kompetensi inti {meta.pangkat} sudah dikuasai
          </p>
          <p className="max-w-[460px] text-[14px] font-bold text-ink-3">
            Sertifikat Kenaikan Jenjang diterbitkan sekali setelah Ujian Akhir lulus, lengkap dengan nomor resmi, kode verifikasi, dan transkrip.
          </p>
          <button
            onClick={terbit}
            disabled={sibuk}
            className="inline-flex h-14 items-center gap-2 rounded-[18px] px-8 text-[#0b2545] transition-transform active:scale-95 disabled:opacity-60"
            style={{ fontFamily: BALOO, fontSize: 19, fontWeight: 800, background: "linear-gradient(155deg,#ffb347,#fd861d 60%)", boxShadow: "0 4px 0 #c85400" }}
          >
            <Icon name="workspace_premium" size={26} /> {sibuk ? "Menerbitkan…" : "Terbitkan sertifikat"}
          </button>
        </div>
      </>
    );
  }

  // Belum tercapai: progres + daftar kompetensi inti yang belum dikuasai.
  const persen = peta.inti.total ? Math.round(peta.inti.dikuasai / peta.inti.total * 100) : 0;
  return (
    <>
      <Kepala judul={inggris ? `Working toward ${meta.pangkat}` : `Menuju pangkat ${meta.pangkat}`} sub={me.name} />
      <div className={`${KARTU} flex flex-col gap-3 p-5`}>
        <div className="flex items-center justify-between">
          <p style={{ fontFamily: BALOO, fontSize: 20, fontWeight: 800, color: INK }}>{inggris ? "Rank progress" : "Progres pangkat"}</p>
          <span className="rounded-full bg-[#e3f1fd] px-3 py-1 text-[13px] font-black text-[#0567c2]">{persen}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#fff0da]">
          <div className="h-full rounded-full" style={{ width: `${persen}%`, background: "linear-gradient(90deg,#4fb3ff,#0786eb)" }} />
        </div>
        <p className="text-[13px] font-bold text-ink-3">{labelSisaPenguasaan(peta.rincianPemantapan.length, bahasa)}</p>
      </div>
      <RincianPenguasaan rincian={peta.rincianPemantapan} bahasa={bahasa} tautanLatih={tautanLatih} />
    </>
  );
}
