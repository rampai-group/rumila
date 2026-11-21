"use client";

// Mode app toko (Play Store / App Store): kebijakan toko melarang pembelian konten digital di luar billing toko
// dan larangan mengarahkan ke sana. Jadi di dalam app, halaman harga/paket/rekening/riwayat bayar disembunyikan;
// pembayaran tetap lewat web (kampus.pulaurinoya.com di browser).
//
// Deteksi: app Android (TWA) membuka halaman pertama dengan referrer `android-app://com.pulaurinoya.academy`.
// Hanya halaman pertama yang membawa referrer itu, jadi tandanya disimpan di sessionStorage (per sesi app; TWA berbagi
// localStorage dengan Chrome, jadi localStorage TIDAK dipakai supaya Chrome biasa tidak ikut tersembunyi).
// `?mode=app` / `?mode=web` untuk uji coba dan build app lain (mis. iOS) di kemudian hari.

import { useEffect, useState } from "react";

const KUNCI = "rinoya-mode-app";
const PAKET_ANDROID = "android-app://com.pulaurinoya.academy";

export function modeApp(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const q = new URLSearchParams(window.location.search).get("mode");
    if (q === "web") sessionStorage.removeItem(KUNCI);
    else if (q === "app" || document.referrer.startsWith(PAKET_ANDROID)) sessionStorage.setItem(KUNCI, "1");
    return sessionStorage.getItem(KUNCI) === "1";
  } catch {
    return document.referrer.startsWith(PAKET_ANDROID);
  }
}

/** true bila dibuka dari app toko. Selalu false saat render server / render pertama (hindari beda hidrasi). */
export function useModeApp(): boolean {
  const [app, setApp] = useState(false);
  useEffect(() => setApp(modeApp()), []);
  return app;
}

/** Dibuka di dalam app iOS (Capacitor, user agent ditambah "RinoyaApp-iOS"). */
export function appIos(): boolean {
  return typeof navigator !== "undefined" && /RinoyaApp-iOS/.test(navigator.userAgent);
}

/** Alamat awal app iOS. Capacitor hanya menahan pemuatan penuh yang diawali alamat ini; selain itu dibuka di
 *  Safari. Jadi di app iOS, muat ulang lewat alamat awal + `ke` (halaman tujuan), lalu PwaSetup membawa kembali. */
const AWAL_IOS = "/beranda?mode=app";

/** Muat ulang penuh (atau pindah penuh ke `tujuan`) tanpa terlempar ke Safari saat di app iOS.
 *  `segar` = tambah penanda `_v` supaya cache WebView tidak dipakai. */
export function muatUlang(tujuan?: string, segar = false) {
  const ke = tujuan ?? location.pathname + location.search;
  const v = segar ? `_v=${Date.now()}` : "";
  if (appIos()) {
    location.href = `${location.origin}${AWAL_IOS}${v ? `&${v}` : ""}&ke=${encodeURIComponent(ke)}`;
    return;
  }
  if (v) return location.replace(ke + (ke.includes("?") ? "&" : "?") + v);
  if (tujuan) location.replace(tujuan);
  else location.reload();
}

/** `ke` yang aman (jalur internal saja) dari alamat sekarang, atau null. */
export function ambilKe(): string | null {
  const ke = new URLSearchParams(location.search).get("ke");
  return ke && ke.startsWith("/") && !ke.startsWith("//") ? ke : null;
}
