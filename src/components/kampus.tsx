"use client";

// Kampus RINOYA: ringkasan kelas hari ini, daftar gedung, halaman tiap gedung, dan kunci Laboratorium 3D.
// Peta kampus utuh (beranda) ada di kampus-dunia.tsx. Semua konten berada di bawah satu Academy.

import { useEffect, useMemo, useState } from "react";
import { levelMeta, type LevelId } from "@akademi/schema";
import { useOpenTool } from "@/components/shell";
import { AppIcon, BALOO } from "@/components/launcher";
import { Icon } from "@/components/ui";
import { TRACK_SLICE } from "@/components/akademi/portal/bersama";
import { useEvents } from "@/lib/akademi/jejak";
import { KOMPETENSI, PAKET, levelAnak, useProfilAkademiVersi } from "@/lib/akademi/konten";
import { keadaanLab, type KeadaanLab } from "@/lib/akademi/lab";
import { kompetensiSelesai, petaDariBukti } from "@/lib/akademi/peta";
import { useTanggalAkademi } from "@/lib/akademi/tanggal-akademi";
import { usePemantapanUji } from "@/lib/akademi/pemantapan-uji-klien";
import { NAMA_UJIAN } from "@/lib/akademi/ujian";
import { ambilUjian, useUjian } from "@/lib/akademi/ujian-klien";
import { PLAY, canonicalToolId } from "@/lib/catalog";
import { GEDUNG, isiGedung, type Gedung } from "@/lib/kampus";
import { isOrangTua } from "@/lib/profil";
import { can, useMe, useRumila, useUI, type Member } from "@/lib/store";

function useLevel(memberId: string): LevelId {
  const versi = useProfilAkademiVersi();
  const [lv, setLv] = useState<LevelId>("PAUD");
  useEffect(() => setLv(levelAnak(memberId)), [memberId, versi]);
  return lv;
}

/** Keadaan kunci tiap dunia Laboratorium 3D untuk satu anggota. Dewasa/admin: semua terbuka. */
export function useLab(me: Member): (toolId: string) => KeadaanLab {
  const events = useEvents(me.id);
  const ujian = useUjian(me.id);
  const level = useLevel(me.id);
  const activity = useRumila((s) => s.activity);
  const dewasa = isOrangTua(me);
  const selesai = useMemo(() => kompetensiSelesai(events, PAKET), [events]);
  return (toolId) => {
    if (dewasa) return { terbuka: true };
    const pernah = activity.some((a) => a.memberId === me.id && canonicalToolId(a.toolId) === toolId);
    return keadaanLab(toolId, { level, selesai, ujian, pernah, kompetensi: KOMPETENSI });
  };
}

const INK = "#0b2545";

/** Ringkasan kelas anak: jenjang, semester aktif, persen semester, dan tugas berikutnya (dipakai peta kampus). */
export function useKelasHariIni(me: Member) {
  const events = useEvents(me.id);
  const ujian = useUjian(me.id);
  const level = useLevel(me.id);
  const tanggal = useTanggalAkademi();
  const uji = usePemantapanUji(me.id, level);
  useEffect(() => {
    ambilUjian(me.id).catch(() => {});
  }, [me.id]);
  const peta = useMemo(
    () => petaDariBukti(events, PAKET, KOMPETENSI, level, TRACK_SLICE, ujian, tanggal, uji),
    [events, level, ujian, tanggal, uji],
  );
  const lv = levelMeta(level);
  const sm = peta.semester[peta.semesterAktif - 1];
  const persen = sm?.total ? Math.round((sm.selesai / sm.total) * 100) : 0;
  const tugas = peta.sekarang
    ? { judul: `Misi ${peta.sekarang.nomor}`, sub: peta.sekarang.kompetensi.unit.nama.id, ikon: "play_arrow" }
    : peta.ujian
      ? { judul: NAMA_UJIAN[peta.ujian.jenis], sub: peta.ujian.unit?.nama.id ?? (peta.ujian.semester ? `Semester ${peta.ujian.semester}` : lv.pangkat), ikon: "quiz" }
      : peta.lulusJenjang
        ? { judul: "Jenjang tuntas", sub: "Ambil sertifikatmu", ikon: "workspace_premium" }
        : { judul: "Pemantapan", sub: peta.pemantapanMenungguHari ? "Lanjut di hari berbeda" : "Latihan kemampuan inti", ikon: "fitness_center" };
  return { level, lv, semester: peta.semesterAktif, persen, tugas };
}

