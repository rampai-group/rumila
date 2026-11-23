"use client";

// Kampus yang hidup: bendera berkibar, mobil di jalan raya, perahu di laut, dan orang berjalan ke gedung.
// Semua sprite dirender dengan kamera yang sama dengan gambar latar (scripts/kampus-render), jadi tinggal digeser.
// Posisi dihitung dari waktu saja (tanpa state), supaya ringan dan tidak pernah tabrakan di lajur yang sama.
// Penutup = potongan piksel latar (gerbang, pagar, air mancur, gedung) yang ditaruh di atas orang yang lewat di belakangnya.

import { useEffect, useRef } from "react";
import { PETA_KAMPUS } from "@/components/kampus-peta.generated";
import type { Denah } from "@/lib/kampus-letak";

type Peta = (typeof PETA_KAMPUS)[Denah];
type Hidup = Peta["hidup"];
type Potong = { x: number; y: number; w: number; h: number; ax: number; ay: number };
type Arah = "depan" | "belakang" | "samping";

const LANGKAH = 4;
const KIBAR = 8;
/** urutan tumpuk menurut kedalaman dunia (z makin besar = makin dekat kamera) */
const tumpuk = (z: number) => Math.round(z * 10) + 5000;

/** Orang ke-j: anak-anak ke semua gedung; guru (terakhir) ke Kantor Guru dan Gedung Utama. */
function jadwal(h: Hidup, j: number, guru: boolean) {
  const rute = h.rute
    .map((r, i) => ({ ...r, i }))
    .filter((r) => (guru ? r.ke === "kantor" || r.ke === "utama" : r.ke !== "kantor") && (r.i + j) % 2 === 0);
  const kecepatan = guru ? 1.9 : 1.7 + (j % 3) * 0.18;
  const bagian = rute.map((r) => {
    const pjg: number[] = [0];
    for (let i = 1; i < r.titik.length; i++) pjg.push(pjg[i - 1] + Math.hypot(r.titik[i][0] - r.titik[i - 1][0], r.titik[i][1] - r.titik[i - 1][1]));
    const jalan = pjg.at(-1)! / kecepatan;
    return { titik: r.titik, pjg, jalan, dalam: 7 + ((j * 5 + r.i * 3) % 9), luar: 3 + ((j * 7 + r.i) % 6) };
  });
  const siklus = bagian.reduce((a, b) => a + b.jalan * 2 + b.dalam + b.luar, 0);
  return { bagian, siklus, mulai: (j * 23.7) % Math.max(1, siklus) };
}

/** Titik pada rute setelah berjalan `d` satuan: posisi layar, skala, z, arah hadap, dan jarak ke ujung. */
function titikDi(b: ReturnType<typeof jadwal>["bagian"][number], d: number, balik: boolean) {
  const total = b.pjg.at(-1)!;
  const s = balik ? total - d : d;
  let i = 1;
  while (i < b.pjg.length - 1 && b.pjg[i] < s) i++;
  const [a, c] = [b.titik[i - 1], b.titik[i]];
  const seg = b.pjg[i] - b.pjg[i - 1] || 1;
  const u = Math.min(1, Math.max(0, (s - b.pjg[i - 1]) / seg));
  const lerp = (k: number) => a[k] + (c[k] - a[k]) * u;
  let [dx, dz] = [c[0] - a[0], c[1] - a[1]];
  if (balik) [dx, dz] = [-dx, -dz];
  const arah: Arah = Math.abs(dz) >= Math.abs(dx) ? (dz > 0 ? "depan" : "belakang") : "samping";
  return { fx: lerp(2), fy: lerp(3), skala: lerp(4), z: lerp(1), arah, cermin: arah === "samping" && dx < 0, tepi: Math.min(d, total - d) };
}

