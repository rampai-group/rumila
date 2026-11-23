"use client";

// Layar ujian RINOYA Academy (Sekolah Tahap 3): pembuka berisi aturan → soal demi soal (satu ronde dari paket
// permainan, tombol bantuan disembunyikan) → layar nilai. Jawaban dicatat sebagai event "attempt" dengan sessionId
// ujian, lalu server menghitung nilai resmi (/api/akademi/ujian).

import Link from "next/link";
import { duniaPaket, pilarPaket, rintanganPaket, wadahPaket } from "@/lib/akademi/tema-dunia";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isiBarang, levelMeta, type ContentPack, type LevelId } from "@akademi/schema";
import { buatRonde, knobDefaults, nilai, type Hasil, type Jawaban, type Ronde } from "@akademi/mechanics";
import { Icon } from "@/components/ui";
import { catatEvent, eventsAnak } from "@/lib/akademi/jejak";
import { PAKET, kompetensiUntuk, paketById, useBahasaAnak } from "@/lib/akademi/konten";
import { kalimatUjian } from "@/lib/akademi/kalimat-suara";
import { diamkan, ucapkan, ucapkanBerurutan } from "@/lib/akademi/suara";
import { AMBANG, JUMLAH_SOAL, NAMA_UJIAN, SEKALI, bolehMengulang, lulusDari, nilaiDari, predikat, rencanaUjian, type HasilUjian, type JenisUjian } from "@/lib/akademi/ujian";
import { serahkanUjian, useUjian } from "@/lib/akademi/ujian-klien";
import { sfx } from "@/lib/sfx";
import { useMe } from "@/lib/store";
import { uuid } from "@/lib/uuid";
import { LatarWarnaProvider } from "./benda";
import { PresenterDagang } from "./dagang";
import { LayarAktivitas, panggungPadat } from "./dunia";
import { BALOO, INK } from "./jenis";
import { ModeUjianProvider } from "./mode-ujian";
import { PresenterNavigasi } from "./navigasi";
import { PresenterPilah } from "./pilah";
import { PresenterPola } from "./pola";
import { PresenterSimulasi } from "./simulasi";
import { PresenterUrutkan } from "./urutkan";
import "./akademi.css";

const JEDA = 900;

export interface UjianProps {
  jenis: JenisUjian;
  level: LevelId;
  ruang: string;
  kompetensiIds: string[];
  /** nama yang diuji, mis. "Bilangan 1–5" atau "Semester 1" */
  judul: string;
  kembaliKe?: string;
  /** dipanggil setelah hasil tersimpan (mis. tes penempatan mencoba jenjang lain) */
  onSelesai?: (h: HasilUjian) => void;
}

export function LayarUjian(p: UjianProps) {
  const me = useMe();
  const riwayat = useUjian(me.id);
  const [mulai, setMulai] = useState<null | "ujian" | "latihan">(null);
  const [sessionId, setSessionId] = useState(() => uuid());
  const soal = useMemo(() => rencanaUjian(p.kompetensiIds, PAKET, JUMLAH_SOAL[p.jenis], sessionId, p.level), [p.kompetensiIds, p.jenis, p.level, sessionId]);
  const izin = bolehMengulang(riwayat, p.jenis, p.level, p.ruang);
  const pending = riwayat.find((h) => h.pending && h.jenis === p.jenis && h.level === p.level && h.ruang === p.ruang);
  // Ujian Akhir yang sudah dimulai tapi belum diserahkan (anak keluar di tengah): tidak boleh mulai baru
  const tertunda = useMemo(() => (SEKALI.has(p.jenis) ? sesiTertunda(me.id, p.jenis, p.level, riwayat) : null), [me.id, p.jenis, p.level, riwayat]);
  if (!mulai)
    return (
      <Pembuka
        {...p}
        jumlah={soal.length}
        izin={izin}
        pending={pending}
        tertunda={tertunda}
        onMulai={() => setMulai("ujian")}
        onLatihan={() => {
          setSessionId(uuid());
          setMulai("latihan");
        }}
      />
    );
  return <Soal key={`${mulai}-${sessionId}`} {...p} sessionId={sessionId} soal={soal} learnerId={me.id} latihan={mulai === "latihan"} />;
}

