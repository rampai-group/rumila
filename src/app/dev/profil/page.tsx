"use client";

// Pratinjau KHUSUS DEVELOPMENT: layar pilih profil, PIN pad, tab Anggota, dan pemilih avatar dengan data demo.
// Halaman ini dipakai untuk screenshot toko: JANGAN isi nama, foto, atau data orang sungguhan.
// ?p=pilih | kosong | kampus | pin | gambar | anggota | avatar. (kampus = persis layar /masuk dengan latarnya) Di produksi halaman ini 404.

import { notFound, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PilihAvatar } from "@/components/avatar-karakter";
import { AnggotaRumah } from "@/components/ortu/anggota";
import { MasukPin } from "@/components/pin-pad";
import { SheetHost } from "@/components/sheets";
import { PilihProfil } from "@/app/masuk/pilih-profil";
import { LatarMasuk } from "@/app/masuk/latar-masuk";
import type { Member } from "@/lib/store";

const DEMO: Member[] = [
  { id: "d-anak-2", name: "Anak Contoh 2", c: "orange", admin: false, perms: [], pin: "1234", avatar: "k1-r1-w0-a0", peran: "anak", jenisPin: "angka" },
  { id: "d-anak-1", name: "Anak Contoh 1", c: "pink", admin: false, perms: [], pin: "1234", avatar: "k1-r4-w0-a0", peran: "anak", jenisPin: "gambar" },
  { id: "d-raka", name: "Raka", c: "teal", admin: false, perms: [], avatar: "k3-r6-w0-a1", peran: "anak" },
  { id: "d-ayah", name: "Ayah", c: "indigo", admin: true, perms: [], pin: "1234", avatar: "k2-r5-w0-a0", peran: "dewasa" },
  { id: "d-ibu", name: "Ibu", c: "blue", admin: false, perms: [], pin: "1234", avatar: "k1-r4-w2-a0", peran: "dewasa" },
];

function Preview() {
  const p = useSearchParams().get("p") ?? "pilih";
  if (p === "kampus")
    return (
      <div
        className="fixed inset-0 z-30 flex overflow-y-auto bg-[#eef6ff] px-5"
        style={{ fontFamily: "var(--ff-nunito)", paddingTop: "calc(env(safe-area-inset-top) + 20px)", paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
      >
        <LatarMasuk />
        <div className="relative m-auto flex w-full justify-center">
          <PilihProfil
            members={[
              { ...DEMO[1], pin: undefined },
              DEMO[0],
              DEMO[3],
            ]}
            onMasuk={() => {}}
          />
        </div>
      </div>
    );
  return (
    <div className="bg-dots flex min-h-dvh items-center justify-center p-6" style={{ fontFamily: "var(--ff-nunito)" }}>
      {p === "pilih" && <PilihProfil members={DEMO} onMasuk={() => {}} />}
      {p === "kosong" && <PilihProfil members={[DEMO[3]]} onMasuk={() => {}} />}
      {p === "pin" && <MasukPin m={DEMO[0]} judul="Halo Anak Contoh 2, ketik PIN-mu" onBenar={() => {}} />}
      {p === "gambar" && <MasukPin m={DEMO[1]} judul="Halo Anak Contoh 1, ketuk gambar rahasiamu" onBenar={() => {}} />}
      {p === "avatar" && (
        <div className="w-full max-w-[440px]">
          <PilihAvatar awal="k1-r4-w0-a0" c="pink" onSimpan={() => {}} />
        </div>
      )}
      {p === "anggota" && (
        <div className="w-full max-w-[900px]">
          <AnggotaRumah />
        </div>
      )}
      <SheetHost />
    </div>
  );
}

export default function DevProfil() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <Suspense>
      <Preview />
    </Suspense>
  );
}
