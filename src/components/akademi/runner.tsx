"use client";

// Runner aktivitas Academy: paket → ronde demi ronde → presenter mekanik → nilai → catat bukti → layar selesai.
// Knob naik satu step setelah 2 benar beruntun, turun satu step setelah 2 salah beruntun (adaptif sederhana).

import { SisaBantuProvider } from "./mode-ujian";
import { useRouter } from "next/navigation";
import { duniaPaket, pilarPaket, rintanganPaket, wadahPaket } from "@/lib/akademi/tema-dunia";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isiBarang, type ContentPack } from "@akademi/schema";
import { buatRonde, buatRondeUnik, geserKnob, knobDefaults, kunciRonde, nilai, type Hasil, type Jawaban, type Knobs, type Ronde } from "@akademi/mechanics";
import { Icon } from "@/components/ui";
import { catatEvent, eventsAnak } from "@/lib/akademi/jejak";
import { judulPaket, kompetensiUntuk, levelAnak, paketById, useBahasaAnak, type BahasaAnak } from "@/lib/akademi/konten";
import { useBacksound } from "@/lib/akademi/backsound";
import { KALIMAT_RUNNER } from "@/lib/akademi/kalimat-suara";
import { AMBANG_STIKER, statusStikerMisi, type StatusStikerMisi } from "@/lib/akademi/koleksi";
import { diamkan, ucapkan } from "@/lib/akademi/suara";
import { useMe } from "@/lib/store";
import { completeTool, useToolSession } from "@/lib/tool-session";
import { uuid } from "@/lib/uuid";
import { LatarWarnaProvider } from "./benda";
import { PresenterDagang } from "./dagang";
import { HujanKonfeti, LayarAktivitas, panggungPadat, UmpanBalik } from "./dunia";
import { sfxAkademi } from "@/lib/sfx-akademi";
import { BALOO, INK } from "./jenis";
import { PresenterNavigasi } from "./navigasi";
import { PresenterPilah } from "./pilah";
import { PresenterPola } from "./pola";
import { PresenterSimulasi } from "./simulasi";
import { PresenterUrutkan } from "./urutkan";
import "./akademi.css";

export { judulPaket } from "@/lib/akademi/konten";

const JEDA_UMPAN_BALIK = 1400;

const PESAN_SELESAI = {
  baru: { judul: "Stiker baru!", suara: KALIMAT_RUNNER.stiker },
  "sudah-ada": { judul: KALIMAT_RUNNER.ulang, suara: KALIMAT_RUNNER.ulang },
  belum: { judul: "Bagus, sudah mencoba", suara: KALIMAT_RUNNER.coba },
} satisfies Record<StatusStikerMisi, { judul: string; suara: string }>;

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Jatah tombol Bantu per satu permainan (permintaan owner: anak tidak bergantung pada bantuan). */
const BATAS_BANTU = 3;

export function ActivityRunner({ paketId }: { paketId: string }) {
  const paket = useMemo(() => paketById(paketId), [paketId]);
  // Ronde bergantung seed sesi (acak di klien) → render hanya di klien agar tidak terjadi hydration mismatch.
  const [siap, setSiap] = useState(false);
  const [ulangan, setUlangan] = useState(0);
  useEffect(() => setSiap(true), []);
  if (!siap) return null;
  if (!paket) return <TidakAda />;
  return <Runner key={`${paket.id}|${ulangan}`} paket={paket} onLagi={() => setUlangan((u) => u + 1)} />;
}

function TidakAda() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-6 text-center" style={{ fontFamily: BALOO, color: INK }}>
      <div>
        <div style={{ fontSize: 56 }}>🧭</div>
        <p className="text-xl font-extrabold">Aktivitas ini belum ada.</p>
      </div>
    </div>
  );
}