export { keteranganGedung };

/** Gedung yang tampil untuk anggota ini: punya izin dan sudah berisi. */
export function useGedungKampus(me: Member) {
  return useMemo(() => GEDUNG.map((g) => ({ g, isi: isiGedung(g, (k) => can(me, k)) })).filter((x) => x.isi.length > 0), [me]);
}

function keteranganGedung(g: Gedung, jumlah: number, terbuka: number) {
  if (g.id === "lab") return `${terbuka} dari ${jumlah} terbuka`;
  if (g.id === "komputer") return `${jumlah} modul Agam`;
  if (g.id === "taman") return `${jumlah} permainan`;
  return jumlah === 1 ? "1 kegiatan" : `${jumlah} kegiatan`;
}

/** Halaman satu gedung: papan gedung bergambar + petak kegiatan. */
export function GedungView({ g }: { g: Gedung }) {
  const me = useMe();
  const openTool = useOpenTool();
  const lab = useLab(me);
  const showToast = useUI((s) => s.showToast);
  const isi = useMemo(() => isiGedung(g, (k) => can(me, k)), [g, me]);
  const [, m, d] = PLAY[g.c];

  return (
    <>
      <div className="relative flex flex-col-reverse overflow-hidden rounded-[28px] bg-white shadow-[0_5px_0_rgba(11,37,69,.08)] sm:min-h-[264px] sm:flex-row">
        <div className="relative z-10 flex min-w-0 flex-col gap-2 p-4 sm:flex-1 sm:self-center sm:p-5">
          <span className="self-start rounded-full px-3 py-0.5 text-[11px] font-black tracking-[0.1em] text-white uppercase" style={{ background: `color-mix(in srgb, ${d} 72%, #000)`, boxShadow: `0 2px 0 ${m}` }}>
            {g.peran}
          </span>
          <h1 style={{ fontFamily: BALOO, fontSize: 28, fontWeight: 800, lineHeight: 1.05, color: INK }}>{g.nama}</h1>
          <p className="text-[14px] font-bold text-ink-2">{g.desc}</p>
        </div>
        <div className="relative h-[228px] w-full shrink-0 sm:h-auto sm:w-[52%] sm:max-w-[350px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/kampus/gedung-${g.id}.webp`} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover object-[50%_55%]" />
        </div>
      </div>

      {isi.length === 0 ? (
        <p className="rounded-[22px] bg-white p-5 text-[15px] font-bold text-ink-3">Gedung ini sedang disiapkan. Minta ayah atau ibu membuka menunya, ya.</p>
      ) : (
        <section className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4 md:grid-cols-6">
          {isi.map((t) => {
            const k = lab(t.id);
            return (
              <button
                key={t.id}
                onClick={() => (k.terbuka ? openTool(t) : showToast(`Laboratorium ini terbuka setelah modul ${k.syarat}.`))}
                aria-label={k.terbuka ? t.name : `${t.name}, terkunci: tuntaskan modul ${k.syarat}`}
                className="flex flex-col items-center gap-1.5 rounded-[20px] p-1.5 transition-transform active:scale-95"
                style={k.terbuka ? undefined : { filter: "grayscale(.75)", opacity: 0.7 }}
              >
                <span className="relative">
                  {!k.terbuka && (
                    <span className="absolute -right-1.5 -bottom-1.5 z-10 flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#5b6b85] text-white">
                      <Icon name="lock" size={15} />
                    </span>
                  )}
                  <span className="sm:hidden">
                    <AppIcon t={t} size={64} theme="playful" />
                  </span>
                  <span className="hidden sm:block">
                    <AppIcon t={t} size={76} theme="playful" />
                  </span>
                </span>
                <span className="text-center leading-tight" style={{ fontFamily: BALOO, fontSize: 14, fontWeight: 800, color: INK }}>
                  {t.name}
                </span>
                {!k.terbuka && <span className="text-center text-[11px] leading-tight font-bold text-ink-3">{k.syarat}</span>}
              </button>
            );
          })}
        </section>
      )}
    </>
  );
}
