"use client";

// Tes Penempatan (Sekolah Tahap 3): sekali saat anak mulai Academy. Jenjang tes pertama dari usia yang diisi wali saat
// mendaftar (belum ada → tanya usia dulu) → 10 soal kompetensi inti jenjang itu. Lulus (≥70) → jenjang awal anak
// (dicatat server). Belum lulus → tes jenjang di bawahnya; sampai PAUD tetap belum lulus → mulai dari PAUD.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ACTIVE_LEVELS, namaLevel, type LevelId } from "@akademi/schema";
import { LayarUjian } from "@/components/akademi/ujian";
import { BALOO, INK } from "@/components/akademi/jenis";
import { Icon } from "@/components/ui";
import { KOMPETENSI, setUsiaAnak, usiaAnak } from "@/lib/akademi/konten";
import { levelDariUsia, levelDiBawah } from "@/lib/akademi/penempatan";
import { cakupanUjian } from "@/lib/akademi/ruang-ujian";
import type { HasilUjian } from "@/lib/akademi/ujian";
import { useMe } from "@/lib/store";

const ADA = ACTIVE_LEVELS.filter((l) => KOMPETENSI.some((c) => c.level === l));
const USIA = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function PenempatanPage() {
  const me = useMe();
  const router = useRouter();
  const [level, setLevel] = useState<LevelId | null>(null);
  const [hasil, setHasil] = useState<HasilUjian | null>(null);
  const [usia, setUsia] = useState<number | null>(null);
  useEffect(() => setUsia(usiaAnak(me.id)), [me.id]);
  const saran = usia !== null ? levelDariUsia(usia, ADA) : undefined;
  const ids = useMemo(() => (level ? (cakupanUjian("penempatan", level, "", KOMPETENSI) ?? []) : []), [level]);
  const bawah = level ? levelDiBawah(level, ADA) : undefined;

  const Kotak = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-dvh items-center justify-center p-5" style={{ background: "linear-gradient(180deg,#0786eb,#135385)", fontFamily: BALOO, color: INK }}>
      <div className="w-full max-w-[460px] rounded-[28px] bg-white p-6 text-center shadow-[0_8px_0_rgba(11,37,69,.12)]">{children}</div>
    </div>
  );

  if (!level)
    return (
      <Kotak>
        <span className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-[#e4f1fd] text-[#0567c2]">
          <Icon name="explore" size={36} />
        </span>
        <h1 className="mt-3 text-[28px] font-extrabold">Tes Penempatan</h1>
        {saran ? (
          <>
            <p className="mt-1 text-[15px] font-bold text-[#4a5a75]" style={{ fontFamily: "var(--ff-nunito), system-ui" }}>
              10 soal untuk menentukan pangkat awal {me.name}. Kita mulai dari tes {namaLevel(saran)}, sesuai usia {usia} tahun.
            </p>
            <button onClick={() => setLevel(saran)} className="mt-4 w-full rounded-[18px] py-3.5 text-[19px] font-extrabold text-white active:scale-[.98]" style={{ background: "linear-gradient(155deg,#0786eb,#0567c2 85%)", boxShadow: "0 5px 0 #044a8f" }}>
              Mulai tes {namaLevel(saran)}
            </button>
          </>
        ) : (
          <>
            <p className="mt-1 text-[15px] font-bold text-[#4a5a75]" style={{ fontFamily: "var(--ff-nunito), system-ui" }}>
              Berapa usia {me.name}? Tes dimulai dari pangkat yang sesuai usia.
            </p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {USIA.map((u) => (
                <button key={u} onClick={() => { setUsiaAnak(me.id, u); setUsia(u); }} className="rounded-[14px] bg-[#cfe9ff] py-2.5 text-[18px] font-extrabold active:scale-95">
                  {u}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[12px] font-bold text-[#4a5a75]">tahun</p>
          </>
        )}
        <Link href="/akademi" className="mt-3 inline-flex min-h-11 min-w-24 items-center justify-center text-[15px] font-extrabold text-[#4a5a75]">
          Nanti saja
        </Link>
      </Kotak>
    );

  if (hasil?.lulus)
    return (
      <Kotak>
        <Icon name="verified" size={56} className="text-[#22a06b]" />
        <h1 className="mt-2 text-[26px] font-extrabold">Selamat datang, {namaLevel(level)}!</h1>
        <p className="mt-1 text-[15px] font-bold text-[#4a5a75]">Nilai tes {hasil.nilai}. Jenjang awalmu sudah ditetapkan.</p>
        <button onClick={() => router.push("/akademi")} className="mt-5 w-full rounded-[18px] bg-[#12803f] py-3.5 text-[19px] font-extrabold text-white shadow-[0_5px_0_#16804f]">
          Mulai belajar
        </button>
      </Kotak>
    );

  if (hasil)
    return (
      <Kotak>
        <Icon name="trending_down" size={52} className="text-[#fd861d]" />
        <h1 className="mt-2 text-[24px] font-extrabold">Nilai {hasil.nilai}, belum cukup untuk {namaLevel(level)}</h1>
        {bawah ? (
          <button
            onClick={() => {
              setHasil(null);
              setLevel(bawah);
            }}
            className="mt-5 w-full rounded-[18px] py-3.5 text-[19px] font-extrabold text-white"
            style={{ background: "linear-gradient(155deg,#0786eb,#0567c2 85%)", boxShadow: "0 5px 0 #044a8f" }}
          >
            Coba tes {namaLevel(bawah)}
          </button>
        ) : (
          <button
            onClick={() => router.push("/akademi")}
            className="mt-5 w-full rounded-[18px] bg-[#12803f] py-3.5 text-[19px] font-extrabold text-white shadow-[0_5px_0_#16804f]"
          >
            Mulai dari {namaLevel("PAUD")}
          </button>
        )}
      </Kotak>
    );

  return <LayarUjian key={level} jenis="penempatan" level={level} ruang="" kompetensiIds={ids} judul={namaLevel(level)} kembaliKe="/akademi" onSelesai={setHasil} />;
}
