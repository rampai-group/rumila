"use client";

// Satu latar bergradasi menghindari sambungan warna dari komposit lapisan blur di WebKit iPad.
const GRADASI = [
  "radial-gradient(ellipse 52% 56% at 3% 72%, #ffb3d14d 0%, #ffb3d13b 32%, #ffb3d116 68%, #ffb3d105 90%, #ffb3d100 100%)",
  "radial-gradient(ellipse 66% 76% at 94% 82%, #ffc27a6b 0%, #ffc27a57 32%, #ffc27a21 68%, #ffc27a08 90%, #ffc27a00 100%)",
  "radial-gradient(ellipse 67% 71% at 10% 24%, #8fcbff77 0%, #8fcbff60 32%, #8fcbff27 68%, #8fcbff09 90%, #8fcbff00 100%)",
  "linear-gradient(180deg, #e3f2ff, #f2f8ff 48%, #fff7ec)",
].join(", ");

export function LatarMasuk() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ background: GRADASI }}>
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
