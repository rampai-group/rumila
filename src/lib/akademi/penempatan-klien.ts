"use client";

// Tes Penempatan hanya untuk anak yang belum ditempatkan: wali memilih "Tes Penempatan" saat mendaftar (tanpa jenjang).
// Saat anak pertama masuk (Kampus atau Ruang Kelas) tes dibuka otomatis, sekali per sesi supaya "Nanti saja" tidak
// memantul balik. Setelah jenjang tercatat (dipilih wali, hasil tes, atau sudah belajar) tes tidak pernah muncul lagi.

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Member } from "@/lib/store";
import { cekPenempatan, type StatusPenempatan } from "./siswa";
import { useUjian } from "./ujian-klien";

const KUNCI_TUNDA = (id: string) => `rumila-penempatan-dibuka-${id}`;

function sudahDibukaSesiIni(id: string) {
  try {
    return sessionStorage.getItem(KUNCI_TUNDA(id)) === "1";
  } catch {
    return false;
  }
}

function tandaiDibuka(id: string) {
  try {
    sessionStorage.setItem(KUNCI_TUNDA(id), "1");
  } catch {}
}

/** true selama anak belum ditempatkan. `buka` = arahkan otomatis ke Tes Penempatan (sekali per sesi). */
export function usePerluPenempatan(me: Member, { buka }: { buka: boolean }) {
  const router = useRouter();
  const ujian = useUjian(me.id);
  const [status, setStatus] = useState<StatusPenempatan | null>(null);
  const anak = me.peran ? me.peran === "anak" : !me.admin;

  useEffect(() => {
    setStatus(null);
    if (!anak) return;
    let batal = false;
    void cekPenempatan(me.id).then((s) => !batal && setStatus(s));
    return () => {
      batal = true;
    };
  }, [me.id, anak]);

  // hasil tes yang masih menunggu dikirim ke server juga dihitung
  const selesaiLokal = ujian.some((h) => h.jenis === "penempatan" && (h.lulus || h.level === "PAUD"));
  const perlu = anak && status === "perlu" && !selesaiLokal;

  useEffect(() => {
    if (!perlu || !buka || sudahDibukaSesiIni(me.id)) return;
    tandaiDibuka(me.id);
    router.replace("/akademi/penempatan");
  }, [perlu, buka, me.id, router]);

  return perlu;
}