export function KampusHidup({ denah, k }: { denah: Denah; k: number }) {
  const peta = PETA_KAMPUS[denah];
  const h = peta.hidup;
  const akar = useRef<HTMLDivElement>(null);
  const lembar = `url(/kampus/hidup-${denah}.webp)`;
  const ukuranLembar = `${h.lembar[0] * k}px ${h.lembar[1] * k}px`;
  const bingkai = h.bingkai as Record<string, number[]>;
  const latar = (nama: string) => {
    const b = bingkai[nama];
    return b ? `${-b[0] * k}px ${-b[1] * k}px` : "0 0";
  };
  const jumlahOrang = Object.keys(h.orang).length;

  useEffect(() => {
    const el = akar.current;
    if (!el) return;
    const diam = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anak = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
    const bendera = el.querySelector<HTMLElement>("[data-bendera]");
    const mobil = anak("[data-mobil]");
    const perahu = anak("[data-perahu]");
    const orang = anak("[data-orang]");
    const [W] = [peta.w];
    const jadwalOrang = Array.from({ length: jumlahOrang }, (_, j) => jadwal(h, j, j === jumlahOrang - 1));

    /** lajur: x dunia dari tepi kiri sampai kanan gambar (plus lebar benda), diulang dengan jeda */
    const lajur = (m: Potong & { fx: number; dx: number }) => {
      const a = (0 - m.fx) / m.dx - (m.w / W) / Math.abs(m.dx);
      const b = (1 - m.fx) / m.dx + (m.w / W) / Math.abs(m.dx);
      return [Math.min(a, b), Math.max(a, b)];
    };
    const taruh = (e: HTMLElement, m: Potong & { fx: number; fy: number; dx: number }, x: number, cermin = false) => {
      const px = (m.fx + m.dx * x) * W * k - m.ax * k;
      const py = m.fy * peta.h * k - m.ay * k;
      e.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0)${cermin ? " scaleX(-1)" : ""}`;
    };

    let akhir = 0;
    let id = 0;
    const gambar = (ms: number) => {
      const t = ms / 1000;
      if (bendera) bendera.style.backgroundPosition = latar(`bendera.${Math.floor(t * 9) % KIBAR}`);

      // mobil: tiap lajur berkecepatan tetap dan berjarak tetap, jadi tidak pernah saling tabrak
      for (const arah of [1, -1]) {
        const di = h.mobil.map((m, i) => ({ m, i })).filter((x) => x.m.arah === arah);
        di.forEach(({ m, i }, n) => {
          const [a, b] = lajur(m);
          const jeda = 70;
          const putaran = b - a + jeda;
          const laju = arah > 0 ? 8.5 : 10;
          const s = (t * laju + (n * putaran) / di.length + i * 9) % putaran;
          const x = arah > 0 ? a + s : b - s;
          const e = mobil[i];
          e.style.visibility = s > b - a ? "hidden" : "visible";
          taruh(e, m, x);
        });
      }
      h.perahu.forEach((m, i) => {
        const [a, b] = lajur(m);
        const putaran = b - a + 30;
        const s = (t * (0.9 + (i % 3) * 0.25) + (m.xAwal - a) + putaran * 4) % putaran;
        taruh(perahu[i], m, a + s);
      });

      jadwalOrang.forEach((J, j) => {
        const e = orang[j];
        let w = (t + J.mulai) % J.siklus;
        let hasil: ReturnType<typeof titikDi> | null = null;
        for (const b of J.bagian) {
          const tempuh = b.jalan * (b.titik.length ? 1 : 0);
          if (w < tempuh) {
            hasil = titikDi(b, (w / tempuh) * b.pjg.at(-1)!, false);
            break;
          }
          w -= tempuh + b.dalam;
          if (w < 0) break;
          if (w < tempuh) {
            hasil = titikDi(b, (w / tempuh) * b.pjg.at(-1)!, true);
            break;
          }
          w -= tempuh + b.luar;
          if (w < 0) break;
        }
        if (!hasil) {
          e.style.opacity = "0";
          return;
        }
        const o = h.orang[String(j) as keyof typeof h.orang] as Record<Arah, Potong>;
        const p = o[hasil.arah];
        const langkah = Math.floor(((t + j) * 1000) / 190) % LANGKAH;
        e.style.width = `${p.w * k}px`;
        e.style.height = `${p.h * k}px`;
        e.style.transformOrigin = `${p.ax * k}px ${p.ay * k}px`;
        e.style.backgroundPosition = latar(`orang${j}-${hasil.arah}.${langkah}`);
        const px = hasil.fx * W * k - p.ax * k;
        const py = hasil.fy * peta.h * k - p.ay * k;
        e.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) scale(${hasil.cermin ? -hasil.skala : hasil.skala},${hasil.skala})`;
        e.style.zIndex = String(tumpuk(hasil.z));
        e.style.opacity = String(Math.min(1, hasil.tepi / 0.8));
      });
    };

    if (diam) {
      gambar(12_000);
      for (const e of orang) e.style.opacity = "0";
      return;
    }
    const putar = (ms: number) => {
      // 30 fps cukup untuk benda kecil; hemat baterai
      if (ms - akhir > 32) {
        akhir = ms;
        gambar(ms);
      }
      id = requestAnimationFrame(putar);
    };
    id = requestAnimationFrame(putar);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [denah, k]);

  const sprite = (b: Potong, nama: string): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    top: 0,
    width: b.w * k,
    height: b.h * k,
    backgroundImage: lembar,
    backgroundSize: ukuranLembar,
    backgroundPosition: latar(nama),
    backgroundRepeat: "no-repeat",
    willChange: "transform",
  });
  const diam = (b: { x: number; y: number }): React.CSSProperties => ({ transform: `translate3d(${b.x * k}px,${b.y * k}px,0)`, willChange: "auto" });

  return (
    <div ref={akar} aria-hidden className="pointer-events-none absolute inset-0 isolate overflow-hidden">
      {h.perahu.map((m, i) => (
        <span key={`p${i}`} data-perahu style={{ ...sprite(m, `perahu${i}`), zIndex: tumpuk(m.z) }} />
      ))}
      {h.bendera && <span data-bendera style={{ ...sprite(h.bendera, "bendera.0"), ...diam(h.bendera), zIndex: tumpuk(-999) }} />}
      {h.penutup.map((p) => (
        <span key={p.nama} style={{ ...sprite({ ...p, ax: 0, ay: 0 }, `tutup-${p.nama}`), ...diam(p), zIndex: tumpuk(p.z) }} />
      ))}
      {Array.from({ length: jumlahOrang }, (_, j) => (
        <span key={`o${j}`} data-orang style={{ ...sprite({ x: 0, y: 0, w: 0, h: 0, ax: 0, ay: 0 }, ""), backgroundPosition: undefined, opacity: 0 }} />
      ))}
      {h.mobil.map((m, i) => (
        <span key={`m${i}`} data-mobil style={{ ...sprite(m, `mobil${i}`), zIndex: tumpuk(m.z), visibility: "hidden" }} />
      ))}
    </div>
  );
}
