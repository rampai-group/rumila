"use client";

import { useEffect, useState } from "react";
import type { LevelId } from "@akademi/schema";
import type { PemantapanUji } from "./mastery";
import { pemantapanUjiUntuk } from "./pemantapan-uji";

export function usePemantapanUji(memberId: string, level: LevelId): PemantapanUji | undefined {
  const [aktif, setAktif] = useState<{ memberId: string; uji: PemantapanUji }>();

  useEffect(() => {
    let masihAktif = true;
    let timer: number | undefined;
    void pemantapanUjiUntuk(memberId, level, new Date()).then((uji) => {
      if (!masihAktif || !uji) return;
      setAktif({ memberId, uji });
      timer = window.setTimeout(() => setAktif(undefined), Math.max(0, uji.berakhir.getTime() - Date.now()));
    });
    return () => {
      masihAktif = false;
      window.clearTimeout(timer);
    };
  }, [memberId, level]);

  if (level === "TKB" && aktif?.memberId === memberId && Date.now() < aktif.uji.berakhir.getTime()) return aktif.uji;
}
