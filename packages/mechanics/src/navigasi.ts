// Mekanik navigasi (Agam ke bintang): interpreter blok, BFS optimal, pemilihan grid, dan penilaian.
// Semantik blok dikunci di docs/akademi/mekanik-navigasi.md. Arah: N = y−1, E = x+1, S = y+1, W = x−1.

import type { NavBlockJson, NavCommand, PaketNavigasi } from "@akademi/schema";
import { pilihSatu, rng } from "./rng";
import type { Arah, Hasil, JawabanNavigasi, Knobs, NavBlock, NavGrid, NavRun, NavState, NavStep, RondeNavigasi } from "./types";

const DELTA: Record<Arah, { dx: number; dy: number }> = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
const PUTAR: Record<Arah, { kiri: Arah; kanan: Arah }> = {
  N: { kiri: "W", kanan: "E" }, E: { kiri: "N", kanan: "S" }, S: { kiri: "E", kanan: "W" }, W: { kiri: "S", kanan: "N" },
};

type Dasar = "maju" | "lompat" | "kiri" | "kanan" | "kalau";
const perintahDasar = (c: NavCommand): c is Dasar => c === "maju" || c === "lompat" || c === "kiri" || c === "kanan" || c === "kalau";
const kunciPosisi = (s: NavState) => `${s.x},${s.y},${s.dir}`;

const samaSel = (a: { x: number; y: number }, b: { x: number; y: number }) => a.x === b.x && a.y === b.y;
const diLuar = (g: NavGrid, c: { x: number; y: number }) => c.x < 0 || c.y < 0 || c.x >= g.w || c.y >= g.h;
const adaDinding = (g: NavGrid, c: { x: number; y: number }) => g.walls.some(w => samaSel(w, c));
const adaBatu = (g: NavGrid, c: { x: number; y: number }) => g.rocks.some(b => samaSel(b, c));
const maju = (s: NavState, n: number) => ({ x: s.x + DELTA[s.dir].dx * n, y: s.y + DELTA[s.dir].dy * n });

/** Satu blok dasar dari keadaan `s`. `berhenti` = program harus berhenti (tersandung/tabrak). */
function langkahDasar(g: NavGrid, s: NavState, cmd: Dasar): { cmd: NavStep["cmd"]; kind: NavStep["kind"]; after: NavState; berhenti: boolean } {
  if (cmd === "kiri" || cmd === "kanan") return { cmd, kind: "turn", after: { ...s, dir: PUTAR[s.dir][cmd] }, berhenti: false };
  const nyata: "maju" | "lompat" = cmd === "kalau" ? (adaBatu(g, maju(s, 1)) ? "lompat" : "maju") : cmd;
  if (nyata === "maju") {
    const ke = maju(s, 1);
    if (diLuar(g, ke) || adaDinding(g, ke)) return { cmd: "maju", kind: "bump", after: s, berhenti: true };
    if (adaBatu(g, ke)) return { cmd: "maju", kind: "stumble", after: s, berhenti: true };
    return { cmd: "maju", kind: "move", after: { ...s, ...ke }, berhenti: false };
  }
  const ke = maju(s, 2);
  if (diLuar(g, ke) || adaDinding(g, ke) || adaBatu(g, ke)) return { cmd: "lompat", kind: "bump", after: s, berhenti: true };
  return { cmd: "lompat", kind: "jump", after: { ...s, ...ke }, berhenti: false };
}

/** Jalankan program di grid. Berhenti saat sampai bintang, tersandung, tabrak, atau (stopAtFlag) bendera. */
export function jalankan(grid: NavGrid, program: NavBlock[], opts: { stopAtFlag?: boolean } = {}): NavRun {
  const steps: NavStep[] = [];
  let state: NavState = { x: grid.start.x, y: grid.start.y, dir: grid.start.dir };
  let outcome: NavRun["outcome"] | null = program.length ? null : "kosong";
  let executed = 0;

  const eksekusi = (blok: NavBlock[], awalan: number[]): boolean => {
    for (let i = 0; i < blok.length; i++) {
      const b = blok[i];
      const path = [...awalan, i];
      if (b.cmd === "ulangi") {
        for (let k = 0; k < b.n; k++) if (!eksekusi(b.body, path)) return false;
        continue;
      }
      executed++;
      if (b.cmd === "bendera") {
        steps.push({ path, cmd: "bendera", after: state, kind: "flag" });
        if (opts.stopAtFlag) { outcome = "bendera"; return false; }
        continue;
      }
      const l = langkahDasar(grid, state, b.cmd);
      state = l.after;
      steps.push({ path, cmd: l.cmd, after: state, kind: l.kind });
      if (l.berhenti) { outcome = l.kind === "stumble" ? "tersandung" : "tabrak"; return false; }
      if (samaSel(state, grid.goal)) { outcome = "bintang"; return false; }
    }
    return true;
  };
  eksekusi(program, []);
  if (outcome === null) outcome = samaSel(state, grid.goal) ? "bintang" : "meleset";
  return { steps, outcome, final: state, executed };
}

