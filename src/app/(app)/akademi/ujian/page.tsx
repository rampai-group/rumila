"use client";

// /akademi/ujian?jenis=kuis|semester|kenaikan&ruang=<track:unit|S1|S2> — ujian jenjang aktif anak.
// Tes Penempatan punya halaman sendiri (/akademi/penempatan).

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { LevelId } from "@akademi/schema";
import { LayarUjian } from "@/components/akademi/ujian";
import { KOMPETENSI } from "@/lib/akademi/konten";
import { ujianTerbuka } from "@/lib/akademi/peta";
import { useAksesAkademi } from "@/lib/akademi/peta-anak";
import { cakupanUjian } from "@/lib/akademi/ruang-ujian";
import { JENIS_UJIAN, SEKALI, type JenisUjian } from "@/lib/akademi/ujian";
import { useUjian } from "@/lib/akademi/ujian-klien";
import { useMe } from "@/lib/store";
import { TRACK_AKTIF } from "@/lib/akademi/katalog";
import { ruangKuisKanonik } from "@/lib/akademi/modul";

function Isi() {
  const q = useSearchParams();
  const me = useMe();
  const { peta, siap, level } = useAksesAkademi(me.id);
  const riwayat = useUjian(me.id);
  const jenis = JENIS_UJIAN.find((j) => j === q.get("jenis") && j !== "penempatan");
  const diminta = q.get("ruang") ?? "";
  const ruang = jenis === "kuis" ? ruangKuisKanonik(level, diminta, KOMPETENSI, TRACK_AKTIF) : diminta;
  const ids = useMemo(() => (jenis && level ? cakupanUjian(jenis, level, ruang, KOMPETENSI) : null), [jenis, level, ruang]);
  if (!siap) return <p className="p-6 text-center text-[16px] font-bold" role="status">Membuka ujian…</p>;
  if (!jenis || !ids?.length) return <p className="p-6 text-center text-[16px] font-bold">Ujian tidak ditemukan.</p>;
  const unit = jenis === "kuis" ? KOMPETENSI.find((c) => c.id === ids[0])?.unit.nama.id : undefined;
  const judul = jenis === "kuis" ? (unit ?? "Modul") : jenis === "semester" ? `Semester ${ruang.slice(1)}` : "Seluruh jenjang";
  const riwayatRuang = riwayat.filter((h) => h.jenis === jenis && h.ruang === ruang && h.level === level);
  const boleh = ujianTerbuka(peta, jenis, ruang) || riwayatRuang.some((h) => h.pending || h.lulus || SEKALI.has(jenis));
  return <Pintu key={`${me.id}|${jenis}|${ruang}|${level}`} boleh={boleh} jenis={jenis} level={level} ruang={ruang} kompetensiIds={ids} judul={judul} />;
}

function Pintu({ boleh, ...ujian }: { boleh: boolean; jenis: JenisUjian; level: LevelId; ruang: string; kompetensiIds: string[]; judul: string }) {
  // Simpan izin saat masuk supaya event jawaban selama tes tidak menutup layar yang sedang dimainkan.
  const [terbuka, setTerbuka] = useState(boleh);
  useEffect(() => { if (boleh) setTerbuka(true); }, [boleh]);
  if (terbuka || boleh) return <LayarUjian {...ujian} />;
  return (
    <div className="mx-auto max-w-md p-6 text-center font-bold">
      <p>Ujian ini masih terkunci. Selesaikan tahap yang tersedia di peta lebih dulu.</p>
      <Link href="/akademi" className="mt-4 inline-block underline">Kembali ke peta</Link>
    </div>
  );
}

export default function UjianPage() {
  return (
    <Suspense>
      <Isi />
    </Suspense>
  );
}
