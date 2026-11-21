"use client";

// Latar layar masuk: bersih dan lembut. Gradasi langit pucat, tiga bulatan warna brand yang diburamkan,
// pola titik tipis, dan beberapa kilau kecil. Tidak ada objek di area isi, jadi tidak ada yang tertimpa.

export function LatarMasuk() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#e3f2ff 0%,#f2f8ff 48%,#fff7ec 100%)" }} />
      <div className="absolute -top-[18%] -left-[22%] size-[70vmax] max-h-[720px] max-w-[720px] rounded-full bg-[#8fcbff] opacity-40 blur-[90px]" />
      <div className="absolute -right-[20%] -bottom-[16%] size-[64vmax] max-h-[680px] max-w-[680px] rounded-full bg-[#ffc27a] opacity-40 blur-[90px]" />
      <div className="absolute top-[42%] -left-[18%] size-[40vmax] max-h-[440px] max-w-[440px] rounded-full bg-[#ffb3d1] opacity-25 blur-[90px]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(11,37,69,.07) 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, #000 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, #000 100%)",
        }}
      />
      <Kilau className="top-[calc(env(safe-area-inset-top)+8%)] left-[9%] size-5 text-[#ffc83d]" />
      <Kilau className="top-[18%] right-[10%] size-4 text-[#4aa3ff]" />
      <Kilau className="bottom-[14%] left-[12%] size-4 text-[#ff8fb8]" />
      <Kilau className="right-[14%] bottom-[9%] size-6 text-[#ffb347]" />
    </div>
  );
}

function Kilau({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute opacity-80 ${className}`} fill="currentColor">
      <path d="M12 0c.8 6.4 4.8 10.6 12 12-7.2 1.4-11.2 5.6-12 12-.8-6.4-4.8-10.6-12-12C7.2 10.6 11.2 6.4 12 0z" />
    </svg>
  );
}
