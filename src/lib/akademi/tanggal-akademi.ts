"use client";

import { useEffect, useState } from "react";

/** Segarkan saran Pemantapan ketika tanggal lokal berganti, juga saat tab dibuka kembali. */
export function useTanggalAkademi(): Date {
  const [tanggal, setTanggal] = useState(() => new Date());

  useEffect(() => {
    let timer: number | undefined;
    const segarkan = () => {
      const sekarang = new Date();
      setTanggal((sebelum) => sebelum.toDateString() === sekarang.toDateString() ? sebelum : sekarang);

      const besok = new Date(sekarang);
      besok.setHours(24, 0, 0, 0);
      window.clearTimeout(timer);
      timer = window.setTimeout(segarkan, besok.getTime() - sekarang.getTime());
    };
    const saatTerlihat = () => {
      if (document.visibilityState === "visible") segarkan();
    };

    segarkan();
    window.addEventListener("focus", segarkan);
    document.addEventListener("visibilitychange", saatTerlihat);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", segarkan);
      document.removeEventListener("visibilitychange", saatTerlihat);
    };
  }, []);

  return tanggal;
}
