import Link from "next/link";
import { levelMeta, type LevelId } from "@akademi/schema";
import type { BahasaAnak } from "@/lib/akademi/konten";
import type { RincianPemantapan } from "@/lib/akademi/peta";

export function tautanRincianPenguasaan(level: LevelId): string {
  return `/akademi/sertifikat/${levelMeta(level).slug}#rincian-penguasaan`;
}

export function labelSisaPenguasaan(sisa: number, bahasa: BahasaAnak): string {
  if (bahasa === "en") return `${sisa} core ${sisa === 1 ? "skill" : "skills"} left to master`;
  return `${sisa} kemampuan inti belum dikuasai`;
}

export function labelPemantapanUji(bahasa: BahasaAnak): string {
  return bahasa === "en"
    ? "For this test profile, Navigator Mastery Practice can be completed on the same day. Each skill requires a new correct answer without hints."
    : "Profil uji ini bisa menuntaskan Pemantapan Navigator pada tanggal yang sama. Setiap kemampuan memerlukan jawaban benar baru tanpa bantuan.";
}

function labelSyarat({ jenis, jumlah, target }: RincianPemantapan["syarat"][number], bahasa: BahasaAnak): string {
  const inggris = bahasa === "en";
  if (jenis === "akurasi") return inggris
    ? `Accuracy ${Math.floor(jumlah)}%, goal ${Math.ceil(target)}%`
    : `Akurasi ${Math.floor(jumlah)}%, target ${Math.ceil(target)}%`;

  const satuan = inggris
    ? { benar: "correct answers", paket: "activity packs", hari: "different days", tanpaBantu: "recent answers without hints" }
    : { benar: "jawaban benar", paket: "paket", hari: "hari", tanpaBantu: "jawaban terakhir tanpa bantuan" };
  return `${jumlah} ${inggris ? "of" : "dari"} ${target} ${satuan[jenis]}`;
}

/** Daftar kemampuan yang menghalangi kenaikan jenjang beserta syarat yang masih kurang. */
export function RincianPenguasaan({ rincian, bahasa, tautanLatih, uji = false }: {
  rincian: readonly RincianPemantapan[];
  bahasa: BahasaAnak;
  tautanLatih: ReadonlyMap<string, string>;
  uji?: boolean;
}) {
  const inggris = bahasa === "en";
  const urut = [...rincian].sort((a, b) => Number(tautanLatih.has(b.kompetensi.id)) - Number(tautanLatih.has(a.kompetensi.id)));

  return (
    <section id="rincian-penguasaan" aria-labelledby="judul-rincian-penguasaan" tabIndex={-1} className="scroll-mt-4 rounded-[22px] bg-white p-4 shadow-[0_4px_0_rgba(11,37,69,.08)] sm:p-5">
      <h2 id="judul-rincian-penguasaan" className="text-lg font-black leading-tight">{inggris ? "Core skill progress" : "Rincian penguasaan"}</h2>
      {uji && <p className="mt-2 text-sm font-bold text-ink-3">{labelPemantapanUji(bahasa)}</p>}
      {urut.length === 0 && (
        <p className="mt-2 text-sm font-bold text-ink-3">{inggris ? "Core skills for this rank are not available yet." : "Kemampuan inti untuk jenjang ini belum tersedia."}</p>
      )}
      <ul className="mt-2 divide-y divide-[#f0e4d2]">
        {urut.map(({ kompetensi, syarat, tungguHariBerbeda, bisaDilatihHariIni, latihanUji }) => {
          const nama = kompetensi.statement[bahasa] ?? kompetensi.statement.id;
          const unit = kompetensi.unit.nama[bahasa] ?? kompetensi.unit.nama.id;
          const href = tautanLatih.get(kompetensi.id);
          return (
            <li key={kompetensi.id} className="flex min-w-0 flex-wrap items-start gap-x-4 gap-y-2 py-3">
              <div className="min-w-0 flex-[1_1_15rem]">
                <p className="text-[15px] font-extrabold leading-snug [overflow-wrap:anywhere]">{nama}</p>
                <p className="mt-1 text-[13px] font-bold text-ink-3">{unit}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={inggris ? "Requirements left" : "Syarat yang masih kurang"}>
                  {syarat.map((s) => (
                    <li key={s.jenis} className="max-w-full rounded-[12px] bg-[#edf4fb] px-2.5 py-1 text-[13px] font-extrabold leading-snug text-[#17446f] [overflow-wrap:anywhere]">
                      {latihanUji && s.jenis === "hari"
                        ? inggris ? "1 new correct answer without hints" : "1 jawaban benar baru tanpa bantuan"
                        : labelSyarat(s, bahasa)}
                    </li>
                  ))}
                </ul>
                {tungguHariBerbeda && (
                  <p className="mt-2 text-[13px] font-bold text-[#875200]">
                    {bisaDilatihHariIni
                      ? inggris ? "Practice on another day to meet the day requirement." : "Berlatihlah pada hari berbeda untuk memenuhi syarat hari."
                      : inggris ? "Continue on a different day." : "Lanjutkan pada hari berbeda."}
                  </p>
                )}
              </div>
              {href && (
                <Link href={href} aria-label={`${inggris ? "Practice" : "Latih"}. ${nama}`} className="inline-flex min-h-11 items-center justify-center rounded-[14px] bg-[#0567c2] px-4 py-2 text-sm font-extrabold text-white transition-transform active:scale-95">
                  {inggris ? "Practice" : "Latih"}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