/** Panjang program terpendek (blok dasar: maju/lompat/kiri/kanan/kalau yang tersedia) ke bintang; null bila tak terjangkau. */
export function optimal(grid: NavGrid, commands: NavCommand[]): number | null {
  const aksi = commands.filter(perintahDasar);
  const awal: NavState = { x: grid.start.x, y: grid.start.y, dir: grid.start.dir };
  if (samaSel(awal, grid.goal)) return 0;
  const dilihat = new Set<string>([kunciPosisi(awal)]);
  let lapis: NavState[] = [awal];
  for (let jarak = 1; lapis.length; jarak++) {
    const berikut: NavState[] = [];
    for (const s of lapis) for (const a of aksi) {
      const l = langkahDasar(grid, s, a);
      if (l.berhenti) continue;
      if (samaSel(l.after, grid.goal)) return jarak;
      const k = kunciPosisi(l.after);
      if (!dilihat.has(k)) { dilihat.add(k); berikut.push(l.after); }
    }
    lapis = berikut;
  }
  return null;
}

/** Hitung kebutuhan belok terendah. Gerak lurus tetap berada pada lapis jumlah belokan yang sama. */
function belokanMinimum(grid: NavGrid, commands: NavCommand[]): number | null {
  const aksi = commands.filter(perintahDasar);
  const dilihat = new Set<string>();
  let lapis: NavState[] = [grid.start];
  for (let belokan = 0; lapis.length; belokan++) {
    const berikut: NavState[] = [];
    for (let i = 0; i < lapis.length; i++) {
      const s = lapis[i];
      const kunci = kunciPosisi(s);
      if (dilihat.has(kunci)) continue;
      if (samaSel(s, grid.goal)) return belokan;
      dilihat.add(kunci);
      for (const a of aksi) {
        const l = langkahDasar(grid, s, a);
        if (l.berhenti) continue;
        if (l.kind === "turn") berikut.push(l.after);
        else lapis.push(l.after);
      }
    }
    lapis = berikut;
  }
  return null;
}

/** Jumlah keping di rak: ulangi = 1 keping + isinya. */
export function hitungBlok(program: NavBlock[]): number {
  return program.reduce((n, b) => n + (b.cmd === "ulangi" ? 1 + hitungBlok(b.body) : 1), 0);
}

function hitungPerintah(program: NavBlock[]): number {
  return program.reduce((n, b) => n + (b.cmd === "ulangi" ? b.n * hitungPerintah(b.body) : 1), 0);
}

/** Interpreter berhenti di bintang; latihan Ulangi juga memeriksa sisa perintah. */
export function adaPerintahSetelahBintang(program: NavBlock[], lari: NavRun): boolean {
  return lari.outcome === "bintang" && lari.executed < hitungPerintah(program);
}

/** Jika batas rak debug tidak ditulis, rak harus muat program yang disediakan. */
export function kapasitasRakNavigasi(r: Pick<RondeNavigasi, "rackSlots" | "debug" | "program">): number {
  return r.rackSlots ?? Math.max(8, r.debug ? hitungBlok(r.program) : 0);
}

/** Konversi program JSON paket → NavBlock (bentuknya sama; disalin supaya aman diubah presenter). */
export function dariJson(blok: NavBlockJson[]): NavBlock[] {
  return blok.map(b => (b.cmd === "ulangi" ? { cmd: "ulangi", n: b.n, body: dariJson(b.body) } : { cmd: b.cmd }));
}

/** Saring bertahap: tiap saringan hanya dipakai bila masih menyisakan kandidat. */
function saring<T>(daftar: T[], saringan: Array<(x: T) => boolean>): T[] {
  let hasil = daftar;
  for (const f of saringan) {
    const sisa = hasil.filter(f);
    if (sisa.length) hasil = sisa;
  }
  return hasil;
}

/** Saringan ronde juga dipakai saat menambah stok peta. Untuk misi menyusun program,
 * utamakan jumlah belokan jika bank soal tidak memuat kombinasi dengan jarak yang diminta. */
