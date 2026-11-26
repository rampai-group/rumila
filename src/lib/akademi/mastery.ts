// Proyeksi penguasaan kompetensi dari event belajar — fungsi murni, tanpa DOM / React.
// Bukti = event "attempt" yang payload-nya menyebut competencyIds.
//   konteks  = activityId berbeda di antara percobaan benar (event imported → satu konteks "import")
//   hari     = tanggal WIB berbeda di antara percobaan benar
//   ratio    = benar / semua pada 10 percobaan terakhir
//   hintTail = percobaan berturut-turut dari akhir yang memakai bantuan
// Aturan = DEFAULT_MASTERY ditimpa c.mastery.

import { percobaanUlang } from "./percobaan";
import { dariKampus } from "./akses";
import { hariWIB } from "./kalender";
import { DEFAULT_MASTERY, type Competency, type GameEvent, type LevelId, type MasteryRule, type TrackId } from "@akademi/schema";

export type Status = "belum" | "berkembang" | "dikuasai";

/** Periode QA yang telah disahkan untuk profil uji aktif. */
export type PemantapanUji = { mulai: Date; berakhir: Date };

export function pemantapanUjiAktif(uji: PemantapanUji | undefined, waktu: Date): uji is PemantapanUji {
  return !!uji && waktu >= uji.mulai && waktu < uji.berakhir;
}

export interface Penguasaan {
  status: Status;
  success: number;
  fail: number;
  contexts: number;
  days: number;
  ratioLast10: number;
  lastAt?: string;
  hintTail: number;
  hariBenar?: readonly string[];
  paketBenar?: readonly string[];
  tanpaBantuTerakhir?: number;
  pemantapanUji?: "perlu-latihan" | "terpenuhi";
}

export interface SyaratPenguasaan {
  jenis: "benar" | "paket" | "hari" | "akurasi" | "tanpaBantu";
  jumlah: number;
  target: number;
}

interface Bukti {
  at: string;
  correct: boolean;
  hintUsed: boolean;
  konteks: string;
  latihanBiasa: boolean;
}

const KOSONG: Penguasaan = { status: "belum", success: 0, fail: 0, contexts: 0, days: 0, ratioLast10: 0, hintTail: 0 };

export function syaratPenguasaan(peng: Penguasaan | undefined, aturan: MasteryRule): SyaratPenguasaan[] {
  const p = peng ?? KOSONG;
  const syarat: SyaratPenguasaan[] = [
    { jenis: "benar", jumlah: p.success, target: aturan.minSuccess },
    { jenis: "paket", jumlah: p.contexts, target: aturan.minContexts },
    { jenis: "hari", jumlah: p.days, target: aturan.minDays },
    { jenis: "akurasi", jumlah: p.ratioLast10, target: aturan.minRatioLast10 },
    { jenis: "tanpaBantu", jumlah: p.tanpaBantuTerakhir ?? 0, target: aturan.noHintLast },
  ];
  return syarat.filter(({ jenis, jumlah, target }) =>
    jumlah < target && !(jenis === "hari" && target === 2 && p.pemantapanUji === "terpenuhi"),
  ).map((s) =>
    s.jenis === "akurasi" ? { ...s, jumlah: s.jumlah * 100, target: s.target * 100 } : s,
  );
}

function kumpulkanBukti(events: GameEvent[], saring: (e: GameEvent) => boolean = (e) => !dariKampus(e)): Map<string, Bukti[]> {
  const per = new Map<string, Bukti[]>();
  // bawaan: hanya bukti dari paket Academy; aktivitas gedung kampus (quest 3D, game Coding Agam) tidak dihitung (lihat akses.ts)
  const urut = events
    .filter((e) => e.type === "attempt" && !percobaanUlang(e) && saring(e))
    .slice()
    .sort((a, b) => (a.clientAt < b.clientAt ? -1 : a.clientAt > b.clientAt ? 1 : 0));
  for (const e of urut) {
    const p = e.payload as { correct?: unknown; hintUsed?: unknown; competencyIds?: unknown; imported?: unknown; detail?: { ujian?: unknown } };
    if (!Array.isArray(p.competencyIds) || p.competencyIds.length === 0) continue;
    const b: Bukti = {
      at: e.clientAt,
      correct: p.correct === true,
      hintUsed: p.hintUsed === true,
      konteks: p.imported === true ? "import" : e.activityId,
      latihanBiasa: p.imported !== true && p.detail?.ujian === undefined && typeof p.hintUsed === "boolean",
    };
    for (const cid of p.competencyIds) {
      if (typeof cid !== "string") continue;
      const arr = per.get(cid);
      if (arr) arr.push(b);
      else per.set(cid, [b]);
    }
  }
  return per;
}

