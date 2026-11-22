// Berkas di public/ yang dirujuk kode wajib ikut commit. Empat rekaman tur pernah 404 sebulan di produksi
// (24 Okt–22 Nov 2026) karena kode merujuk berkas yang hanya ada di Mac pembuatnya.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const RUJUKAN = /["'`(](\/[A-Za-z0-9_\-./]+\.(?:m4a|mp3|wav|ogg|glb|gltf|webp|png|jpe?g|vtt|mp4|woff2|ktx2))["'`)?]/g;
/** Pola di komentar, bukan berkas sungguhan. */
const CONTOH = new Set(["/angkasa/tex/2k_x.jpg", "/angkasa/lo/lo_x.jpg"]);

describe("berkas publik", () => {
  it("semua berkas yang dirujuk kode ikut di git", () => {
    const semua = execFileSync("git", ["ls-files"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }).trim().split("\n");
    const ada = new Set(semua.filter((f) => f.startsWith("public/")).map((f) => f.slice("public".length)));
    const hilang = new Set<string>();
    for (const f of semua) {
      if (!/^(src\/|packages\/|public\/)/.test(f) || !/\.(tsx?|json|css)$/.test(f) || /__tests__|\.test\./.test(f)) continue;
      for (const m of readFileSync(f, "utf8").matchAll(RUJUKAN)) {
        const u = m[1];
        if (u.startsWith("//") || u.startsWith("/api/") || CONTOH.has(u) || ada.has(u)) continue;
        hilang.add(`${u} (${f})`);
      }
    }
    expect([...hilang]).toEqual([]);
  }, 60_000);
});
