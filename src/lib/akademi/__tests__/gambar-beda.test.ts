import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ContentPack } from "@akademi/schema";

const semua = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? semua(join(dir, f)) : f.endsWith(".json") ? [join(dir, f)] : []));

const paket = semua(join(process.cwd(), "content/paket")).flatMap((f) => {
  const r = ContentPack.safeParse(JSON.parse(readFileSync(f, "utf8")));
  return r.success ? [r.data] : [];
});

type Gambar = { emoji?: string; shape?: string; color?: string; scale?: number; count?: number; width?: number; angka?: string; adegan?: unknown };
/** Kartu tulisan dibedakan oleh teks. Adegan juga mencakup gambar tanpa emoji/bentuk dasar. */
const rupa = (x: Gambar) =>
  x.emoji || x.shape || x.adegan ? JSON.stringify([x.emoji, x.shape, x.color, x.scale ?? 1, x.count ?? 1, x.width ?? 1, x.angka, x.adegan]) : null;

describe("gambar dalam satu soal harus bisa dibedakan", () => {
  it("langkah urutan tidak bergambar sama", () => {
    const kembar: string[] = [];
    for (const p of paket) {
      if (p.mechanic !== "urutkan") continue;
      for (const s of p.sequences) {
        const r = s.steps.map(rupa).filter(Boolean);
        if (new Set(r).size !== r.length) kembar.push(`${p.id}/${s.id}`);
      }
    }
    expect(kembar).toEqual([]);
  });

  it("pilihan dalam satu pertanyaan tidak bergambar sama", () => {
    const kembar: string[] = [];
    for (const p of paket) {
      if (p.mechanic !== "pilah" || p.mode !== "pilih") continue;
      const benda = new Map(p.items.map((i) => [i.id, i]));
      for (const q of p.pilihan ?? []) {
        const r = q.choices.flatMap((id) => (benda.has(id) ? [rupa(benda.get(id)!)] : [])).filter(Boolean);
        if (new Set(r).size !== r.length) kembar.push(`${p.id}/${q.id}`);
      }
    }
    expect(kembar).toEqual([]);
  });
});
