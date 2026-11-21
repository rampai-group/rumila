"use client";

// Aplikasi web (PWA): daftar service worker, tawaran "Pasang aplikasi" (Android: prompt bawaan Chrome;
// iOS: panduan Bagikan → Tambah ke Layar Utama), dan tarik-untuk-memuat-ulang saat dibuka dari layar utama
// (mode aplikasi di Android & iOS tidak punya pull-to-refresh bawaan).

import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { Icon } from "@/components/ui";
import { modeApp } from "@/lib/mode-app";

const BALOO = "var(--ff-baloo), system-ui, sans-serif";
const INK = "#0b2545";

interface InstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PwaState {
  prompt: InstallPrompt | null;
  standalone: boolean;
  ios: boolean;
  iosHelp: boolean;
  /** Dibuka dari app toko (Android TWA / app iOS): sudah terpasang, jangan tawari pasang. */
  appToko: boolean;
}

export const usePwa = create<PwaState>(() => ({ prompt: null, standalone: false, ios: false, iosHelp: false, appToko: false }));

const isStandalone = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);

/** Bisa ditawari pemasangan (belum terpasang, dan Android punya prompt / perangkat iOS). Tidak pernah di app toko. */
export function useCanInstall() {
  const { prompt, standalone, ios, appToko } = usePwa();
  return !standalone && !appToko && (!!prompt || ios);
}

export async function installApp() {
  const { prompt, ios } = usePwa.getState();
  if (prompt) {
    await prompt.prompt();
    const { outcome } = await prompt.userChoice.catch(() => ({ outcome: "dismissed" as const }));
    usePwa.setState({ prompt: null, standalone: outcome === "accepted" || isStandalone() });
  } else if (ios) usePwa.setState({ iosHelp: true });
}

/** Dipasang sekali di root layout. */
export function PwaSetup() {
  const iosHelp = usePwa((s) => s.iosHelp);
  useEffect(() => {
    const ua = navigator.userAgent;
    // iPadOS 13+ mengaku "Macintosh"; bedakan lewat layar sentuh.
    const ios = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    // App iOS (WKWebView) tidak membawa token "Safari/" di user agent, beda dengan Safari & Chrome iOS.
    const webviewIos = ios && !/Safari\//.test(ua);
    usePwa.setState({ standalone: isStandalone(), ios, appToko: modeApp() || webviewIos });
    const onPrompt = (e: Event) => {
      e.preventDefault(); // simpan, tampilkan lewat tombol kita sendiri
      usePwa.setState({ prompt: e as InstallPrompt });
    };
    const onInstalled = () => usePwa.setState({ prompt: null, standalone: true });
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") navigator.serviceWorker.register("/sw.js").catch(() => {});
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  return iosHelp ? <IosHelp /> : null;
}

function IosHelp() {
  const close = () => usePwa.setState({ iosHelp: false });
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(11,37,69,.45)] p-4 sm:items-center" onClick={close}>
      <div className="w-full max-w-[420px] rounded-[28px] bg-white p-5" onClick={(e) => e.stopPropagation()} style={{ color: INK }}>
        <div className="flex items-center justify-between">
          <h2 style={{ fontFamily: BALOO, fontSize: 24, fontWeight: 800 }}>Pasang RINOYA Academy</h2>
          <button onClick={close} aria-label="Tutup" className="flex size-10 items-center justify-center rounded-xl bg-[#fff0da]">
            <Icon name="close" />
          </button>
        </div>
        <ol className="mt-3 flex flex-col gap-3 text-[16px] font-bold">
          <li className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f1ff] text-[#2f86ff]">
              <Icon name="ios_share" />
            </span>
            Ketuk tombol Bagikan di bilah browser.
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f1ff] text-[#2f86ff]">
              <Icon name="add_box" />
            </span>
            Pilih &ldquo;Tambah ke Layar Utama&rdquo;, lalu &ldquo;Tambah&rdquo;.
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff2d9] text-[#fd861d]">
              <Icon name="rocket_launch" />
            </span>
            Buka RINOYA Academy dari ikon di layar utama.
          </li>
        </ol>
        <p className="mt-3 text-[13px] font-semibold text-[#5b6b85]">Di Chrome iPad/iPhone, tombol Bagikan ada di kanan atas bilah alamat.</p>
      </div>
    </div>
  );
}

/** Tarik ke bawah dari puncak halaman untuk memuat ulang, di semua halaman. Hanya saat dibuka sebagai aplikasi
 *  (layar utama / app toko); di browser biasa sudah ada tarik-muat-ulang bawaan. Dipasang sekali di root layout. */
export function PullToRefresh() {
  const aktif = usePwa((s) => s.standalone || s.appToko);
  const [pull, setPull] = useState(0);
  const [loading, setLoading] = useState(false);
  const start = useRef<number | null>(null);
  const pullRef = useRef(0);
  const TRIGGER = 80;

  useEffect(() => {
    if (!aktif) return;
    const onStart = (e: TouchEvent) => {
      start.current = window.scrollY <= 0 && e.touches.length === 1 && bolehTarik(e.target) ? e.touches[0].clientY : null;
    };
    const onMove = (e: TouchEvent) => {
      if (start.current === null) return;
      const d = e.touches[0].clientY - start.current;
      if (d <= 0 || window.scrollY > 0) {
        pullRef.current = 0;
        setPull(0);
        return;
      }
      const eased = Math.min(130, d * 0.5); // makin jauh makin berat
      pullRef.current = eased;
      setPull(eased);
      if (e.cancelable) e.preventDefault(); // cegah pantulan bawaan saat menarik
    };
    const onEnd = () => {
      if (pullRef.current >= TRIGGER) {
        setLoading(true);
        setPull(TRIGGER);
        window.setTimeout(() => location.reload(), 150);
      } else setPull(0);
      pullRef.current = 0;
      start.current = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd, { passive: true });
    window.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [aktif]);

  if (!aktif || (pull === 0 && !loading)) return null;
  const ready = pull >= TRIGGER || loading;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center" style={{ transform: `translateY(${Math.max(0, pull - 44)}px)`, paddingTop: "env(safe-area-inset-top)" }}>
      <span
        className="mt-2 flex size-11 items-center justify-center rounded-full bg-white text-[#fd861d] shadow-[0_4px_14px_rgba(11,37,69,.2)]"
        style={{ transform: `rotate(${loading ? 0 : pull * 3}deg)`, opacity: Math.min(1, pull / 40 + (loading ? 1 : 0)) }}
      >
        <Icon name={ready ? "refresh" : "arrow_downward"} size={26} className={loading ? "animate-spin" : ""} />
      </span>
    </div>
  );
}

/** Tarik-muat-ulang hanya bila sentuhan tidak di dalam permainan/kanvas, dan tak ada wadah gulir di atasnya yang
 *  sedang tidak di puncak (mis. daftar panjang di modal atau layar penuh yang bergulir sendiri). */
function bolehTarik(t: EventTarget | null): boolean {
  let el = t instanceof Element ? t : null;
  if (el?.closest("canvas, [data-tanpa-tarik]")) return false;
  while (el && el !== document.body) {
    if (el.scrollTop > 0) return false;
    el = el.parentElement;
  }
  return true;
}
