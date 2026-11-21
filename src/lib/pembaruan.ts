"use client";

// Pembaruan otomatis: app iOS (WebView) dan aplikasi layar utama bisa terus memakai versi lama dari cache.
// Klien membawa versi build-nya (NEXT_PUBLIC_VERSI) dan membandingkannya dengan /api/versi saat dibuka,
// saat kembali ke depan, dan berkala. Bila beda: hapus cache + service worker, lalu muat ulang dengan
// alamat penembus cache. Tarik-muat-ulang juga selalu membersihkan cache lebih dulu.

import { muatUlang } from "./mode-app";

export const VERSI = process.env.NEXT_PUBLIC_VERSI ?? "dev";
const KUNCI_COBA = "rinoya-coba-versi";

/** Hapus Cache Storage & lepas service worker (keduanya bisa menahan halaman lama). */
export async function bersihkanCache() {
  try {
    if ("caches" in window) await Promise.all((await caches.keys()).map((k) => caches.delete(k)));
  } catch {}
  try {
    if ("serviceWorker" in navigator) await Promise.all((await navigator.serviceWorker.getRegistrations()).map((r) => r.unregister()));
  } catch {}
}

/** Bersihkan cache lalu muat ulang halaman ini (dipakai tarik-muat-ulang). */
export async function segarkan() {
  await bersihkanCache();
  muatUlang(undefined, true);
}

/** Cek versi server; muat ulang bila ada versi baru. Satu percobaan per versi per sesi (cegah putaran). */
export async function cekPembaruan() {
  if (VERSI === "dev") return;
  try {
    const r = await fetch(`/api/versi?t=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) return;
    const { versi } = (await r.json()) as { versi?: string };
    if (!versi || versi === "dev" || versi === VERSI) return;
    if (sessionStorage.getItem(KUNCI_COBA) === versi) return;
    sessionStorage.setItem(KUNCI_COBA, versi);
    await bersihkanCache();
    muatUlang(undefined, true);
  } catch {}
}

/** Hapus penanda `_v` (penembus cache) dari alamat setelah halaman termuat. */
export function rapikanAlamat() {
  const u = new URL(location.href);
  if (!u.searchParams.has("_v")) return;
  u.searchParams.delete("_v");
  history.replaceState(history.state, "", u.pathname + (u.search === "?" ? "" : u.search) + u.hash);
}
