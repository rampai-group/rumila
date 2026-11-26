import type { LevelId } from "@akademi/schema";
import { pemantapanUjiAktif, type PemantapanUji } from "./mastery";

// Pengecualian Navigator untuk satu profil QA, aktif selama pengujian ini saja.
const SIDIK_PROFIL_UJI = "a08097dc304fa17f09d31a36c0e9aff833c8b00ebfade1393ce995e37e571c4c";
const RUANG_SIDIK = "rumila-akademi:uji-navigator:2026-11-26";
const PERIODE: PemantapanUji = {
  mulai: new Date("2026-11-26T10:51:00.000Z"),
  berakhir: new Date("2026-11-27T05:00:00.000Z"),
};

async function sidikSHA256(teks: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(teks));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function pemantapanUjiUntuk(memberId: string, level: LevelId, waktu: Date): Promise<PemantapanUji | undefined> {
  if (level !== "TKB" || !memberId || !pemantapanUjiAktif(PERIODE, waktu)) return;

  try {
    const sidik = await sidikSHA256(memberId.toLowerCase());
    const sidikUji = await sidikSHA256(`${RUANG_SIDIK}:${sidik}`);
    if (sidikUji === SIDIK_PROFIL_UJI) return PERIODE;
  } catch {
    // Tanpa Web Crypto, aturan produksi biasa tetap berlaku.
  }
}
