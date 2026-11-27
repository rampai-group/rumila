"use client";

// Presenter mekanik navigasi (Agam ke bintang) — tiga mode eksekusi:
//   langsung : tiap tombol palet dijalankan seketika (PAUD), tanpa rak
//   program  : blok disusun di rak berslot, lalu "Jalan ▶" (TK A ke atas; debug = rak terisi, perbaiki paling banyak N blok;
//              bendera = dekomposisi dua rak; semuaGrid = satu program lolos semua grid satu group)
//   langkah  : rak terisi, anak menebak petak tujuan lalu "Langkah" menjalankan satu blok (prediksi)
// Semantik blok mengikuti docs/akademi/mekanik-navigasi.md; eksekusi memakai jalankan() dari mesin, presenter hanya
// menganimasikan NavStep dan mengirim jawaban. Penilaian dilakukan runner lewat `hasil`.

import { sfxAkademi } from "@/lib/sfx-akademi";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { NavCommand, PaketNavigasi } from "@akademi/schema";
import { adaPerintahSetelahBintang, hitungBlok, jalankan, kapasitasRakNavigasi, type Arah, type JawabanNavigasi, type NavBlock, type NavGrid, type NavRun, type NavState, type NavStep, type RondeNavigasi } from "@akademi/mechanics";
import { TombolBantu } from "./bantu";
import { useModeUjian } from "./mode-ujian";
import { Icon } from "@/components/ui";
import { COMMON_DEFS } from "@/components/koding/art";
import { AgamTop } from "@/components/koding/stage";
import { sfx } from "@/lib/sfx";
import type { DuniaId } from "@/lib/akademi/tema-dunia";
import { AksiBawah, navigasiSatuBaris, usePanggung } from "./dunia";
import { BALOO, BENAR, INK, SALAH, type PresenterProps, bayangKartu } from "./jenis";
import "@/components/koding/koding.css";

type Props = PresenterProps<RondeNavigasi, JawabanNavigasi, PaketNavigasi>;

/* ---------------- konstanta tampilan ---------------- */

const SEL = 100; // satuan petak di viewBox
const PETAK_MIN = 44;
const PETAK_MAKS = 112;
const GARIS = "rgba(11,37,69,.28)"; // garis tepi petak, jelas di semua warna tanah
const PETAK_PLAFON = 210; // batas petak di tablet mendatar supaya peta 3×3 tidak raksasa
const DEG: Record<Arah, number> = { N: 0, E: 90, S: 180, W: 270 };
const DELTA: Record<Arah, { dx: number; dy: number }> = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
const PUTAR: Record<Arah, { kiri: Arah; kanan: Arah }> = { N: { kiri: "W", kanan: "E" }, E: { kiri: "N", kanan: "S" }, S: { kiri: "E", kanan: "W" }, W: { kiri: "S", kanan: "N" } };

const BLOK: Record<NavCommand, { label: string; ikon: (px: number) => ReactNode; c: string; d: string }> = {
  maju: { label: "maju", ikon: (px) => <Icon name="steps" size={px} />, c: "#3a86ff", d: "#2463c9" },
  lompat: { label: "lompat", ikon: (px) => <span style={{ fontSize: px * 0.93, lineHeight: 1 }}>🦘</span>, c: "#22b573", d: "#16804f" },
  kiri: { label: "kiri", ikon: (px) => <Icon name="turn_left" size={px} />, c: "#8b5cf6", d: "#6a3fd1" },
  kanan: { label: "kanan", ikon: (px) => <Icon name="turn_right" size={px} />, c: "#8b5cf6", d: "#6a3fd1" },
  ulangi: { label: "ulangi", ikon: (px) => <span style={{ fontSize: px * 0.87, lineHeight: 1 }}>🔁</span>, c: "#fd861d", d: "#c25a0c" },
  kalau: { label: "🪨? lompat : maju", ikon: (px) => <span style={{ fontSize: px * 0.87, lineHeight: 1 }}>🤔</span>, c: "#0ea5a4", d: "#0b7f7e" },
  bendera: { label: "bendera", ikon: (px) => <span style={{ fontSize: px * 0.87, lineHeight: 1 }}>🚩</span>, c: "#e04f5f", d: "#a8323f" },
};

/** Warna petak tanah (catur dua nada) per dunia: terang supaya robot gelap, 🌳, 🪨, dan ⭐ tetap kontras. */
const TANAH: Record<DuniaId, [string, string]> = {
  pasar: ["#f1d3a4", "#e6c08a"], // lantai kayu pasar
  kebun: ["#bde79f", "#a9dc8a"], // rumput kebun
  laut: ["#a7dcf0", "#91cfe8"], // pasir dasar laut kebiruan
  pantai: ["#f7e4ae", "#efd796"], // pasir pantai
  kelas: ["#e9e4fc", "#dcd4f8"], // ubin kelas
  rumah: ["#efcfaa", "#e5bf93"], // lantai kayu rumah
  kota: ["#d6deec", "#c5d0e3"], // trotoar kota
  hutan: ["#a8d893", "#95cc7f"], // lumut hutan
  angkasa: ["#d8d2f4", "#c7bfec"], // permukaan bulan
  taman: ["#cdeea2", "#bae58c"], // rumput taman
  sungai: ["#cfeccf", "#bfe3bf"], // tepi sungai berumput
  lab: ["#e3f6f3", "#d2efea"], // ubin lab
  gudang: ["#ead9c0", "#dfcaab"], // lantai gudang
  bukit: ["#d9e6b0", "#cbdb9b"], // rumput bukit
  kutub: ["#eef7ff", "#dcedfb"], // salju
};

/** Muka tombol/keping: warna blok diencerkan di atas putih, supaya ikon & label gelap tetap terbaca. */
const muka = (c: string) => `linear-gradient(${c}2e, ${c}2e), #ffffff`;

const tunggu = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const samaSel = (a: { x: number; y: number }, b: { x: number; y: number }) => a.x === b.x && a.y === b.y;
const putarKe = (rot: number, dari: Arah, ke: Arah) => rot + ((((DEG[ke] - DEG[dari]) % 360) + 540) % 360) - 180;

/** Jumlah posisi yang berbeda dari program awal + selisih panjang (mode debug). */
function hitungEdits(awal: NavBlock[], akhir: NavBlock[]): number {
  const n = Math.min(awal.length, akhir.length);
  let e = Math.abs(awal.length - akhir.length);
  for (let i = 0; i < n; i++) if (JSON.stringify(awal[i]) !== JSON.stringify(akhir[i])) e++;
  return e;
}

/** BFS sederhana (maju/lompat/belok yang tersedia) dari `dari` ke bintang; mengembalikan petak yang dilewati. */
function jalurBantuan(g: NavGrid, dari: NavState, commands: NavCommand[]): Array<{ x: number; y: number }> {
  const aksi: Array<"maju" | "lompat" | "kiri" | "kanan"> = [];
  if (commands.includes("maju") || commands.includes("kalau")) aksi.push("maju");
  if (commands.includes("lompat") || commands.includes("kalau")) aksi.push("lompat");
  if (commands.includes("kiri")) aksi.push("kiri");
  if (commands.includes("kanan")) aksi.push("kanan");
  const diLuar = (c: { x: number; y: number }) => c.x < 0 || c.y < 0 || c.x >= g.w || c.y >= g.h;
  const dinding = (c: { x: number; y: number }) => g.walls.some((w) => samaSel(w, c));
  const batu = (c: { x: number; y: number }) => g.rocks.some((b) => samaSel(b, c));
  const kunci = (s: NavState) => `${s.x},${s.y},${s.dir}`;
  const induk = new Map<string, string | null>([[kunci(dari), null]]);
  const simpan = new Map<string, NavState>([[kunci(dari), dari]]);
  let lapis: NavState[] = [dari];
  let temu: NavState | null = samaSel(dari, g.goal) ? dari : null;
  while (lapis.length && !temu) {
    const berikut: NavState[] = [];
    for (const s of lapis) {
      for (const a of aksi) {
        let ke: NavState | null = null;
        if (a === "kiri" || a === "kanan") ke = { ...s, dir: PUTAR[s.dir][a] };
        else {
          const n = a === "maju" ? 1 : 2;
          const c = { x: s.x + DELTA[s.dir].dx * n, y: s.y + DELTA[s.dir].dy * n };
          if (diLuar(c) || dinding(c) || batu(c)) continue;
          ke = { ...s, ...c };
        }
        const k = kunci(ke);
        if (induk.has(k)) continue;
        induk.set(k, kunci(s));
        simpan.set(k, ke);
        if (samaSel(ke, g.goal)) { temu = ke; break; }
        berikut.push(ke);
      }
      if (temu) break;
    }
    lapis = berikut;
  }
  if (!temu) {
    // tak terjangkau: sorot petak di depan Agam saja
    const depan = { x: dari.x + DELTA[dari.dir].dx, y: dari.y + DELTA[dari.dir].dy };
    return diLuar(depan) ? [] : [depan];
  }
  const jalur: Array<{ x: number; y: number }> = [];
  let k: string | null = kunci(temu);
  while (k) {
    const s = simpan.get(k)!;
    if (!jalur.length || !samaSel(jalur[0], s)) jalur.unshift({ x: s.x, y: s.y });
    k = induk.get(k) ?? null;
  }
  return jalur.slice(1);
}

