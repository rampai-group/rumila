"use client";

import { useEffect, useState } from "react";
import { hariWIB, jedaKeHariWIBBerikut } from "./kalender";

/** Segarkan saran Pemantapan ketika tanggal WIB berganti, juga saat tab dibuka kembali. */
export function useTanggalAkademi(): Date {
  const [tanggal, setTanggal] = useState(() => new Date());

  useEffect(() => {
    let timer: number | undefined;
    const segarkan = () => {
      const sekarang = new Date();
      setTanggal((sebelum) => hariWIB(sebelum) === hariWIB(sekarang) ? sebelum : sekarang);
      window.clearTimeout(timer);
      timer = window.setTimeout(segarkan, jedaKeHariWIBBerikut(sekarang));
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
