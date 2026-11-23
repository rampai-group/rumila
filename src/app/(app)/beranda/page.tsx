"use client";

import { KampusDunia } from "@/components/kampus-dunia";
import { useMe } from "@/lib/store";

/** Beranda = Kampus RINOYA satu layar; ketuk gedung untuk masuk (Gedung Utama = Academy). */
export default function Beranda() {
  const me = useMe();
  return <KampusDunia me={me} />;
}