function Runner({ paket, onLagi }: { paket: ContentPack; onLagi: () => void }) {
  const me = useMe();
  const learnerId = me?.id ?? "dev";
  const router = useRouter();
  useToolSession(learnerId, `akademi-${paket.mechanic}`, "edukasi");
  const bahasa = useBahasaAnak(learnerId);
  const lang = bahasa === "en" ? "en-US" : "id-ID";
  const t = useCallback((k: string) => paket.locale[bahasa][k] ?? paket.locale.id[k] ?? paket.locale.en[k] ?? k, [paket, bahasa]);
  const kompetensiIds = useMemo(() => kompetensiUntuk(paket.id).map((c) => c.id), [paket.id]);

  const sessionId = useRef(uuid());
  const [knobs, setKnobs] = useState<Knobs>(() => knobDefaults(paket));
  const [idx, setIdx] = useState(0);
  const [ronde, setRonde] = useState<Ronde>(() => buatRonde(paket, knobDefaults(paket), hash(`${learnerId}|${paket.id}|0|${sessionId.current}`)));
  /** kunci ronde yang sudah keluar di sesi ini, agar soal tidak berulang */
  const riwayat = useRef<string[]>([]);
  const [hasil, setHasil] = useState<Hasil | null>(null);
  const [hint, setHint] = useState(false);
  /** jumlah salah di soal ini (0 = percobaan pertama); anak tetap di soal sampai benar */
  const [percobaan, setPercobaan] = useState(0);
  /** Bantu yang memotong jatah; Bantu gratis (setelah salah 2x) dicatat terpisah, sekali per soal */
  const [bantuTerpakai, setBantuTerpakai] = useState(0);
  const [gratisTerpakai, setGratisTerpakai] = useState(false);
  const [skor, setSkor] = useState({ benar: 0, salah: 0, hint: 0 });
  const [beruntun, setBeruntun] = useState({ benar: 0, salah: 0 });
  const [statusStiker, setStatusStiker] = useState<StatusStikerMisi | null>(null);
  /** jumlah jawaban benar berturut-turut (untuk umpan balik yang makin meriah) */
  const [streak, setStreak] = useState(0);
  // backsound sesuai jenjang anak; diam di layar selesai (dan tidak ada di Ruang Ujian)
  const musik = useBacksound(learnerId, levelAnak(learnerId), statusStiker === null);
  const mulai = useRef(Date.now());
  const mulaiRonde = useRef(Date.now());
  const jeda = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const terkirim = useRef(false);
  const [total, setTotal] = useState(paket.rounds);

  // {barang} di instruksi = nama barang ronde ini (dagang yang barangnya diacak per ronde)
  const instruksi = useMemo(() => {
    const teks = t(paket.instructionKey);
    if (!teks.includes("arang}") || ronde.mechanic !== "dagang") return teks;
    const r = ronde.ronde;
    const id = Object.keys(r.tersedia)[0] ?? r.benda[0] ?? r.pesanan[0]?.goodId;
    const goods = paket.mechanic === "dagang" ? paket.goods : [];
    const g = goods.find((x) => x.id === id) ?? goods[0];
    return isiBarang(teks, g ? t(g.labelKey) : "");
  }, [paket, ronde, t]);
  const ucap = useCallback(() => ucapkan(instruksi, lang), [instruksi, lang]);

  const sudahMulai = useRef(false);
  useEffect(() => {
    if (!sudahMulai.current) {
      sudahMulai.current = true; // StrictMode menjalankan efek dua kali di dev; event mulai cukup sekali
      catatEvent({ learnerId, sessionId: sessionId.current, activityId: paket.id, mechanic: paket.mechanic, type: "activity_start", payload: { level: paket.level } });
    }
    // Putar instruksi otomatis hanya bila halaman sudah pernah disentuh (datang lewat ketukan). Bila tidak,
    // HP menahan ucapan lalu memutarnya pada ketukan pertama, mis. saat anak menekan tombol kembali.
    const aktif = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? true;
    const timer = aktif ? setTimeout(ucap, 400) : undefined;
    return () => {
      clearTimeout(timer);
      clearTimeout(jeda.current);
      diamkan();
    };
    // sekali per aktivitas
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Jatah Bantu 3 per permainan. Setelah salah 2x di soal yang sama, ada 1 Bantu gratis (tidak memotong jatah)
  // supaya anak yang tetap di soal sampai benar tidak macet.
  const gratisTersedia = percobaan >= 2 && !gratisTerpakai;
  const sisaBantu = Math.max(gratisTersedia ? 1 : 0, BATAS_BANTU - bantuTerpakai);
  const onHint = () => {
    if (sisaBantu <= 0) return;
    if (gratisTersedia) setGratisTerpakai(true);
    else setBantuTerpakai((n) => n + 1);
    setHint(true);
    setSkor((s) => ({ ...s, hint: s.hint + 1 }));
    sfxAkademi.ambil();
    catatEvent({ learnerId, sessionId: sessionId.current, activityId: paket.id, mechanic: paket.mechanic, type: "hint", payload: { ronde: idx, gratis: gratisTersedia } });
  };

  const onJawab = (j: Jawaban) => {
    if (terkirim.current) return;
    terkirim.current = true;
    const h = nilai(paket, ronde, j);
    const latencyMs = Date.now() - mulaiRonde.current;
    setHasil(h);
    const streakBaru = h.benar ? streak + 1 : 0;
    setStreak(streakBaru);
    if (h.benar) sfxAkademi.benar(streakBaru);
    else sfxAkademi.salah();
    catatEvent({
      learnerId, sessionId: sessionId.current, activityId: paket.id, mechanic: paket.mechanic, type: "attempt",
      payload: { itemId: `${paket.id}#${idx}`, correct: h.benar, hintUsed: hint, latencyMs, knobs, competencyIds: kompetensiIds, detail: { mode: (paket as { mode?: string }).mode ?? (paket as { execMode?: string }).execMode, percobaan: percobaan + 1, ...h.detail } },
    });
    // Nilai, bintang, dan tingkat kesulitan dihitung dari percobaan PERTAMA saja; percobaan berikutnya untuk belajar.
    const pertama = percobaan === 0;
    const skorBaru = pertama ? { ...skor, benar: skor.benar + (h.benar ? 1 : 0), salah: skor.salah + (h.benar ? 0 : 1) } : skor;
    setSkor(skorBaru);
    let k = knobs;
    if (pertama) {
      const b = h.benar ? { benar: beruntun.benar + 1, salah: 0 } : { benar: 0, salah: beruntun.salah + 1 };
      if (b.benar >= 2) { k = geserKnob(paket, knobs, 1); b.benar = 0; }
      if (b.salah >= 2) { k = geserKnob(paket, knobs, -1); b.salah = 0; }
      setBeruntun(b);
      setKnobs(k);
    }
    // Latihan: salah = tetap di soal yang sama (presenter dipasang ulang) sampai benar. Ujian punya alur sendiri.
    if (!h.benar) {
      jeda.current = setTimeout(() => {
        setHasil(null);
        setPercobaan((n) => n + 1);
        mulaiRonde.current = Date.now();
        terkirim.current = false;
      }, JEDA_UMPAN_BALIK);
      return;
    }
    const next = idx + 1;
    riwayat.current.push(kunciRonde(ronde));
    const rondeBerikut = next < total ? buatRondeUnik(paket, k, hash(`${learnerId}|${paket.id}|${next}|${sessionId.current}`), riwayat.current) : null;
    // Jika bank habis, progres pada umpan balik terakhir memakai jumlah ronde aktual.
    if (!rondeBerikut) setTotal(next);
    jeda.current = setTimeout(() => {
      setPercobaan(0);
      setGratisTerpakai(false);
      if (!rondeBerikut) {
        const durationMs = Date.now() - mulai.current;
        let mulaiMencatat = false;
        const catatSelesai = () => {
          if (mulaiMencatat) return;
          mulaiMencatat = true;
          const status = statusStikerMisi(eventsAnak(learnerId), paket.id, skorBaru.benar, skorBaru.salah);
          catatEvent({
            learnerId, sessionId: sessionId.current, activityId: paket.id, mechanic: paket.mechanic, type: "activity_end",
            payload: { outcome: "selesai", successCount: skorBaru.benar, failCount: skorBaru.salah, hintCount: skorBaru.hint, durationMs },
          });
          if (skorBaru.benar >= Math.ceil(next * AMBANG_STIKER)) completeTool(learnerId, `akademi-${paket.mechanic}`, "edukasi", paket.id);
          setStatusStiker(status);
        };
        // Tab dengan murid yang sama harus membaca riwayat setelah tab lain selesai mencatat.
        if (navigator.locks) {
          void navigator.locks.request(`rumila-akademi-selesai-${learnerId}`, catatSelesai).catch((error: unknown) => {
            if (mulaiMencatat) console.error("[akademi] tidak bisa mencatat penyelesaian misi", error);
            else catatSelesai();
          });
        } else catatSelesai();
        return;
      }
      setIdx(next);
      setHasil(null);
      setHint(false);
      mulaiRonde.current = Date.now();
      setRonde(rondeBerikut);
      terkirim.current = false;
    }, JEDA_UMPAN_BALIK);
  };

  if (statusStiker !== null) return <LayarSelesai paket={paket} bahasa={bahasa} skor={skor} statusStiker={statusStiker} onLagi={onLagi} onKembali={() => router.push("/akademi")} />;

  const props = { paket, ronde, t, onJawab, onHint, hasil } as const;
  return (
    <LayarAktivitas judul={judulPaket(paket, bahasa)} ronde={idx + 1} percobaan={percobaan} total={total} instruksi={instruksi} onUcap={ucap} dunia={duniaPaket(paket)} wadah={wadahPaket(paket)} rintangan={rintanganPaket(paket)} pilar={pilarPaket(paket)} musik={musik} padat={panggungPadat(paket, ronde)}>
      <div key={`${idx}-${percobaan}`} className="akademi-fade flex flex-1 flex-col justify-center">
        <SisaBantuProvider value={sisaBantu}>
        <LatarWarnaProvider paket={paket}>
        {paket.mechanic === "pilah" && ronde.mechanic === "pilah" && <PresenterPilah {...props} paket={paket} ronde={ronde.ronde} />}
        {paket.mechanic === "urutkan" && ronde.mechanic === "urutkan" && <PresenterUrutkan {...props} paket={paket} ronde={ronde.ronde} />}
        {paket.mechanic === "dagang" && ronde.mechanic === "dagang" && <PresenterDagang {...props} paket={paket} ronde={ronde.ronde} />}
        {paket.mechanic === "navigasi" && ronde.mechanic === "navigasi" && <PresenterNavigasi {...props} paket={paket} ronde={ronde.ronde} />}
        {paket.mechanic === "pola" && ronde.mechanic === "pola" && <PresenterPola {...props} paket={paket} ronde={ronde.ronde} />}
        {paket.mechanic === "simulasi" && ronde.mechanic === "simulasi" && <PresenterSimulasi {...props} paket={paket} ronde={ronde.ronde} />}
        </LatarWarnaProvider>
        </SisaBantuProvider>
      </div>
      {hasil && <UmpanBalik key={`umpan-${idx}-${percobaan}`} benar={hasil.benar} beruntun={streak} pakaiBantu={!hasil.benar && percobaan >= 1 && (!gratisTerpakai || bantuTerpakai < BATAS_BANTU)} />}
    </LayarAktivitas>
  );
}

function LayarSelesai({ paket, bahasa, skor, statusStiker, onLagi, onKembali }: { paket: ContentPack; bahasa: BahasaAnak; skor: { benar: number; salah: number; hint: number }; statusStiker: StatusStikerMisi; onLagi: () => void; onKembali: () => void }) {
  const total = skor.benar + skor.salah;
  const bintang = skor.benar >= total ? 3 : statusStiker !== "belum" ? 2 : skor.benar > 0 ? 1 : 0;
  const pesan = PESAN_SELESAI[statusStiker];
  // bintang muncul satu per satu (dengan bunyi), lalu fanfare
  const [tampil, setTampil] = useState(0);
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    for (let k = 0; k < bintang; k++) t.push(setTimeout(() => { setTampil(k + 1); sfxAkademi.bintang(k); }, 350 + k * 330));
    t.push(setTimeout(() => sfxAkademi.selesai(bintang), 350 + bintang * 330 + 120));
    ucapkan(pesan.suara);
    return () => t.forEach(clearTimeout);
  }, [bintang, pesan.suara]);
  return (
    <div className="flex min-h-dvh items-center justify-center p-5" style={{ background: "linear-gradient(180deg,#0786eb,#22b573)", fontFamily: BALOO, color: INK }}>
      {bintang >= 2 && <HujanKonfeti jumlah={bintang >= 3 ? 60 : 36} />}
      <div className="akademi-pop w-full max-w-[380px] rounded-[28px] bg-white p-6 text-center shadow-[0_8px_0_rgba(11,37,69,.12)]">
        <div className="flex justify-center gap-1">
          {[1, 2, 3].map((k) => (
            <span key={k} className={tampil >= k ? "akademi-bintang" : ""} style={{ display: "inline-flex" }}>
              <Icon name="star" size={54} className={tampil >= k ? "text-[#f2b705]" : "text-[#e2dccd]"} />
            </span>
          ))}
        </div>
        <div style={{ fontSize: 72, lineHeight: 1 }} className="my-2">{bintang >= 2 ? "🏅" : "🌱"}</div>
        <div style={{ fontSize: 26, fontWeight: 900 }}>{pesan.judul}</div>
        <p className="mt-1 text-[15px] font-bold opacity-75">
          {skor.benar} dari {total} benar · {judulPaket(paket, bahasa)}
        </p>
        <div className="mt-5 flex gap-2">
          <button onClick={onLagi} className="flex-1 rounded-[16px] bg-[#efe7d6] py-3 text-[16px] font-extrabold active:translate-y-0.5">Main lagi</button>
          <button onClick={onKembali} className="flex-1 rounded-[16px] bg-[#12803f] py-3 text-[16px] font-extrabold text-white shadow-[0_4px_0_#16804f] active:translate-y-0.5">Selesai</button>
        </div>
      </div>
    </div>
  );
}