export function nilaiPenguasaan(bukti: Bukti[], aturan: MasteryRule, uji?: PemantapanUji): Penguasaan {
  if (!bukti.length) return { ...KOSONG };
  const benar = bukti.filter((b) => b.correct);
  const success = benar.length;
  const fail = bukti.length - success;
  const paketBenar = [...new Set(benar.map((b) => b.konteks))];
  const hariBenar = [...new Set(benar.map((b) => hariWIB(b.at)))];
  const last10 = bukti.slice(-10);
  const ratioLast10 = last10.filter((b) => b.correct).length / last10.length;
  const terakhir = bukti[bukti.length - 1];
  let berturut = 0;
  for (let i = bukti.length - 1; i >= 0 && bukti[i].hintUsed === terakhir.hintUsed; i--) berturut++;
  const peng: Penguasaan = {
    status: success >= 1 ? "berkembang" : "belum",
    success, fail, contexts: paketBenar.length, days: hariBenar.length, ratioLast10, lastAt: terakhir.at,
    hintTail: terakhir.hintUsed ? berturut : 0,
    tanpaBantuTerakhir: terakhir.hintUsed ? 0 : berturut,
    hariBenar, paketBenar,
  };
  if (uji && aturan.minDays === 2 && hariBenar.length === 1 && uji.mulai < uji.berakhir) {
    const mulai = uji.mulai.getTime();
    const berakhir = uji.berakhir.getTime();
    const latihan = benar.filter((b) => b.latihanBiasa);
    if (latihan.some((b) => Date.parse(b.at) < mulai)) {
      const baru = latihan.some((b) => {
        const waktu = Date.parse(b.at);
        return !b.hintUsed && waktu >= mulai && waktu < berakhir;
      });
      peng.pemantapanUji = baru ? "terpenuhi" : "perlu-latihan";
    }
  }
  if (!syaratPenguasaan(peng, aturan).length) peng.status = "dikuasai";
  return peng;
}

export function aturanUntuk(c: Competency): MasteryRule {
  return { ...DEFAULT_MASTERY, ...(c.mastery ?? {}) };
}

/** Penguasaan tiap kompetensi (kompetensi tanpa bukti → "belum" dengan angka 0). */
export function proyeksi(events: GameEvent[], kompetensi: Competency[], uji?: PemantapanUji): Record<string, Penguasaan> {
  return proyeksikan(kumpulkanBukti(events), kompetensi, uji);
}

/** Proyeksi dengan saringan event sendiri (mis. hanya jejak gedung kampus untuk Penilaian Praktik). */
export function proyeksiDari(events: GameEvent[], kompetensi: Competency[], saring?: (e: GameEvent) => boolean): Record<string, Penguasaan> {
  return proyeksikan(kumpulkanBukti(events, saring), kompetensi);
}

function proyeksikan(bukti: Map<string, Bukti[]>, kompetensi: Competency[], uji?: PemantapanUji): Record<string, Penguasaan> {
  const out: Record<string, Penguasaan> = {};
  for (const c of kompetensi) {
    out[c.id] = nilaiPenguasaan(bukti.get(c.id) ?? [], aturanUntuk(c), c.level === "TKB" && c.core ? uji : undefined);
  }
  return out;
}

export interface RingkasanTrack {
  total: number;
  dikuasai: number;
  berkembang: number;
  belum: number;
  coreDikuasai: number;
  coreTotal: number;
}

/** Ringkasan satu track × level untuk Rapor / lencana. */
export function ringkasTrack(peng: Record<string, Penguasaan>, kompetensi: Competency[], track: TrackId, level: LevelId): RingkasanTrack {
  const r: RingkasanTrack = { total: 0, dikuasai: 0, berkembang: 0, belum: 0, coreDikuasai: 0, coreTotal: 0 };
  for (const c of kompetensi) {
    if (c.track !== track || c.level !== level) continue;
    const s = peng[c.id]?.status ?? "belum";
    r.total++;
    r[s]++;
    if (c.core) {
      r.coreTotal++;
      if (s === "dikuasai") r.coreDikuasai++;
    }
  }
  return r;
}