/* ---------------- komponen utama ---------------- */

interface Agam extends NavState {
  rot: number;
  lompat: boolean;
  goyang: number; // kunci ulang animasi goyang
  wajah: string | null; // 😵 / 💥 / 🎉
  senang: boolean;
}

export function PresenterNavigasi({ paket, ronde, onJawab, onHint, hasil }: Props) {
  const ujian = useModeUjian();
  const grids = ronde.grids;
  const perahu = paket.id === "perahu-robot-maju";
  const papanKota = paket.id === "sd1-kode-ulangi-belok-kota";
  const langsung = ronde.execMode === "langsung";
  const slotMaks = kapasitasRakNavigasi(ronde);
  const modeBendera = ronde.execMode === "program" && ronde.commands.includes("bendera");
  const palet = useMemo(() => ronde.commands.filter((c) => c !== "bendera"), [ronde.commands]);

  const awalAgam = useCallback((g: NavGrid): Agam => ({ x: g.start.x, y: g.start.y, dir: g.start.dir, rot: DEG[g.start.dir], lompat: false, goyang: 0, wajah: null, senang: false }), []);

  const [aktif, setAktif] = useState(0);
  const [agam, setAgam] = useState<Agam>(() => awalAgam(grids[0]));
  const [statusGrid, setStatusGrid] = useState<Array<"✓" | "✗" | null>>(() => grids.map(() => null));
  const [sibuk, setSibuk] = useState(false);
  const [pesan, setPesan] = useState<string>("");
  const [sorot, setSorot] = useState<Array<{ x: number; y: number }>>([]);
  const [runs, setRuns] = useState(0);
  const jalanId = useRef(0);
  const selesai = useRef(false);

  // mode langsung
  const [efektif, setEfektif] = useState<NavBlock[]>([]);
  const [gagal, setGagal] = useState(0);
  const [langsungTuntas, setLangsungTuntas] = useState(false);

  // mode program
  const [rak, setRak] = useState<NavBlock[]>(() => ronde.program.map((b) => ({ ...b })));
  const [rak2, setRak2] = useState<NavBlock[]>([]);
  const [rakAktif, setRakAktif] = useState<0 | 1>(0);
  const [sel, setSel] = useState<{ rak: 0 | 1; i: number } | null>(null);
  const [bendera, setBendera] = useState<{ x: number; y: number } | null>(null);

  // mode langkah
  const lariLangkah = useMemo<NavRun | null>(() => (ronde.execMode === "langkah" ? jalankan(grids[0], ronde.program) : null), [ronde, grids]);
  const [langkahKe, setLangkahKe] = useState(0);
  const [tebakan, setTebakan] = useState<{ x: number; y: number } | null>(null);
  const [prediksi, setPrediksi] = useState<boolean[]>([]);

  const terkunci = !!hasil || selesai.current;
  const grid = grids[aktif];

  /* ---------- animasi langkah ---------- */

  const animasikan = useCallback(async (steps: NavStep[], id: number, mulai: NavState): Promise<boolean> => {
    let dirKini = mulai.dir;
    for (const s of steps) {
      if (jalanId.current !== id) return false;
      if (s.kind === "turn") {
        const dari = dirKini;
        dirKini = s.after.dir;
        setAgam((a) => ({ ...a, dir: s.after.dir, rot: putarKe(a.rot, dari, s.after.dir), wajah: null }));
        sfx.whoosh();
        await tunggu(300);
      } else if (s.kind === "move") {
        setAgam((a) => ({ ...a, x: s.after.x, y: s.after.y, wajah: null }));
        sfx.step();
        await tunggu(320);
      } else if (s.kind === "jump") {
        setAgam((a) => ({ ...a, lompat: true }));
        sfx.hop(1);
        await tunggu(90);
        setAgam((a) => ({ ...a, x: s.after.x, y: s.after.y }));
        await tunggu(330);
        setAgam((a) => ({ ...a, lompat: false }));
        await tunggu(120);
      } else if (s.kind === "flag") {
        sfx.arrive();
        await tunggu(260);
      } else {
        // tersandung / tabrak: maju setengah petak lalu terpental & goyang
        const d = DELTA[dirKini];
        setAgam((a) => ({ ...a, x: s.after.x + d.dx * 0.3, y: s.after.y + d.dy * 0.3 }));
        await tunggu(150);
        sfxAkademi.tolak();
        setAgam((a) => ({ ...a, x: s.after.x, y: s.after.y, goyang: a.goyang + 1, wajah: s.kind === "stumble" ? "😵" : "💥" }));
        await tunggu(520);
      }
    }
    return jalanId.current === id;
  }, []);

  const pesanGagal = (outcome: NavRun["outcome"]) =>
    outcome === "tersandung" ? "Agam tersandung batu 😵" : outcome === "tabrak" ? "Agam menabrak 💥" : outcome === "kosong" ? "Susun perintah dulu, ya" : "Agam belum sampai bintang 🤷";

  const kirim = (j: JawabanNavigasi) => {
    if (selesai.current) return;
    selesai.current = true;
    onJawab(j);
  };

  /* ---------- mode langsung ---------- */

  const tekanLangsung = async (cmd: NavCommand) => {
    if (sibuk || terkunci || langsungTuntas || cmd === "ulangi" || cmd === "bendera") return;
    const program: NavBlock[] = [...efektif, { cmd }];
    const lari = jalankan(grid, program);
    const idx = efektif.length;
    const baru = lari.steps.filter((s) => s.path[0] === idx);
    const id = ++jalanId.current;
    setSibuk(true);
    setSorot([]);
    setPesan("");
    const sebelum: NavState = { x: agam.x, y: agam.y, dir: agam.dir };
    const ok = await animasikan(baru, id, sebelum);
    if (!ok) return;
    if (lari.outcome === "tersandung" || lari.outcome === "tabrak") {
      setGagal((g) => g + 1);
      if (ujian) {
        setEfektif(program);
        setLangsungTuntas(true);
        setPesan("Kirim jalur yang sudah kamu pilih.");
      } else {
        setPesan(pesanGagal(lari.outcome));
        setAgam((a) => ({ ...a, ...sebelum }));
      }
    } else {
      setEfektif(program);
      if (lari.outcome === "bintang") {
        if (ujian) {
          setLangsungTuntas(true);
          setPesan("Kirim jalur yang sudah kamu pilih.");
        } else {
          sfx.arrive();
          setAgam((a) => ({ ...a, senang: true, wajah: "🎉" }));
          kirim({ program, langsung: program, runs: gagal });
        }
      }
    }
    setSibuk(false);
  };

  const ulangLangsung = () => {
    if (sibuk || terkunci) return;
    jalanId.current++;
    setEfektif([]);
    setPesan("");
    setSorot([]);
    setAgam(awalAgam(grid));
  };

  /* ---------- mode program: rak ---------- */

  const rakDari = (k: 0 | 1) => (k === 0 ? rak : rak2);
  const setRakKe = (k: 0 | 1, f: (r: NavBlock[]) => NavBlock[]) => (k === 0 ? setRak(f) : setRak2(f));

  const tekanPalet = (cmd: NavCommand) => {
    if (sibuk || terkunci) return;
    const k = modeBendera ? rakAktif : 0;
    const daftar = rakDari(k);
    const blokBaru: NavBlock = cmd === "ulangi" ? { cmd: "ulangi", n: 2, body: [] } : { cmd };
    // isi keping ulangi yang sedang "dimasuki"
    if (sel && sel.rak === k) {
      const target = daftar[sel.i];
      if (target?.cmd === "ulangi" && cmd !== "ulangi") {
        if (target.body.length >= 2 || hitungBlok(daftar) + 1 > slotMaks) { sfxAkademi.tolak(); setPesan(target.body.length >= 2 ? "Isi ulangi paling banyak 2 blok" : "Rak tidak muat"); return; }
        sfxAkademi.ambil();
        setRakKe(k, (r) => r.map((b, i) => (i === sel.i && b.cmd === "ulangi" ? { ...b, body: [...b.body, { cmd } as NavBlock] } : b)));
        return;
      }
      if (ronde.debug) {
        // debug: ganti blok yang dipilih
        if (hitungBlok(daftar) - hitungBlok([target]) + hitungBlok([blokBaru]) > slotMaks) { sfxAkademi.tolak(); setPesan("Rak tidak muat"); return; }
        sfxAkademi.ambil();
        setRakKe(k, (r) => r.map((b, i) => (i === sel.i ? blokBaru : b)));
        setSel(null);
        return;
      }
    }
    if (hitungBlok(daftar) + 1 > slotMaks) { sfxAkademi.tolak(); setPesan("Rak tidak muat"); return; }
    sfxAkademi.ambil();
    setRakKe(k, (r) => [...r, blokBaru]);
    setSel(cmd === "ulangi" ? { rak: k, i: daftar.length } : null);
    setPesan("");
  };

  const ketukRak = (k: 0 | 1, i: number) => {
    if (sibuk || terkunci) return;
    const daftar = rakDari(k);
    const b = daftar[i];
    const dipilih = sel && sel.rak === k && sel.i === i;
    if (b.cmd === "ulangi" || ronde.debug) {
      if (dipilih) { sfx.close(); setRakKe(k, (r) => r.filter((_, j) => j !== i)); setSel(null); }
      else { sfx.tap(); setSel({ rak: k, i }); setRakAktif(k); }
      return;
    }
    sfx.close();
    setRakKe(k, (r) => r.filter((_, j) => j !== i));
    setSel(null);
  };

  const selesaiIsiUlangi = () => {
    if (sibuk || terkunci) return;
    sfx.tap();
    setSel(null);
    setPesan("");
  };

  const putarN = (k: 0 | 1, i: number) => {
    if (sibuk || terkunci) return;
    sfx.tap();
    setRakKe(k, (r) => r.map((b, j) => (j === i && b.cmd === "ulangi" ? { ...b, n: b.n >= 6 ? 2 : b.n + 1 } : b)));
  };

  const hapusIsiUlangi = (k: 0 | 1, i: number, j: number) => {
    if (sibuk || terkunci) return;
    sfx.close();
    setRakKe(k, (r) => r.map((b, x) => (x === i && b.cmd === "ulangi" ? { ...b, body: b.body.filter((_, y) => y !== j) } : b)));
  };

  /* ---------- mode program: jalan ---------- */

  const kirimProgramUjian = () => {
    if (sibuk || terkunci) return;
    if (modeBendera) {
      if (!bendera || !rak.length || !rak2.length) return;
      kirim({ program: [...rak, { cmd: "bendera" }, ...rak2], bendera: { ...bendera, bagian: [rak, rak2] }, runs: 1 });
    } else if (rak.length) {
      kirim({ program: rak, edits: ronde.debug ? hitungEdits(ronde.program, rak) : undefined, runs: 1 });
    }
  };

  const jalan = async (pratinjau = false) => {
    if (sibuk || terkunci) return;
    const program: NavBlock[] = pratinjau ? ronde.program : modeBendera ? [...rak, { cmd: "bendera" }, ...rak2] : rak;
    if (!program.length || (modeBendera && !rak.length && !rak2.length)) { sfxAkademi.tolak(); setPesan("Susun perintah dulu: ketuk blok di bawah"); return; }
    if (modeBendera && !bendera) { sfxAkademi.tolak(); setPesan("Ketuk petak di kebun untuk menaruh 🚩 dulu"); return; }
    const id = ++jalanId.current;
    const r = runs + 1;
    if (!pratinjau) setRuns(r);
    setSibuk(true);
    setSel(null);
    setSorot([]);
    setPesan(pratinjau ? "Agam menjalankan program awal" : "");
    setStatusGrid(grids.map(() => null));
    sfx.open();

    let gagalPeta = 0;
    for (let gi = 0; gi < grids.length; gi++) {
      const g = grids[gi];
      setAktif(gi);
      setAgam(awalAgam(g));
      await tunggu(gi === 0 ? 250 : 500);
      if (jalanId.current !== id) return;

      let outcome: NavRun["outcome"];
      let pesanKhusus: string | null = null;
      if (modeBendera && bendera) {
        const lari1 = jalankan(g, [...rak, { cmd: "bendera" }], { stopAtFlag: true });
        if (!(await animasikan(lari1.steps, id, { x: g.start.x, y: g.start.y, dir: g.start.dir }))) return;
        if (lari1.outcome !== "bendera" || !samaSel(lari1.final, bendera)) {
          outcome = lari1.outcome === "bendera" || lari1.outcome === "bintang" ? "meleset" : lari1.outcome;
          pesanKhusus = lari1.outcome === "bendera" || lari1.outcome === "bintang" ? "Bagian 1 belum berhenti di 🚩" : null;
        } else {
          sfxAkademi.koin();
          await tunggu(300);
          const lari2 = jalankan({ ...g, start: { x: bendera.x, y: bendera.y, dir: lari1.final.dir } }, rak2);
          if (!(await animasikan(lari2.steps, id, lari1.final))) return;
          outcome = lari2.outcome;
        }
      } else {
        const lari = jalankan(g, program);
        if (!(await animasikan(lari.steps, id, { x: g.start.x, y: g.start.y, dir: g.start.dir }))) return;
        const masihAdaPerintah = ronde.tepatDiBintang && adaPerintahSetelahBintang(program, lari);
        outcome = masihAdaPerintah ? "meleset" : lari.outcome;
        if (masihAdaPerintah) pesanKhusus = "Agam sudah sampai di bintang, tapi masih ada perintah. Cek angka Ulangi dan susunan bloknya.";
      }

      if (outcome !== "bintang") {
        gagalPeta++;
        setStatusGrid((s) => s.map((v, i) => (i === gi ? "✗" : v)));
        setPesan(grids.length > 1 ? `Jalur ${gi + 1}: ${pesanKhusus ?? pesanGagal(outcome)}` : pesanKhusus ?? pesanGagal(outcome));
        if (outcome === "meleset") sfx.bounceBack();
        if (ronde.debug && gi + 1 < grids.length) {
          await tunggu(450);
          continue;
        }
        setSibuk(false);
        return;
      }
      sfx.arrive();
      setStatusGrid((s) => s.map((v, i) => (i === gi ? "✓" : v)));
      setAgam((a) => ({ ...a, wajah: "⭐" }));
      await tunggu(gi < grids.length - 1 ? 450 : 150);
    }
    if (jalanId.current !== id) return;
    setSibuk(false);
    if (pratinjau || gagalPeta > 0) {
      setPesan(gagalPeta > 0 ? `Agam belum sampai di ${gagalPeta} jalur` : "Program awal sudah dijalankan");
      return;
    }
    setAgam((a) => ({ ...a, senang: true, wajah: "🎉" }));
    if (modeBendera && bendera) kirim({ program, bendera: { x: bendera.x, y: bendera.y, bagian: [rak, rak2] }, runs: r });
    else kirim({ program, edits: ronde.debug ? hitungEdits(ronde.program, rak) : undefined, runs: r });
  };

  /* ---------- mode langkah / prediksi ---------- */

  const langkah = async () => {
    if (sibuk || terkunci || !lariLangkah) return;
    const s = lariLangkah.steps[langkahKe];
    if (ronde.tunjukTabrak && (!s || s.kind === "bump")) {
      kirim({ program: ronde.program });
      return;
    }
    if (!s) { kirim({ program: ronde.program, prediksi, runs: 1 }); return; }
    if (ronde.prediksi && !tebakan) { sfxAkademi.tolak(); setPesan("Ketuk petak tujuan Agam dulu, ya"); return; }
    const id = ++jalanId.current;
    setSibuk(true);
    setSorot([]);
    const benar = tebakan ? samaSel(tebakan, s.after) : true;
    const daftar = ronde.prediksi ? [...prediksi, benar] : prediksi;
    if (ronde.prediksi) {
      setPrediksi(daftar);
      if (!ujian) setPesan(benar ? "Tebakanmu benar! ⭐" : "Hmm, Agam ke sini ternyata");
    }
    if (!(await animasikan([s], id, { x: agam.x, y: agam.y, dir: agam.dir }))) return;
    setTebakan(null);
    setLangkahKe(langkahKe + 1);
    setSibuk(false);
    const habis = langkahKe + 1 >= lariLangkah.steps.length;
    if (habis) {
      if (!ujian) {
        if (lariLangkah.outcome === "bintang") setAgam((a) => ({ ...a, senang: true, wajah: "🎉" }));
        else setPesan(pesanGagal(lariLangkah.outcome));
      }
      await tunggu(400);
      kirim({ program: ronde.program, prediksi: daftar, runs: 1 });
    }
  };

  /* ---------- petak diketuk ---------- */

  const ketukPetak = (x: number, y: number) => {
    if (sibuk || terkunci) return;
    if (ronde.execMode === "langkah" && ronde.prediksi) {
      sfx.tap();
      setTebakan({ x, y });
      setPesan("");
    } else if (modeBendera) {
      if (grid.walls.some((w) => samaSel(w, { x, y })) || grid.rocks.some((b) => samaSel(b, { x, y }))) { sfxAkademi.tolak(); return; }
      sfxAkademi.ambil();
      setBendera({ x, y });
      setPesan("");
    }
  };

  /* ---------- bantuan ---------- */

  const bantu = () => {
    if (terkunci) return;
    onHint?.();
    if (ronde.tunjukTabrak) {
      setPesan("Perhatikan arah hadap Agam dan petak di depannya.");
      return;
    }
    const dari: NavState = { x: agam.x, y: agam.y, dir: agam.dir };
    const jalur = jalurBantuan(grid, dari, ronde.commands);
    setSorot(jalur);
    if (ronde.execMode === "langsung") setPesan(jalur.length ? "Ikuti petak yang menyala" : "Coba putar Agam dulu");
    else if (ronde.execMode === "langkah") setPesan("Lihat blok berikutnya, ke mana Agam akan pergi?");
    else setPesan(modeBendera && !bendera ? "Taruh 🚩 di tengah jalur, lalu susun dua bagian" : ronde.debug ? `Ubah paling banyak ${ronde.fixes ?? 1} blok supaya Agam lewat petak yang menyala` : "Susun blok supaya Agam lewat petak yang menyala");
    window.setTimeout(() => setSorot([]), 3500);
  };

  /* ---------- hasil dari runner ---------- */

  useEffect(() => {
    if (!hasil) return;
    jalanId.current++;
    setSibuk(false);
    if (hasil.benar) {
      setAgam((a) => ({ ...a, senang: true, wajah: "🎉" }));
      setPesan("");
      return;
    }
    const d = hasil.detail as { outcome?: NavRun["outcome"]; edits?: number; blocks?: number; blokDipilih?: number };
    if (ronde.tunjukTabrak) setPesan(d.blokDipilih === undefined ? "Agam hampir menabrak. Ketuk blok penabraknya sebelum menekan Langkah." : "Blok itu bukan yang membuat Agam menabrak. Coba lagi.");
    else if (ronde.debug && ronde.fixes !== undefined && d.edits !== undefined && d.edits > ronde.fixes) setPesan(`Ubah paling banyak ${ronde.fixes} blok ya`);
    else if ((ronde.debug || ronde.rackSlots !== undefined) && !modeBendera && (d.blocks ?? 0) > slotMaks) setPesan("Rak tidak muat");
    else if (ronde.prediksi && d.outcome === "bintang") setPesan("Agam sampai, tapi tebakanmu masih banyak meleset. Coba lagi!");
    else if (d.outcome) setPesan(pesanGagal(d.outcome));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasil]);

  useEffect(() => () => { jalanId.current++; }, []);

  /* ---------- render ---------- */

  const petakSorot = useMemo(() => {
    const s = new Set(sorot.map((c) => `${c.x},${c.y}`));
    if (tebakan) s.add(`${tebakan.x},${tebakan.y}`);
    return s;
  }, [sorot, tebakan]);
  const petakInteraktif = modeBendera || (ronde.execMode === "langkah" && ronde.prediksi);
  const bisaKetukPetak = !sibuk && !terkunci && petakInteraktif;
  const blokLangkah = ronde.execMode === "langkah" ? lariLangkah?.steps[langkahKe] : undefined;
  const prediksiKomandan = ronde.prediksi && paket.competencyIds.includes("KODE.SD3.PREDIKSI.01");
  const jumlahLangkah = lariLangkah?.steps.length ?? 0;
  const judulLangkah = prediksiKomandan
    ? `Program Agam · tebakan ${Math.min(langkahKe + 1, jumlahLangkah)} dari ${jumlahLangkah}`
    : `Program Agam · blok ${Math.min(langkahKe + 1, Math.max(1, hitungBlok(ronde.program)))} dari ${hitungBlok(ronde.program)}`;

  // tata letak: tablet/desktop mendatar → peta di kiri, rak + tombol di kanan; HP/tegak → bertumpuk
  const { tema, w: pw, h: ph, skala: sk } = usePanggung();
  const skt = Math.min(sk, 1.35); // skala teks: jangan sebesar skala kotak
  const tanah = TANAH[tema.id];
  const mendatar = pw >= 760 && ph > 0 && pw / ph >= 1.2;
  const adaMini = grids.length > 1;
  // Di tablet tegak yang lega, tombol tetap dekat dengan tempat menyusun atau menebak langkah.
  const latihanNavigator = !ujian && paket.competencyIds.some((id) =>
    id === "KODE.TKB.PROGRAM-5-8.01" || id === "KODE.TKB.PROGRAM-5-8.02" || id === "KODE.TKB.DEBUG-BANYAK.01",
  );
  const tabletTegakLega = latihanNavigator && pw >= 620 && ph >= 680;
  const programSatuBaris = navigasiSatuBaris(ronde);
  const aksiDiPanggung = !mendatar && (tabletTegakLega || (programSatuBaris && ph >= 540));
  // program panjang (banyak slot, ulangi, palet > 4 blok): kendali dirapatkan supaya Jalan selalu kelihatan
  const panjang = ronde.execMode === "program" && (!!ronde.debug || slotMaks > 6 || palet.length > 4);
  // Slide Over / jendela sempit: kendali bertumpuk dan membungkus baris, jadi ikut dirapatkan
  const rapat = panjang || (ph > 0 && ph < 560) || (!mendatar && pw > 0 && pw < 460);
  const ukMini = Math.round((rapat ? 48 : 72) * sk);
  const tinggiMini = adaMini ? Math.max(56, ukMini + 8) + 16 : 0;
  const lebarKanan = Math.round(Math.min(600, Math.max(340, pw * (panjang ? 0.52 : 0.42))));
  // Papan tontonan dapat mengecil agar semua petak terlihat; petak interaktif harus tetap mudah diketuk.
  const petakMin = petakInteraktif ? PETAK_MIN : 30;
  // ukuran petak dihitung dari ruang panggung (px), bukan tetap
  const petakDatar = mendatar
    ? Math.floor(Math.max(petakMin, Math.min(PETAK_PLAFON, (pw - lebarKanan - 16 - 28) / grid.w, (ph - 28 - tinggiMini) / grid.h)))
    : 0;
  // tegak: peta memakai sisa tinggi sesudah rak + palet + tombol Jalan, supaya tombol itu tidak terdorong ke bawah layar
  const kendaliRef = useRef<HTMLDivElement>(null);
  const [tinggiKendali, setTinggiKendali] = useState(0);
  useEffect(() => {
    const el = kendaliRef.current;
    if (!el) return;
    const ukur = () => setTinggiKendali(el.offsetHeight);
    ukur();
    const ro = new ResizeObserver(ukur);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mendatar]);
  const sisaPeta = ph - tinggiKendali - 12 - 16 * sk - 16 - tinggiMini - (adaMini ? 24 : 0);
  const batasPetakTegak = aksiDiPanggung
    ? Math.min(PETAK_PLAFON, (pw - 16 * sk) / grid.w)
    : (langsung && pw >= 620 ? 156 : PETAK_MAKS) * sk;
  const petakTegak = Math.round(
    ph > 0 && tinggiKendali > 0 ? Math.min(batasPetakTegak, Math.max(petakMin, sisaPeta / grid.h))
      : ph > 0 ? Math.min(batasPetakTegak, Math.max(64, (ph * 0.55 - tinggiMini) / grid.h)) : PETAK_MAKS,
  );

  const kartuPeta = {
    background: tema.panel,
    boxShadow: bayangKartu(),
    padding: 8 * sk,
  } as const;

  const peta = (
    <div className={`relative flex flex-col justify-center rounded-[24px] ${mendatar ? "min-h-0 flex-1" : ""}`} style={kartuPeta}>
      <Panggung
        grid={grid}
        agam={agam}
        bendera={modeBendera ? bendera : null}
        sorot={petakSorot}
        tebakan={tebakan}
        bisaKetuk={bisaKetukPetak}
        onKetuk={ketukPetak}
        menang={!!hasil?.benar}
        tampilkanBintang={!ronde.tunjukTabrak}
        tanah={tanah}
        perahu={perahu}
        kota={papanKota}
        petak={mendatar ? petakDatar : undefined}
        petakMaks={petakTegak}
        petakMin={petakInteraktif ? petakMin : 0}
      />
      {adaMini && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2" aria-label="Semua kebun">
          {grids.map((g, i) => (
            <button
              key={g.id}
              onClick={() => { if (!sibuk && !terkunci) { sfx.tap(); setAktif(i); setAgam(awalAgam(g)); } }}
              className="relative rounded-[12px] bg-white p-1 shadow-[0_3px_0_rgba(11,37,69,.1)] active:translate-y-0.5"
              style={{ outline: i === aktif ? "3px solid #fd861d" : "3px solid transparent", minWidth: 56, minHeight: 56 }}
              aria-label={`Kebun ${i + 1}${statusGrid[i] ? `, ${statusGrid[i] === "✓" ? "berhasil" : "gagal"}` : ""}`}
            >
              <Mini grid={g} tanah={tanah} ukuran={ukMini} />
              {statusGrid[i] && (
                <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full text-[13px] font-black text-white" style={{ background: statusGrid[i] === "✓" ? BENAR : SALAH }}>
                  {statusGrid[i]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      <TombolBantu onClick={bantu} disabled={terkunci} />
    </div>
  );

  const kendali = (
    <>
      {/* pesan */}
      <div className={`rounded-full text-center font-extrabold ${!pesan && (rapat || langsung || programSatuBaris) ? "sr-only" : ""}`} style={{ minHeight: 28 * skt, fontSize: 17 * skt, color: hasil ? (hasil.benar ? BENAR : SALAH) : INK, opacity: pesan ? 1 : 0, background: "#ffffff", padding: "4px 12px" }} aria-live="polite">
        {pesan || "·"}
      </div>

      {/* ---------- mode langsung ---------- */}
      {langsung && (
        <>
          <div className="flex items-center justify-center gap-2 font-bold" style={{ fontSize: 14 * skt }}>
            <span className="rounded-full bg-white px-3 py-1 shadow-[0_3px_0_rgba(11,37,69,.12)]">{efektif.length} langkah</span>
            {ujian ? (
              <button type="button" onClick={() => kirim({ program: efektif, langsung: efektif, runs: 1 })} disabled={sibuk || terkunci || !efektif.length} className="rounded-full bg-[#16804f] px-3 py-1.5 text-white shadow-[0_3px_0_#0e5a37] disabled:opacity-60" style={{ minHeight: Math.max(44, 36 * skt) }}>
                Kirim jawaban
              </button>
            ) : (
              <button onClick={ulangLangsung} disabled={sibuk || terkunci || !efektif.length} className="rounded-full bg-white px-3 py-1.5 shadow-[0_3px_0_rgba(11,37,69,.12)] active:translate-y-0.5 disabled:opacity-60" style={{ minHeight: Math.max(44, 36 * skt) }}>
                ↺ Ulang dari awal
              </button>
            )}
          </div>
          <Palet commands={palet} onTekan={tekanLangsung} nonaktif={sibuk || terkunci || langsungTuntas} besar penuh={mendatar} arahMaju={agam.dir} />
        </>
      )}

      {/* ---------- mode program ---------- */}
      {ronde.execMode === "program" && (
        <>
          {modeBendera ? (
            <div className="flex flex-col gap-2">
              <Rak judul="Bagian 1 · sampai 🚩" blok={rak} slot={slotMaks} aktif={rakAktif === 0} sel={sel?.rak === 0 ? sel.i : null} onPilihRak={() => setRakAktif(0)} onSelesaiIsi={sel?.rak === 0 && !sibuk && !terkunci ? selesaiIsiUlangi : undefined} onKetuk={(i) => ketukRak(0, i)} onN={(i) => putarN(0, i)} onHapusIsi={(i, j) => hapusIsiUlangi(0, i, j)} />
              <Rak judul="Bagian 2 · dari 🚩 ke ⭐" blok={rak2} slot={slotMaks} aktif={rakAktif === 1} sel={sel?.rak === 1 ? sel.i : null} onPilihRak={() => setRakAktif(1)} onSelesaiIsi={sel?.rak === 1 && !sibuk && !terkunci ? selesaiIsiUlangi : undefined} onKetuk={(i) => ketukRak(1, i)} onN={(i) => putarN(1, i)} onHapusIsi={(i, j) => hapusIsiUlangi(1, i, j)} />
            </div>
          ) : (
            <Rak
              judul={ronde.debug ? `Ubah paling banyak ${ronde.fixes ?? 1} blok` : `Program Agam · ${hitungBlok(rak)}/${slotMaks} blok`}
              blok={rak} slot={slotMaks} aktif sel={sel?.rak === 0 ? sel.i : null}
              gantiBlok={ronde.debug}
              onSelesaiIsi={!ronde.debug && !sibuk && !terkunci ? selesaiIsiUlangi : undefined}
              onKetuk={(i) => ketukRak(0, i)} onN={(i) => putarN(0, i)} onHapusIsi={(i, j) => hapusIsiUlangi(0, i, j)}
            />
          )}
          <Palet commands={palet} onTekan={tekanPalet} nonaktif={sibuk || terkunci} penuh={mendatar} rapat={rapat} />
          {ujian && ronde.debug && ronde.program.length > 0 && !modeBendera && (
            <button
              type="button"
              onClick={() => void jalan(true)}
              disabled={sibuk || terkunci}
              className="min-h-11 rounded-2xl bg-white px-3 py-1.5 text-sm font-extrabold text-[#0b2545] shadow-[0_3px_0_rgba(11,37,69,.12)] active:translate-y-0.5 disabled:opacity-60"
            >
              ▶ Lihat program awal
            </button>
          )}
          <AksiBawah aktif={!mendatar && !aksiDiPanggung}>
          <div className="flex gap-2">
            <button
              onClick={ujian ? kirimProgramUjian : () => void jalan()}
              disabled={sibuk || terkunci || (ujian && (!rak.length || (modeBendera && (!rak2.length || !bendera))))}
              className="flex-1 rounded-[20px] bg-[#16804f] py-2 text-white shadow-[0_6px_0_#0e5a37] active:translate-y-1 disabled:opacity-60"
              style={{ fontSize: 24 * skt, fontWeight: 900, minHeight: (rapat ? 52 : 64) * skt }}
            >
              {ujian ? "Kirim program" : "Jalan ▶"}
            </button>
            <button
              onClick={() => { if (sibuk || terkunci) return; sfx.close(); setRak(ronde.program.map((b) => ({ ...b }))); setRak2([]); setSel(null); setBendera(null); setPesan(""); setAgam(awalAgam(grid)); setStatusGrid(grids.map(() => null)); }}
              disabled={sibuk || terkunci}
              aria-label="Ulang dari awal"
              className="flex items-center justify-center rounded-[20px] bg-[#fffaf0] shadow-[0_6px_0_#d8ccb4] active:translate-y-1 disabled:opacity-60"
              style={{ width: 64 * skt }}
            >
              <Icon name="restart_alt" size={Math.round(28 * skt)} />
            </button>
          </div>
          </AksiBawah>
        </>
      )}

      {/* ---------- mode langkah ---------- */}
      {ronde.execMode === "langkah" && lariLangkah && (
        <>
          <Rak
            judul={ronde.tunjukTabrak ? `Program Agam · blok berikutnya ${blokLangkah ? blokLangkah.path[0] + 1 : ronde.program.length}` : judulLangkah}
            blok={ronde.program}
            slot={Math.max(hitungBlok(ronde.program), 1)}
            aktif
            sel={ronde.tunjukTabrak ? (blokLangkah?.path[0] ?? null) : null}
            bacaSaja={!ronde.tunjukTabrak || sibuk || terkunci}
            pilihTabrak={ronde.tunjukTabrak}
            onKetuk={ronde.tunjukTabrak ? (i) => { if (!sibuk && !terkunci) kirim({ program: ronde.program, blokDipilih: i }); } : undefined}
          />
          <AksiBawah aktif={!mendatar && !aksiDiPanggung}>
            <div className={`flex gap-2 ${mendatar ? "flex-col items-stretch" : "items-center"}`}>
              <div className="min-w-0 flex-1 rounded-[16px] bg-white px-3 py-2 font-bold" style={{ fontSize: 15 * skt }}>
                {ronde.tunjukTabrak ? "Ketuk blok yang akan membuat Agam menabrak." : ronde.prediksi
                  ? blokLangkah
                    ? `Blok berikutnya: ${BLOK[blokLangkah.cmd === "bendera" ? "bendera" : blokLangkah.cmd].label}. Ketuk petak tujuannya, lalu tekan Langkah.`
                    : "Program habis."
                  : "Tekan Langkah untuk menjalankan satu blok."}
                {!ujian && ronde.prediksi && prediksi.length > 0 && <span className="ml-1">({prediksi.filter(Boolean).length}/{prediksi.length} tebakan benar)</span>}
              </div>
              <button
                onClick={langkah}
                disabled={sibuk || terkunci || (ronde.prediksi && !tebakan && !!blokLangkah)}
                className={`shrink-0 rounded-[20px] bg-[#2463c9] text-white shadow-[0_6px_0_#1a4a99] active:translate-y-1 disabled:opacity-60 ${mendatar ? "px-6 py-4" : "px-3 py-2"}`}
                style={{ fontSize: (mendatar ? 22 : 18) * skt, fontWeight: 900, minHeight: (mendatar ? 64 : 48) * skt, minWidth: (mendatar ? 140 : 104) * skt }}
              >
                Langkah ▶
              </button>
            </div>
          </AksiBawah>
        </>
      )}
    </>
  );

  if (mendatar) {
    return (
      <div className={`flex min-h-0 flex-1 flex-row items-stretch gap-4 ${langsung ? "pb-2" : ""}`} style={{ fontFamily: BALOO, color: INK }} data-mode={ronde.execMode}>
        {peta}
        <div className={`flex min-h-0 shrink-0 flex-col overflow-y-auto rounded-[24px] [justify-content:safe_center] ${rapat ? "gap-2 p-2" : "gap-3 p-3"}`} style={{ width: lebarKanan, background: tema.panel, boxShadow: bayangKartu() }}>
          {kendali}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${langsung || (programSatuBaris && aksiDiPanggung) ? "pb-2" : ""} ${aksiDiPanggung && !programSatuBaris ? "flex-1 [justify-content:safe_center]" : ""}`} style={{ fontFamily: BALOO, color: INK }} data-mode={ronde.execMode}>
      {peta}
      <div ref={kendaliRef} className={`flex flex-col ${rapat ? "gap-2" : "gap-3"}`}>
        {kendali}
      </div>
    </div>
  );
}

/* ---------------- panggung ---------------- */

function Panggung({ grid, agam, bendera, sorot, tebakan, bisaKetuk, onKetuk, menang, tampilkanBintang, tanah, perahu, kota, petak, petakMaks, petakMin }: {
  grid: NavGrid; agam: Agam; bendera: { x: number; y: number } | null; sorot: Set<string>; tebakan: { x: number; y: number } | null;
  bisaKetuk: boolean; onKetuk: (x: number, y: number) => void; menang: boolean;
  tampilkanBintang: boolean;
  tanah: [string, string];
  perahu: boolean;
  kota?: boolean;
  /** ukuran petak tetap (px) di tata letak mendatar; kosong = lebar penuh dengan batas `petakMaks` */
  petak?: number;
  petakMaks: number;
  petakMin: number;
}) {
  const { rintangan } = usePanggung();
  // petak rintangan: cokelat tanah untuk tumbuhan, abu-abu batu untuk benda buatan/es
  const tumbuhan = ["🌳", "🌲", "🌴", "🌾", "🌵"].includes(rintangan);
  const [isiDinding, tepiDinding] = tumbuhan ? ["#7a5a3a", "#4f3822"] : ["#8a97ab", "#5b677a"];
  const sel: ReactNode[] = [];
  for (let y = 0; y < grid.h; y++) {
    for (let x = 0; x < grid.w; x++) {
      const X = x * SEL, Y = y * SEL;
      const dinding = grid.walls.some((w) => samaSel(w, { x, y }));
      const batu = grid.rocks.some((b) => samaSel(b, { x, y }));
      const goal = tampilkanBintang && samaSel(grid.goal, { x, y });
      const nyala = sorot.has(`${x},${y}`);
      const tebak = tebakan && samaSel(tebakan, { x, y });
      sel.push(
        <g key={`${x}-${y}`} onClick={bisaKetuk && !dinding ? () => onKetuk(x, y) : undefined} style={{ cursor: bisaKetuk && !dinding ? "pointer" : "default" }} role={bisaKetuk && !dinding ? "button" : undefined} aria-label={bisaKetuk ? `Petak ${x + 1}, ${y + 1}` : undefined}>
          <rect x={X + 3} y={Y + 3} width={SEL - 6} height={SEL - 6} rx={16} fill={dinding ? isiDinding : (x + y) % 2 ? tanah[1] : tanah[0]} stroke={dinding ? tepiDinding : GARIS} strokeWidth={3} />
          <rect x={X + 3} y={Y + 3} width={SEL - 6} height={SEL - 6} rx={16} fill="url(#ka-bevel)" />
          {nyala && <rect x={X + 6} y={Y + 6} width={SEL - 12} height={SEL - 12} rx={14} fill={tebak ? "#3a86ff" : "#ffd23f"} opacity={tebak ? 0.45 : 0.55} className="goal-pulse" />}
          {nyala && <rect x={X + 6} y={Y + 6} width={SEL - 12} height={SEL - 12} rx={14} fill="none" stroke={tebak ? "#3a86ff" : "#ffb000"} strokeWidth={5} />}
          {dinding && <text x={X + SEL / 2} y={Y + SEL / 2 + 24} textAnchor="middle" fontSize={66}>{kota ? "🏢" : rintangan}</text>}
          {batu && <ellipse cx={X + SEL / 2} cy={Y + SEL / 2 + 22} rx={32} ry={10} fill="#0b2545" opacity={0.3} />}
          {batu && <text x={X + SEL / 2} y={Y + SEL / 2 + 20} textAnchor="middle" fontSize={56}>🪨</text>}
          {goal && (
            <g transform={`translate(${X + SEL / 2} ${Y + SEL / 2})`}>
              <circle r={44} fill="#ffd23f" opacity={0.45} className="goal-pulse" />
              <circle r={36} fill="#ffffff" stroke="#e07a00" strokeWidth={5} />
              <text y={22} textAnchor="middle" fontSize={menang ? 78 : 60} style={{ transition: "font-size 400ms" }}>⭐</text>
            </g>
          )}
          {bendera && samaSel(bendera, { x, y }) && <text x={X + SEL / 2 + 14} y={Y + 34} textAnchor="middle" fontSize={44}>🚩</text>}
        </g>,
      );
    }
  }
  const lebarPapan = grid.w * (petak || Math.max(petakMin, petakMaks));
  const ukuranSvg = petak && petakMin > 0
    ? { width: lebarPapan, height: grid.h * petak }
    : { width: "100%", minWidth: grid.w * petakMin, maxWidth: lebarPapan };
  return (
    <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <svg
        viewBox={`0 0 ${grid.w * SEL} ${grid.h * SEL}`}
        className="mx-auto block"
        style={{ ...ukuranSvg, touchAction: "manipulation" }}
        role="img"
        aria-label={`${perahu ? "Laut" : kota ? "Jalan kota" : "Kebun"} ${grid.w} kali ${grid.h} petak`}
      >
        <defs>{COMMON_DEFS}</defs>
        {sel}
        <circle cx={grid.start.x * SEL + SEL / 2} cy={grid.start.y * SEL + SEL / 2} r={30} fill="none" stroke={INK} strokeOpacity={0.55} strokeWidth={5} strokeDasharray="8 8" pointerEvents="none" />
        <g className="akademi-agam" pointerEvents="none" style={{ transform: `translate(${agam.x * SEL + SEL / 2}px, ${agam.y * SEL + SEL / 2}px)` }}>
          <g key={agam.goyang} className={agam.goyang ? "akademi-shake" : undefined}>
            <g className={agam.senang ? "akademi-bounce" : undefined}>
              <g style={{ transform: `scale(${agam.lompat ? 1.3 : 0.82})`, transition: "transform 220ms cubic-bezier(0.3, 1.4, 0.5, 1)" }}>
                <g style={{ transform: `rotate(${agam.rot}deg)`, transition: "transform 300ms ease-in-out" }}>
                  {perahu ? <AgamPerahu /> : <AgamTop bump={false} />}
                </g>
              </g>
              {agam.wajah && (
                <text y={-38} textAnchor="middle" fontSize={40} className="akademi-pop">{agam.wajah}</text>
              )}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

/** Tampak atas, satu arah dengan panah di depan haluan. */
function AgamPerahu() {
  return (
    <g data-kendaraan="perahu">
      <path d="M-24 44 Q0 54 24 44 M-19 53 Q0 62 19 53" fill="none" stroke="#f0faff" strokeWidth={5} strokeLinecap="round" />
      <path d="M-15 -60 L0 -77 L15 -60" fill="none" stroke="#123c61" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-15 -60 L0 -77 L15 -60" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 -50 Q-30 -25 -38 -2 L-36 29 Q0 49 36 29 L38 -2 Q30 -25 0 -50Z" fill="#f19d57" stroke="#8c471e" strokeWidth={5} />
      <path d="M0 -35 Q-19 -19 -25 0 L-23 18 Q0 30 23 18 L25 0 Q19 -19 0 -35Z" fill="#ffeabb" stroke="#bf742f" strokeWidth={3} />
      <path d="M-27 22 H27" fill="none" stroke="#bf742f" strokeWidth={5} strokeLinecap="round" />
      <circle cy={-1} r={18} fill="#d9fff3" stroke="#0f7a66" strokeWidth={4} />
      <rect x={-13} y={-12} width={26} height={12} rx={6} fill="#1b2a4e" />
      <circle cx={-5} cy={-6} r={3} fill="#7df9ff" />
      <circle cx={5} cy={-6} r={3} fill="#7df9ff" />
      <path d="M-5 6 Q0 10 5 6" fill="none" stroke="#0f7a66" strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

/** Thumbnail grid lain (semuaGrid). */
function Mini({ grid, tanah, ukuran = 72 }: { grid: NavGrid; tanah: [string, string]; ukuran?: number }) {
  const s = 12;
  const skala = Math.min(ukuran / (grid.w * s), ukuran / (grid.h * s), 1.6);
  return (
    <svg viewBox={`0 0 ${grid.w * s} ${grid.h * s}`} width={Math.round(grid.w * s * skala)} height={Math.round(grid.h * s * skala)} aria-hidden style={{ display: "block" }}>
      {Array.from({ length: grid.h }, (_, y) => Array.from({ length: grid.w }, (_, x) => {
        const c = { x, y };
        const f = grid.walls.some((w) => samaSel(w, c)) ? "#2c6a1d" : grid.rocks.some((b) => samaSel(b, c)) ? "#9aa1a8" : samaSel(grid.goal, c) ? "#ffd23f" : samaSel(grid.start, c) ? "#2ec4a6" : (x + y) % 2 ? tanah[1] : tanah[0];
        return <rect key={`${x}-${y}`} x={x * s + 0.5} y={y * s + 0.5} width={s - 1} height={s - 1} rx={2} fill={f} />;
      }))}
    </svg>
  );
}

/* ---------------- palet & rak ---------------- */

function Palet({ commands, onTekan, nonaktif, besar, penuh, rapat, arahMaju }: { commands: NavCommand[]; onTekan: (c: NavCommand) => void; nonaktif: boolean; besar?: boolean; penuh?: boolean; rapat?: boolean; arahMaju?: Arah }) {
  const { skala: sk, w } = usePanggung();
  const skt = Math.min(sk, 1.35);
  // tablet: semua blok sebaris; HP: paling banyak 4 sebaris
  const kolom = w >= 460 ? Math.min(commands.length, 6) : Math.min(commands.length, 4);
  const sesak = kolom > 4;
  // di kolom kanan (mendatar) tombol mengisi lebar kolom; di HP/tegak lebar tombol ikut skala
  const lebar = penuh ? "1fr" : `${Math.round((besar ? 160 : 140) * sk)}px`;
  const ukuranIkon = Math.round((rapat ? 24 : 30) * sk);
  return (
    <div className="grid justify-center" style={{ gap: 8 * sk, gridTemplateColumns: `repeat(${kolom}, minmax(0, ${lebar}))` }}>
      {commands.map((c) => (
        <button
          key={c}
          onClick={() => onTekan(c)}
          disabled={nonaktif}
          className={`koding-block flex flex-col items-center justify-center gap-0.5 disabled:opacity-70 ${sesak ? "px-0.5 py-1" : "px-2 py-2"}`}
          style={{ background: muka(BLOK[c].c), border: `3px solid ${BLOK[c].c}`, boxShadow: `0 5px 0 ${BLOK[c].d}`, color: BLOK[c].d, minHeight: (besar ? 76 : rapat ? 56 : 64) * sk }}
          aria-label={BLOK[c].label}
          aria-description={c === "maju" ? "Satu petak searah hadap robot" : undefined}
        >
          {c === "maju" && arahMaju ? (
            <span className="inline-flex" aria-hidden style={{ transform: `rotate(${DEG[arahMaju]}deg)` }}><Icon name="arrow_upward" size={ukuranIkon} /></span>
          ) : BLOK[c].ikon(ukuranIkon)}
          <span style={{ fontFamily: BALOO, fontSize: (c === "kalau" ? (sesak ? 11.5 : 13) : sesak ? 13 : 15) * skt, fontWeight: 800, lineHeight: 1.1, textAlign: "center", color: INK }}>{BLOK[c].label}</span>
        </button>
      ))}
    </div>
  );
}

function Rak({ judul, blok, slot, aktif, sel, bacaSaja, gantiBlok, pilihTabrak, onPilihRak, onSelesaiIsi, onKetuk, onN, onHapusIsi }: {
  judul: string; blok: NavBlock[]; slot: number; aktif: boolean; sel: number | null; bacaSaja?: boolean; gantiBlok?: boolean; pilihTabrak?: boolean;
  onPilihRak?: () => void; onSelesaiIsi?: () => void; onKetuk?: (i: number) => void; onN?: (i: number) => void; onHapusIsi?: (i: number, j: number) => void;
}) {
  const { tema, skala: sk, w } = usePanggung();
  const skt = Math.min(sk, 1.35);
  const sempit = w > 0 && w < 460 && slot >= 4; // petunjuk akan turun baris dan mendorong tombol Jalan
  const terpakai = hitungBlok(blok);
  const kosong = Math.max(0, slot - terpakai);
  const sorotRak = aktif && onPilihRak;
  const dipilih = sel === null ? undefined : blok[sel];
  // rak bertema dunia: badan berwarna wadah, area slot terang di dalamnya (selaras komponen Wadah)
  return (
    <div
      onClick={onPilihRak}
      className="rounded-[20px]"
      style={{
        background: `linear-gradient(180deg,${tema.wadahGelap} 0 ${Math.round(8 * sk)}px,${tema.wadahWarna} ${Math.round(8 * sk)}px)`,
        boxShadow: `0 5px 0 ${tema.wadahGelap}${sorotRak ? ", 0 0 0 4px #fd861d" : ""}`,
        padding: `${10 * sk}px ${10 * sk}px ${12 * sk}px`,
      }}
    >
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5">
        <div className="inline-flex rounded-full bg-white/95 px-3 py-0.5 font-extrabold shadow-[0_2px_0_rgba(0,0,0,.12)]" style={{ fontSize: 13 * skt, color: INK }}>{judul}</div>
        {onSelesaiIsi && dipilih?.cmd === "ulangi" && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onSelesaiIsi(); }}
            disabled={dipilih.body.length === 0}
            className="flex min-h-11 items-center gap-1 rounded-full bg-white px-3 text-[#134d34] shadow-[0_2px_0_rgba(0,0,0,.12)] disabled:opacity-70"
            style={{ fontSize: 13 * skt, fontWeight: 900 }}
          >
            <span aria-hidden><Icon name="check" size={18} /></span>
            Selesai isi Ulangi
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center rounded-[14px]" style={{ gap: 6 * sk, padding: 6 * sk, background: "#ffffff", boxShadow: "inset 0 4px 10px rgba(0,0,0,.14)" }}>
        {blok.map((b, i) => (
          <Keping key={i} blok={b} nomor={i + 1} dipilih={sel === i} bacaSaja={bacaSaja} gantiBlok={gantiBlok} pilihTabrak={pilihTabrak} onKetuk={() => onKetuk?.(i)} onN={() => onN?.(i)} onHapusIsi={(j) => onHapusIsi?.(i, j)} />
        ))}
        {Array.from({ length: kosong }, (_, k) => (
          <span key={`k${k}`} className="rounded-[12px]" style={{ width: 56 * sk, height: 56 * sk, border: `3px dashed ${tema.wadahGelap}`, background: `${tema.wadahWarna}1f` }} aria-hidden />
        ))}
        {blok.length === 0 && !bacaSaja && !sempit && <span className="ml-1 self-center font-bold" style={{ fontSize: 14 * skt, color: "#3d4f66" }}>Ketuk blok di bawah</span>}
      </div>
    </div>
  );
}

function Keping({ blok, nomor, dipilih, bacaSaja, gantiBlok, pilihTabrak, onKetuk, onN, onHapusIsi }: {
  blok: NavBlock; nomor: number; dipilih: boolean; bacaSaja?: boolean; gantiBlok?: boolean; pilihTabrak?: boolean; onKetuk: () => void; onN: () => void; onHapusIsi: (j: number) => void;
}) {
  const { skala: sk } = usePanggung();
  const b = BLOK[blok.cmd];
  const gaya = { background: muka(b.c), border: `3px solid ${b.c}`, color: b.d, boxShadow: `0 3px 0 ${b.d}`, outline: dipilih ? "4px solid #ffb000" : "4px solid transparent", outlineOffset: 1 } as const;
  const nomorEl = <span className="absolute -top-2 -left-2 flex items-center justify-center rounded-full bg-white font-black" style={{ color: INK, width: 20 * sk, height: 20 * sk, fontSize: 11 * sk }}>{nomor}</span>;
  if (blok.cmd === "ulangi") {
    return (
      <div className="relative flex items-center gap-1 rounded-[14px] p-1 pl-2" style={gaya} aria-label={`Blok ${nomor}: ulangi ${blok.n} kali`}>
        <button onClick={(e) => { e.stopPropagation(); onKetuk(); }} disabled={bacaSaja} className="flex items-center gap-1 self-stretch" style={{ minWidth: 44 * sk, minHeight: 48 * sk }} aria-label={pilihTabrak ? `Blok ${nomor}: ulangi ${blok.n} kali, ketuk untuk menjawab` : dipilih ? "Hapus blok ulangi" : "Isi blok ulangi"}>
          <span style={{ fontSize: 22 * sk }}>🔁</span>
        </button>
        <button onClick={(e) => { e.stopPropagation(); onN(); }} disabled={bacaSaja || pilihTabrak} className="rounded-[10px] bg-white px-2 font-black text-[#a84a08] shadow-[0_2px_0_rgba(0,0,0,.15)] active:scale-95" style={{ minWidth: 44 * sk, minHeight: 44 * sk, fontSize: 20 * sk }} aria-label={`Ulangi ${blok.n} kali${pilihTabrak ? "" : ", ketuk untuk mengubah"}`}>
          {blok.n}×
        </button>
        <div className="flex items-center gap-1 rounded-[10px] bg-white p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,.15)]" style={{ minWidth: 48 * sk, minHeight: 48 * sk }}>
          {blok.body.map((c, j) => {
            const k = BLOK[c.cmd];
            const px = Math.round(22 * sk);
            return (
              <button key={j} onClick={(e) => { e.stopPropagation(); onHapusIsi(j); }} disabled={bacaSaja || pilihTabrak} className="flex items-center justify-center rounded-[10px]" style={{ background: muka(k.c), border: `2px solid ${k.c}`, color: k.d, boxShadow: `0 2px 0 ${k.d}`, width: 44 * sk, height: 44 * sk }} aria-label={`${k.label}${pilihTabrak ? "" : ", ketuk untuk menghapus"}`}>
                {c.cmd === "maju" ? <Icon name="arrow_upward" size={px} /> : c.cmd === "kiri" ? <Icon name="turn_left" size={px} /> : c.cmd === "kanan" ? <Icon name="turn_right" size={px} /> : <span style={{ fontSize: 20 * sk }}>{c.cmd === "lompat" ? "🦘" : c.cmd === "kalau" ? "🤔" : "🚩"}</span>}
              </button>
            );
          })}
          {blok.body.length === 0 && <span className="font-bold" style={{ fontSize: 12 * sk, color: "#3d4f66" }}>isi…</span>}
        </div>
        {nomorEl}
      </div>
    );
  }
  const tindakan = bacaSaja ? ""
    : pilihTabrak ? ", ketuk untuk menjawab"
      : dipilih ? ", ketuk lagi untuk menghapus"
      : gantiBlok ? ", ketuk untuk memilih blok yang akan diganti" : ", ketuk untuk menghapus";
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onKetuk(); }}
      disabled={bacaSaja}
      className="relative flex items-center justify-center rounded-[14px] active:translate-y-0.5"
      style={{ ...gaya, width: (blok.cmd === "kalau" ? 88 : 56) * sk, height: 56 * sk }}
      aria-label={`Blok ${nomor}: ${b.label}${tindakan}`}
    >
      {blok.cmd === "kalau" ? <span style={{ fontSize: 12 * sk, fontWeight: 800, lineHeight: 1.1, color: INK }}>🪨? lompat<br />: maju</span> : b.ikon(Math.round(30 * sk))}
      {nomorEl}
    </button>
  );
}
