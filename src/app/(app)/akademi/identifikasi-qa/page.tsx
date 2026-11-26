"use client";

import { useEffect, useState } from "react";
import { useMe } from "@/lib/store";
import { useCloud } from "@/lib/supabase/family";

export default function IdentifikasiQaPage() {
  const me = useMe();
  const status = useCloud((s) => s.status);
  const id = status === "ready" && me.name === "Mecca" ? me.id : undefined;
  const [hasil, setHasil] = useState<{ id: string; sidik: string }>();

  useEffect(() => {
    if (!id) return;
    let masihAktif = true;
    const uuid = new TextEncoder().encode(id.toLowerCase());
    void crypto.subtle.digest("SHA-256", uuid).then((digest) => {
      if (!masihAktif) return;
      const sidik = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
      setHasil({ id, sidik });
    });
    return () => { masihAktif = false; };
  }, [id]);

  return (
    <section className="mx-auto w-full max-w-[560px] rounded-3xl bg-white p-5 text-[#0b2545]">
      <h1 className="text-xl font-extrabold">Identifikasi profil QA Navigator</h1>
      {id && hasil?.id === id ? (
        <output aria-label="Sidik QA profil aktif" className="mt-3 block break-all font-mono">{hasil.sidik}</output>
      ) : (
        <p className="mt-3 font-bold">Pilih profil tes Mecca untuk melihat sidik profil.</p>
      )}
    </section>
  );
}
