"use client";

// Latar layar masuk = Kampus RINOYA 3D yang sama dengan beranda (render scripts/kampus-render + KampusHidup:
// bendera berkibar, mobil, perahu, orang berjalan). Gambar memenuhi seluruh layar; bagian aman (semua gedung +
// gerbang) ditaruh utuh di ruang `ruang` — di HP = area di atas lembar isi, di tablet = seluruh layar.

import { useEffect, useState, type RefObject } from "react";
import { KampusHidup } from "@/components/kampus-hidup";
import { PETA_KAMPUS } from "@/components/kampus-peta.generated";
import { letakkanKampus, type LetakKampus } from "@/lib/kampus-letak";

/** `ruang`: beberapa calon ruang (mis. satu khusus HP, satu khusus tablet); yang terlihat (ukuran > 0) dipakai. */
export function LatarKampus({ ruang }: { ruang: readonly RefObject<HTMLElement | null>[] }) {
  const [letak, setLetak] = useState<LetakKampus | null>(null);

  useEffect(() => {
    const els = ruang.map((r) => r.current).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const ukur = () => {
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const l = letakkanKampus({ x: r.left, y: r.top, w: r.width, h: r.height });
        // Gambar harus menutup layar dari atas sampai bawah ruang (di HP sisanya tertutup lembar isi):
        // bila kurang, perbesar dari titik tengah ruang supaya gedung tetap di tengah.
        const [vw, vh] = [window.innerWidth, r.bottom];
        const [cx, cy] = [r.left + r.width / 2, r.top + r.height / 2];
        const s = Math.max(1, (cx - 0) / (cx - l.x), (vw - cx) / (l.x + l.w - cx), (cy - 0) / (cy - l.y), (vh - cy) / (l.y + l.h - cy));
        return setLetak({ ...l, x: cx - (cx - l.x) * s, y: cy - (cy - l.y) * s, w: l.w * s, h: l.h * s });
      }
    };
    ukur();
    const ro = new ResizeObserver(ukur);
    for (const el of els) ro.observe(el);
    window.addEventListener("resize", ukur);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", ukur);
    };
  }, [ruang]);

  const peta = letak && PETA_KAMPUS[letak.denah];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden bg-[#2f6b3a]">
      {letak && peta ? (
        <div className="absolute" style={{ left: letak.x, top: letak.y, width: letak.w, height: letak.h }}>
          {/* render statis sudah dikompres; next/image tidak menambah apa-apa */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={letak.denah} src={`/kampus/${letak.denah}.webp`} alt="" draggable={false} className="block h-full w-full max-w-none select-none" />
          <KampusHidup denah={letak.denah} k={letak.w / peta.w} />
        </div>
      ) : null}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(11,37,69,.45) 0%, rgba(11,37,69,0) 22%, rgba(11,37,69,0) 75%, rgba(11,37,69,.25) 100%)" }}
      />
    </div>
  );
}
