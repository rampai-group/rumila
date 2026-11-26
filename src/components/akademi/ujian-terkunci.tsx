import Link from "next/link";
import { levelMeta } from "@akademi/schema";
import { Icon } from "@/components/ui";
import type { BahasaAnak } from "@/lib/akademi/konten";
import type { PetaJenjang } from "@/lib/akademi/peta";
import { BALOO, INK, NUNITO } from "./jenis";
import { labelSisaPenguasaan, tautanRincianPenguasaan } from "./portal/penguasaan";

export function UjianAkhirTerkunci({ peta, bahasa = "id" }: { peta: PetaJenjang; bahasa?: BahasaAnak }) {
  const en = bahasa === "en";
  const level = levelMeta(peta.level);
  const misi = peta.total - peta.selesai;
  const kuis = peta.unit.filter((unit) => !unit.kuisLulus).length;
  const semester = peta.semester.filter((sm) => sm.total > 0 && !peta.semesterLulus[sm.ke - 1]);
  const semesterBelum = semester.map((sm) => sm.ke).join(en ? " and " : " dan ");
  const rincian = peta.rincianPemantapan;
  const kemampuan = peta.inti.total - peta.inti.dikuasai;
  const perluHari = rincian.filter((r) => !r.latihanUji && r.syarat.some((s) => s.jenis === "hari" && s.target > 1)).length;
  const perluLatihanUji = rincian.filter((r) => r.latihanUji).length;
  const perluPaket = rincian.filter((r) => r.syarat.some((s) => s.jenis === "paket" && s.target > 1)).length;
  const punyaSyarat = misi > 0 || kuis > 0 || semester.length > 0 || kemampuan > 0;
  const isiHalaman = en ? `The ${level.pangkat} Final Exam is locked` : `Ujian Akhir ${level.pangkat} masih terkunci`;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-linear-to-b from-[#eef7ff] to-[#d9edff] px-4 py-6 sm:p-8" style={{ color: INK, fontFamily: NUNITO }}>
      <section aria-labelledby="judul-ujian-terkunci" className="w-full max-w-lg rounded-[28px] bg-white p-5 shadow-[0_6px_0_rgba(11,37,69,0.12)] sm:p-7">
        <span aria-hidden className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-[#e4f1fd] text-[#135385]">
          <Icon name="lock" size={26} />
        </span>
        <h1 id="judul-ujian-terkunci" className="text-2xl leading-tight font-extrabold sm:text-[28px]" style={{ fontFamily: BALOO }}>
          {isiHalaman}
        </h1>
        {punyaSyarat ? (
          <ul className="mt-4 list-disc space-y-2 rounded-2xl bg-[#f2f7fc] py-3.5 pr-3.5 pl-8 text-[15px] font-bold sm:text-base">
            {misi > 0 && <li>{en ? `Complete ${misi} more ${misi === 1 ? "mission" : "missions"}.` : `Selesaikan ${misi} misi lagi.`}</li>}
            {kuis > 0 && <li>{en ? `Pass ${kuis} more module ${kuis === 1 ? "quiz" : "quizzes"}.` : `Lulus ${kuis} kuis modul lagi.`}</li>}
            {semester.length > 0 && <li>{en ? `Pass the Semester ${semesterBelum} ${semester.length === 1 ? "exam" : "exams"}.` : `Lulus Ujian Semester ${semesterBelum}.`}</li>}
            {kemampuan > 0 && (
              <li>
                {labelSisaPenguasaan(kemampuan, bahasa)}.
                {(perluHari > 0 || perluPaket > 0 || perluLatihanUji > 0) && (
                  <ul className="mt-1 list-[circle] space-y-0.5 pl-4 text-sm font-semibold text-[#3d4f66]">
                    {perluHari > 0 && <li>{en ? `${perluHari} ${perluHari === 1 ? "skill needs" : "skills need"} practice on another day.` : `${perluHari} kemampuan perlu bukti latihan pada hari berbeda.`}</li>}
                    {perluLatihanUji > 0 && <li>{en ? `${perluLatihanUji} ${perluLatihanUji === 1 ? "skill needs" : "skills need"} a new correct answer without hints.` : `${perluLatihanUji} kemampuan perlu jawaban benar baru tanpa bantuan.`}</li>}
                    {perluPaket > 0 && <li>{en ? `${perluPaket} ${perluPaket === 1 ? "skill needs" : "skills need"} practice in different packs.` : `${perluPaket} kemampuan perlu bukti latihan dari paket yang berbeda.`}</li>}
                  </ul>
                )}
              </li>
            )}
          </ul>
        ) : (
          <p className="mt-3 text-[15px] font-bold">{en ? "Check the map for your next step." : "Lihat tahap yang tersedia di peta."}</p>
        )}
        {peta.pemantapanMenungguHari && (
          <p className="mt-3 text-sm leading-snug font-bold text-[#135385]">
            {en ? "Your practice for today is recorded. Continue on another day." : "Latihan hari ini sudah tercatat. Lanjutkan pada hari berbeda."}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-2">
          {rincian.length > 0 && (
            <Link href={tautanRincianPenguasaan(level.id)} className="flex min-h-12 items-center justify-center rounded-2xl bg-[#0567c2] px-4 py-2 text-center font-extrabold text-white">
              {en ? "See skill progress" : "Lihat rincian kemampuan"}
            </Link>
          )}
          <Link href="/akademi" className={`flex min-h-12 items-center justify-center rounded-2xl px-4 py-2 text-center font-extrabold ${rincian.length ? "bg-[#e4f1fd] text-[#135385]" : "bg-[#0567c2] text-white"}`}>
            {en ? "Back to the map" : "Kembali ke peta"}
          </Link>
        </div>
      </section>
    </main>
  );
}