export function saringanGridNavigasi(p: PaketNavigasi, knobs: Knobs): Array<(g: NavGrid) => boolean> {
  const saringan: Array<(g: NavGrid) => boolean> = [];
  if (p.execMode === "program" && knobs.turns !== undefined) {
    saringan.push((g) => belokanMinimum(g, p.commands) === knobs.turns);
  }
  if (knobs.distance !== undefined) saringan.push((g) => (optimal(g, p.commands) ?? g.optimal) === knobs.distance);
  if (knobs.rocks !== undefined) saringan.push((g) => g.rocks.length === knobs.rocks);
  if (knobs.walls !== undefined) saringan.push((g) => g.walls.length === knobs.walls);
  return saringan;
}

export function buatRondeNavigasi(p: PaketNavigasi, knobs: Knobs, seed: number): RondeNavigasi {
  const r = rng(seed);
  const kandidat = saring(p.grids, saringanGridNavigasi(p, knobs));
  const utama = pilihSatu(kandidat, r);
  const grids = p.semuaGrid && utama.group ? p.grids.filter(g => g.group === utama.group) : [utama];
  return {
    execMode: p.execMode,
    commands: p.commands,
    grids,
    program: dariJson(utama.program ?? []),
    rackSlots: utama.rackSlots,
    fixes: utama.fixes,
    debug: p.debug,
    prediksi: p.prediksi,
    tepatDiBintang: p.tepatDiBintang,
  };
}

export function nilaiNavigasi(r: RondeNavigasi, j: JawabanNavigasi): Hasil {
  const program = r.execMode === "langsung" ? (j.langsung ?? j.program ?? []) : (j.program ?? []);
  const runs = r.grids.map(g => jalankan(g, program));
  const outcomes = runs.map(x => x.outcome);
  const utama = r.grids[0];
  const blocks = hitungBlok(program);
  const opt = utama ? optimal(utama, r.commands) : null;
  const lompat = runs[0]?.steps.filter(s => s.kind === "jump").length ?? 0;
  const prediksiTotal = j.prediksi?.length ?? 0;
  const prediksiBenar = j.prediksi?.filter(Boolean).length ?? 0;

  // dekomposisi: bagian 1 harus berakhir tepat di bendera yang dipilih anak
  let benderaTepat: boolean | undefined;
  if (j.bendera && utama) {
    const lari = jalankan(utama, j.bendera.bagian[0], { stopAtFlag: true });
    benderaTepat = samaSel(lari.final, j.bendera) && lari.outcome !== "tersandung" && lari.outcome !== "tabrak";
  }

  const semuaBintang = outcomes.length > 0 && outcomes.every(o => o === "bintang");
  const programHabis = !r.tepatDiBintang || runs.every(lari => !adaPerintahSetelahBintang(program, lari));
  // debug: anak boleh menemukan perbaikan yang lebih hemat dari target (dulu wajib tepat sama → salah dinilai)
  const debugBeres = !r.debug || r.fixes === undefined || (typeof j.edits === "number" && j.edits <= r.fixes);
  // mode bendera: batas berlaku per bagian. Debug memakai kapasitas yang sama dengan editor.
  const batasRak = r.rackSlots ?? (r.debug && r.execMode === "program" ? kapasitasRakNavigasi(r) : undefined);
  const rakBeres = batasRak === undefined || (j.bendera ? j.bendera.bagian.every(b => hitungBlok(b) <= batasRak) : blocks <= batasRak);
  // mode prediksi: program sudah disediakan, jadi buktinya tebakan anak (minimal 60% benar, sama dengan ambang misi)
  const prediksiBeres = !r.prediksi || prediksiTotal === 0 || prediksiBenar / prediksiTotal >= 0.6;
  // mode langkah + prediksi: program disediakan mesin (boleh sengaja berakhir menabrak, mis. "berhenti sebelum
  // tabrak"), jadi kelulusan ditentukan tebakan anak, bukan apakah program itu sampai bintang (bug audit 15 Nov 2026)
  const programDisediakan = r.execMode === "langkah" && r.prediksi;
  const benar = programDisediakan
    ? prediksiTotal > 0 && prediksiBeres
    : semuaBintang && programHabis && debugBeres && rakBeres && prediksiBeres && benderaTepat !== false;

  return {
    benar,
    detail: {
      outcome: outcomes[0] ?? "kosong",
      outcomes,
      blocks,
      optimal: opt,
      efisien: opt !== null && blocks <= opt,
      lompat,
      batu: utama?.rocks.length ?? 0,
      edits: j.edits,
      runs: j.runs,
      prediksiBenar,
      prediksiTotal,
      ...(benderaTepat !== undefined ? { benderaTepat } : {}),
    },
  };
}