/** Sesi Ujian Akhir yang sudah dijawab sebagian di perangkat ini tetapi belum punya hasil. */
function sesiTertunda(memberId: string, jenis: JenisUjian, level: LevelId, riwayat: HasilUjian[]) {
  const sesi = new Map<string, { benar: number; dijawab: number }>();
  for (const e of eventsAnak(memberId)) {
    if (e.type !== "attempt") continue;
    const d = (e.payload as { detail?: { ujian?: string; level?: string } }).detail;
    if (d?.ujian !== jenis || d.level !== level) continue;
    const x = sesi.get(e.sessionId) ?? { benar: 0, dijawab: 0 };
    x.dijawab++;
    if ((e.payload as { correct?: boolean }).correct) x.benar++;
    sesi.set(e.sessionId, x);
  }
  for (const [sessionId, x] of sesi) if (!riwayat.some((h) => h.sessionId === sessionId)) return { sessionId, ...x };
  return null;
}

function Bingkai({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center p-5" style={{ background: "linear-gradient(180deg,#0786eb,#135385)", fontFamily: BALOO, color: INK }}>
      <div className="akademi-pop w-full max-w-[440px] rounded-[28px] bg-white p-6 text-center shadow-[0_8px_0_rgba(11,37,69,.12)]">{children}</div>
    </div>
  );
}

function Pembuka({ jenis, level, ruang, judul, jumlah, izin, tertunda, pending, onMulai, onLatihan, kembaliKe = "/akademi", onSelesai }: UjianProps & { jumlah: number; izin: ReturnType<typeof bolehMengulang>; tertunda: ReturnType<typeof sesiTertunda>; pending?: HasilUjian; onMulai: () => void; onLatihan: () => void }) {
  const me = useMe();
  const lv = levelMeta(level);
  const sekali = SEKALI.has(jenis);
  const [siap, setSiap] = useState(false);
  const [menyerahkan, setMenyerahkan] = useState(false);
  const [hasil, setHasil] = useState<HasilUjian | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const [kirimUlang, setKirimUlang] = useState<HasilUjian | null>(null);
  const riwayat = useUjian(me.id);
  const aturan = sekali
    ? [`${jumlah} soal dari seluruh materi ${lv.pangkat}`, "Tanpa tombol Bantu", "HANYA SEKALI — tidak bisa diulang", "Nilai apa adanya tertulis di sertifikat", "Keluar di tengah jalan = soal sisa dihitung salah"]
    : [jenis === "penempatan" ? `${jumlah} soal untuk menemukan titik mulaimu` : `${jumlah} soal dari permainan yang sudah kamu latih`, "Tanpa tombol Bantu", `Lulus bila nilai minimal ${AMBANG[jenis]}`, jenis === "penempatan" ? "Hasilnya menentukan jenjang awalmu" : "Belum lulus? Ulangi materinya, coba lagi besok"];
  const serahkanTertunda = async (h: HasilUjian) => {
    setMenyerahkan(true);
    setGalat(null);
    setKirimUlang(h);
    const r = await serahkanUjian(me.id, h, sekali);
    if (r.ok) setHasil(r.hasil);
    else setGalat(r.alasan);
    setMenyerahkan(false);
  };
  const n = JUMLAH_SOAL[jenis];
  const sebagian: HasilUjian | null = tertunda ? { jenis, level, ruang, sessionId: tertunda.sessionId, benar: tertunda.benar, total: n, nilai: nilaiDari(tertunda.benar, n), lulus: lulusDari(jenis, nilaiDari(tertunda.benar, n)), at: new Date().toISOString() } : null;
  const aktif = kirimUlang ?? pending;
  const hasilResmi = aktif ? riwayat.find((h) => h.sessionId === aktif.sessionId && !h.pending) : undefined;
  const akhir = hasilResmi ?? hasil ?? pending;
  useLaporHasil(akhir, onSelesai);
  if (akhir || kirimUlang) {
    return <LayarNilai h={akhir ?? null} judul={judul} kembaliKe={kembaliKe} mengirim={menyerahkan} galat={galat} onUlang={aktif ? () => void serahkanTertunda(aktif) : undefined} />;
  }
  return (
    <Bingkai>
      <span className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-[#e4f1fd] text-[#0567c2]">
        <Icon name={jenis === "kuis" ? "quiz" : jenis === "penempatan" ? "explore" : "workspace_premium"} size={36} />
      </span>
      <p className="mt-3 text-[13px] font-black tracking-[0.12em] text-[#a34a00] uppercase">
        {NAMA_UJIAN[jenis]} · {lv.pangkat}
      </p>
      <h1 className="mt-1 text-[28px] leading-tight font-extrabold">{judul}</h1>
      <ul className="mt-4 flex flex-col gap-2 text-left text-[15px] font-bold" style={{ fontFamily: "var(--ff-nunito), system-ui, sans-serif" }}>
        {aturan.map((a) => (
          <li key={a} className="flex items-center gap-2 rounded-[14px] bg-[#d6ecff] px-3 py-2">
            <Icon name="check_circle" size={20} className="text-[#22a06b]" /> {a}
          </li>
        ))}
      </ul>
      {sekali && tertunda && izin.boleh ? (
        <div className="mt-5 rounded-[14px] bg-[#fff4e5] px-3 py-3 text-[15px] font-bold text-[#a34a00]">
          Ujian Akhir sudah dimulai ({tertunda.dijawab} soal dijawab) dan tidak bisa diulang. Serahkan hasilnya sekarang.
          <button onClick={() => { if (sebagian) void serahkanTertunda(sebagian); }} disabled={menyerahkan} className="mt-3 w-full rounded-[14px] bg-[#0b2545] py-3 text-[17px] font-extrabold text-white disabled:opacity-60">
            {menyerahkan ? "Menyerahkan…" : "Serahkan hasil"}
          </button>
        </div>
      ) : jumlah === 0 ? (
        <p className="mt-5 text-[15px] font-bold text-[#c2410c]">Soal ujian ini belum tersedia.</p>
      ) : izin.boleh && sekali ? (
        <>
          <button onClick={onLatihan} className="mt-5 w-full rounded-[18px] bg-[#efe7d6] py-3 text-[17px] font-extrabold active:translate-y-0.5">
            Latihan dulu (tidak dinilai)
          </button>
          <label className="mt-4 flex min-h-11 items-center gap-3 text-left text-[15px] font-bold" style={{ fontFamily: "var(--ff-nunito), system-ui, sans-serif" }} htmlFor="siap-ujian-akhir">
            <input id="siap-ujian-akhir" type="checkbox" checked={siap} onChange={(e) => setSiap(e.target.checked)} className="size-7 shrink-0" />
            Aku sudah siap. Ujian Akhir hanya sekali.
          </label>
          <button onClick={onMulai} disabled={!siap} className="mt-3 w-full rounded-[18px] py-3.5 text-[20px] font-extrabold text-white active:translate-y-0.5 disabled:opacity-45" style={{ background: "linear-gradient(155deg,#ff8a5c,#e8590c 65%)", boxShadow: "0 5px 0 #b8460a" }}>
            Mulai Ujian Akhir
          </button>
        </>
      ) : izin.boleh ? (
        <button onClick={onMulai} className="mt-5 w-full rounded-[18px] py-3.5 text-[20px] font-extrabold text-white active:translate-y-0.5" style={{ background: "linear-gradient(155deg,#0786eb,#0567c2 85%)", boxShadow: "0 5px 0 #044a8f" }}>
          Mulai {NAMA_UJIAN[jenis].toLowerCase()}
        </button>
      ) : (
        <p className="mt-5 rounded-[14px] bg-[#fff4e5] px-3 py-3 text-[15px] font-bold text-[#a34a00]">{izin.sekali ? "Ujian Akhir sudah dikerjakan. Hasilnya ada di sertifikat." : izin.besok ? "Kamu sudah mencoba hari ini. Ulangi materinya dulu, lalu coba lagi besok, ya." : "Ujian ini sudah lulus."}</p>
      )}
      <Link href={kembaliKe} className="mt-2 inline-flex min-h-11 min-w-24 items-center justify-center text-[15px] font-extrabold text-[#4a5a75]">
        Kembali
      </Link>
    </Bingkai>
  );
}

function Soal({ jenis, level, ruang, judul, sessionId, soal, learnerId, latihan, kembaliKe = "/akademi", onSelesai }: UjianProps & { sessionId: string; soal: ReturnType<typeof rencanaUjian>; learnerId: string; latihan?: boolean }) {
  const bahasa = useBahasaAnak(learnerId);
  const lang = bahasa === "en" ? "en-US" : "id-ID";
  const [idx, setIdx] = useState(0);
  const [hasil, setHasil] = useState<Hasil | null>(null);
  const [benar, setBenar] = useState(0);
  const [akhir, setAkhir] = useState<HasilUjian | null>(null);
  const [mengirim, setMengirim] = useState(false);
  const [baru, setBaru] = useState<HasilUjian | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const terkirim = useRef(false);
  const jeda = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const riwayat = useUjian(learnerId);
  const resmi = riwayat.find((h) => h.sessionId === sessionId && !h.pending);
  const h = resmi ?? akhir;
  useLaporHasil(h, latihan ? undefined : onSelesai);
  useEffect(() => () => clearTimeout(jeda.current), []);
  const mulaiRonde = useRef(Date.now());
  const s = soal[idx];
  const paket = useMemo(() => (s ? paketById(s.paketId) : undefined), [s]);
  const ronde = useMemo<Ronde | null>(() => (paket && s ? buatRonde(paket, knobDefaults(paket), s.seed) : null), [paket, s]);
  const t = useCallback((k: string) => (paket ? (paket.locale[bahasa][k] ?? paket.locale.id[k] ?? paket.locale.en[k] ?? k) : k), [paket, bahasa]);
  const instruksi = useMemo(() => (paket && ronde ? teksInstruksi(paket, ronde, t) : ""), [paket, ronde, t]);
  const ucap = useCallback(() => ucapkan(instruksi, lang), [instruksi, lang]);

  useEffect(() => {
    if (!instruksi) return;
    const tm = setTimeout(ucap, 350);
    return () => {
      clearTimeout(tm);
      diamkan();
    };
  }, [instruksi, ucap]);

  const simpan = async (lokal: HasilUjian) => {
    setMengirim(true);
    setGalat(null);
    const r = await serahkanUjian(learnerId, lokal);
    if (r.ok) {
      setAkhir(r.hasil);
      if (!r.hasil.pending && r.hasil.lulus) sfx.celebrate();
    } else setGalat(r.alasan);
    setMengirim(false);
  };

  const onJawab = (j: Jawaban) => {
    if (terkirim.current || !paket || !ronde || !s) return;
    terkirim.current = true;
    const h = nilai(paket, ronde, j);
    setHasil(h);
    sfx.tap();
    catatEvent({
      learnerId, sessionId, activityId: paket.id, mechanic: paket.mechanic, type: "attempt",
      payload: { itemId: `ujian:${jenis}:${ruang}#${idx}`, correct: h.benar, hintUsed: false, latencyMs: Date.now() - mulaiRonde.current, knobs: knobDefaults(paket), competencyIds: kompetensiUntuk(paket.id).map((c) => c.id), detail: { ujian: latihan ? "latihan" : jenis, level, ruang, ...h.detail } },
    });
    const b = benar + (h.benar ? 1 : 0);
    setBenar(b);
    jeda.current = setTimeout(() => {
      if (idx + 1 < soal.length) {
        setIdx(idx + 1);
        setHasil(null);
        terkirim.current = false;
        mulaiRonde.current = Date.now();
        return;
      }
      const n = nilaiDari(b, soal.length);
      const lokal: HasilUjian = { jenis, level, ruang, sessionId, benar: b, total: soal.length, nilai: n, lulus: lulusDari(jenis, n), at: new Date().toISOString() };
      if (latihan) {
        setAkhir(lokal);
        return;
      }
      setBaru(lokal);
      void simpan(lokal);
    }, JEDA);
  };

  if (h || baru || mengirim) return <LayarNilai h={h} judul={judul} kembaliKe={kembaliKe} latihan={latihan} mengirim={mengirim} galat={galat} onUlang={baru ? () => void simpan(baru) : undefined} />;
  if (!paket || !ronde) return <Bingkai>Soal tidak ditemukan.</Bingkai>;

  const props = { paket, ronde, t, onJawab, hasil: null } as const;
  return (
    <ModeUjianProvider value={true}>
      <LayarAktivitas judul={`${latihan ? "Latihan " : ""}${NAMA_UJIAN[jenis]} · ${judul}`} ronde={idx + 1} total={soal.length} instruksi={instruksi} onUcap={ucap} kembaliKe={kembaliKe} dunia={duniaPaket(paket)} wadah={wadahPaket(paket)} rintangan={rintanganPaket(paket)} pilar={pilarPaket(paket)} padat={panggungPadat(paket)}>
        <div key={idx} inert={!!hasil} className="akademi-fade flex flex-1 flex-col justify-center">
          <LatarWarnaProvider paket={paket}>
          {paket.mechanic === "pilah" && ronde.mechanic === "pilah" && <PresenterPilah {...props} paket={paket} ronde={ronde.ronde} />}
          {paket.mechanic === "urutkan" && ronde.mechanic === "urutkan" && <PresenterUrutkan {...props} paket={paket} ronde={ronde.ronde} />}
          {paket.mechanic === "dagang" && ronde.mechanic === "dagang" && <PresenterDagang {...props} paket={paket} ronde={ronde.ronde} />}
          {paket.mechanic === "navigasi" && ronde.mechanic === "navigasi" && <PresenterNavigasi {...props} paket={paket} ronde={ronde.ronde} />}
          {paket.mechanic === "pola" && ronde.mechanic === "pola" && <PresenterPola {...props} paket={paket} ronde={ronde.ronde} />}
          {paket.mechanic === "simulasi" && ronde.mechanic === "simulasi" && <PresenterSimulasi {...props} paket={paket} ronde={ronde.ronde} />}
          </LatarWarnaProvider>
        </div>
        {hasil && (
          <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
            <div role="status" className="akademi-pop rounded-[24px] bg-[#0b2545] px-6 py-4 text-white" style={{ fontFamily: BALOO, fontSize: 22, fontWeight: 800 }}>
              Jawaban dicatat
            </div>
          </div>
        )}
      </LayarAktivitas>
    </ModeUjianProvider>
  );
}

function teksInstruksi(paket: ContentPack, ronde: Ronde, t: (k: string) => string) {
  const teks = t(paket.instructionKey);
  if (!teks.includes("arang}") || ronde.mechanic !== "dagang" || paket.mechanic !== "dagang") return teks;
  const r = ronde.ronde;
  const id = Object.keys(r.tersedia)[0] ?? r.benda[0] ?? r.pesanan[0]?.goodId;
  const g = paket.goods.find((x) => x.id === id) ?? paket.goods[0];
  return isiBarang(teks, g ? t(g.labelKey) : "");
}

function useLaporHasil(h: HasilUjian | null | undefined, onSelesai?: UjianProps["onSelesai"]) {
  const dilaporkan = useRef<string | null>(null);
  useEffect(() => {
    if (!onSelesai || !h || h.pending || dilaporkan.current === h.sessionId) return;
    dilaporkan.current = h.sessionId;
    onSelesai(h);
  }, [h, onSelesai]);
}

const alasanKirim: Record<string, string> = {
  tanpa_sesi: "Masuk kembali ke akunmu sebelum mencoba mengirim lagi.",
  sesi_tidak_sah: "Masuk kembali ke akunmu sebelum mencoba mengirim lagi.",
  ujian_terkunci: "Tahap ujian ini belum terbuka di peta. Periksa tahap yang tersedia.",
  jenjang_beda: "Jenjang aktifmu berubah. Kembali ke peta untuk melihat tahap yang tersedia.",
  penempatan_ditutup: "Jenjang awalmu sudah ditetapkan. Kembali ke peta untuk melanjutkan.",
  sudah_dikerjakan: "Ujian ini sudah dijawab di sesi lain. Periksa hasilnya di peta.",
  sudah_lulus: "Ujian ini sudah lulus. Lihat tahap berikutnya di peta.",
  tunggu_besok: "Kamu sudah mencoba hari ini. Coba lagi besok, ya.",
};

function LayarNilai({ h, judul, kembaliKe, latihan, mengirim, galat, onUlang }: { h: HasilUjian | null; judul: string; kembaliKe: string; latihan?: boolean; mengirim?: boolean; galat?: string | null; onUlang?: () => void }) {
  const router = useRouter();
  useEffect(() => {
    if (!h || h.pending) return;
    const u = latihan ? kalimatUjian.latihan(h.nilai) : SEKALI.has(h.jenis) ? kalimatUjian.akhir(h.nilai) : h.lulus ? kalimatUjian.lulus(h.nilai) : kalimatUjian.belum(h.nilai);
    ucapkanBerurutan(u.potongan, "id-ID", u.teks);
  }, [h, latihan]);
  if (mengirim || !h || h.pending || galat)
    return (
      <Bingkai>
        <p role="status" className="text-[20px] font-extrabold">{mengirim ? "Mengirim hasil…" : "Hasil belum dikonfirmasi"}</p>
        {!mengirim && (
          <>
            <p className="mt-2 text-[15px] font-bold text-[#4a5a75]">{galat ? (alasanKirim[galat] ?? "Hasil belum bisa disimpan. Coba kirim lagi.") : "Jawabanmu menunggu konfirmasi. Kamu bisa mengirimnya lagi saat internet tersambung."}</p>
            {onUlang && <button type="button" onClick={onUlang} className="mt-4 w-full rounded-[18px] bg-[#12803f] py-3.5 text-[19px] font-extrabold text-white">Coba kirim lagi</button>}
            <Link href={kembaliKe} className="mt-2 inline-flex min-h-11 items-center font-extrabold">Kembali ke peta</Link>
          </>
        )}
      </Bingkai>
    );
  const pred = predikat(h.nilai, h.jenis);
  return (
    <Bingkai>
      <p className="text-[13px] font-black tracking-[0.12em] text-[#a34a00] uppercase">
        {latihan ? "Latihan · tidak dinilai" : `${NAMA_UJIAN[h.jenis]} · ${judul}`}
      </p>
      <div className="mx-auto mt-3 flex size-36 flex-col items-center justify-center rounded-full border-[10px]" style={{ borderColor: h.lulus ? "#22a06b" : "#fd861d" }}>
        <span className="text-[52px] leading-none font-extrabold">{h.nilai}</span>
        <span className="text-[13px] font-black text-[#4a5a75]">
          {h.benar}/{h.total} benar
        </span>
      </div>
      <p className="mt-3 text-[26px] font-extrabold" style={{ color: h.lulus ? "#13794a" : "#a34a00" }}>
        {latihan ? (h.lulus ? "Siap ujian!" : "Latihan lagi, yuk") : SEKALI.has(h.jenis) ? pred : h.lulus ? pred : "Belum lulus"}
      </p>
      <p className="mt-1 text-[15px] font-bold text-[#4a5a75]">
        {latihan
          ? "Nilai latihan tidak disimpan. Ulangi materi yang masih salah, lalu ikuti Ujian Akhir."
          : SEKALI.has(h.jenis)
            ? "Nilai ini tertulis di Sertifikat Kenaikan Jenjang."
            : h.lulus
              ? "Tahap berikutnya sudah terbuka."
              : `Butuh nilai ${AMBANG[h.jenis]}. Ulangi materinya, lalu coba besok.`}
      </p>
      <button onClick={() => router.push(kembaliKe)} className="mt-5 w-full rounded-[18px] bg-[#12803f] py-3.5 text-[19px] font-extrabold text-white shadow-[0_5px_0_#16804f] active:translate-y-0.5">
        Kembali ke peta
      </button>
    </Bingkai>
  );
}
