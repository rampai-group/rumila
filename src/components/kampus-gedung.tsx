// Gedung Kampus RINOYA (SVG kode, tanpa gambar). Tiap gedung punya pelang nama yang menempel di bangunannya,
// jadi peta kampus tidak butuh papan melayang. Semua berdiri di garis tanah bawah viewBox.
// Ukuran viewBox: Gedung Utama 260×200, gedung biasa 200×170, Kantor & Pos 140×110 (lihat RASIO_GEDUNG).

import type { GedungId } from "@/lib/kampus";

type Props = { className?: string };

export const RASIO_GEDUNG = { utama: 200 / 260, biasa: 170 / 200, kecil: 110 / 140 } as const;

const BALOO = "var(--ff-baloo), system-ui, sans-serif";

/** Pelang: papan nama berbingkai yang menempel di fasad. */
function Pelang({ x, y, w, h, teks, bg, fg = "#ffffff", bingkai = "#ffffff", ukuran = 11 }: { x: number; y: number; w: number; h: number; teks: string; bg: string; fg?: string; bingkai?: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y + 1.5} width={w} height={h} rx="4" fill="#000" opacity=".12" />
      <rect x={x} y={y} width={w} height={h} rx="4" fill={bg} stroke={bingkai} strokeWidth="1.8" />
      <text x={x + w / 2} y={y + h / 2 + ukuran * 0.36} textAnchor="middle" fontFamily={BALOO} fontWeight="800" fontSize={ukuran} fill={fg} letterSpacing=".6">
        {teks}
      </text>
    </g>
  );
}

function Kaca({ x, y, w, h, r = 2 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#9fd3ff" />
      <path d={`M${x + w * 0.2} ${y + h} L${x + w * 0.75} ${y}`} stroke="#ffffff" strokeWidth={Math.max(2, w * 0.14)} opacity=".45" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke="#ffffff" strokeWidth="1.5" />
    </g>
  );
}

function Bayang({ cx, w, y }: { cx: number; w: number; y: number }) {
  return <ellipse cx={cx} cy={y} rx={w / 2} ry="4" fill="#000" opacity=".1" />;
}

/** Gedung Utama = Academy (Ruang Kelas): aula bertiang, menara jam, bendera Merah Putih, pelang GEDUNG UTAMA. */
export function GedungUtama({ className }: Props) {
  return (
    <svg viewBox="0 0 260 200" className={className} aria-hidden>
      <Bayang cx={130} w={250} y={197} />
      {/* bendera */}
      <rect x="129" y="2" width="2.5" height="30" rx="1" fill="#5b6b85" />
      <g className="kampus-bendera">
        <rect x="131.5" y="3" width="22" height="7" fill="#e8232f" />
        <rect x="131.5" y="10" width="22" height="7" fill="#ffffff" stroke="#f0e4d2" strokeWidth=".6" />
      </g>
      {/* menara jam */}
      <polygon points="104,52 130,30 156,52" fill="#0567c2" />
      <rect x="108" y="51" width="44" height="56" fill="#fff3df" />
      <rect x="108" y="51" width="44" height="5" fill="#f0dcbc" />
      <circle cx="130" cy="76" r="13" fill="#ffffff" stroke="#0b2545" strokeWidth="2.5" />
      <line x1="130" y1="76" x2="130" y2="67" stroke="#0b2545" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="130" y1="76" x2="137" y2="78" stroke="#fd861d" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="130" cy="76" r="1.8" fill="#0b2545" />
      {/* atap */}
      <polygon points="10,110 130,84 250,110" fill="#0786eb" />
      <polygon points="10,110 130,84 130,92 24,110" fill="#ffffff" opacity=".12" />
      {/* badan */}
      <rect x="18" y="110" width="224" height="80" fill="#fff3df" />
      {/* pelang di balok depan */}
      <rect x="10" y="108" width="240" height="24" rx="3" fill="#0567c2" />
      <text x="130" y="125" textAnchor="middle" fontFamily={BALOO} fontWeight="800" fontSize="14" fill="#ffffff" letterSpacing="2.4">
        GEDUNG UTAMA
      </text>
      {/* jendela */}
      {[30, 62, 176, 208].map((x) => (
        <g key={x}>
          <Kaca x={x} y={140} w={22} h={18} r={9} />
          <Kaca x={x} y={164} w={22} h={18} />
        </g>
      ))}
      {/* tiang */}
      {[22, 54, 86, 166, 198, 230].map((x) => (
        <rect key={x} x={x} y="132" width="8" height="58" rx="2" fill="#ffffff" stroke="#efe1c8" strokeWidth="1" />
      ))}
      {/* pintu utama + plakat */}
      <rect x="104" y="136" width="52" height="11" rx="3" fill="#ffffff" stroke="#e3c896" />
      <text x="130" y="144.5" textAnchor="middle" fontFamily={BALOO} fontWeight="800" fontSize="7.5" fill="#0567c2" letterSpacing="1.2">
        ACADEMY
      </text>
      <path d="M110 190 V162 a20 14 0 0 1 40 0 V190 Z" fill="#135385" />
      <line x1="130" y1="148" x2="130" y2="190" stroke="#0b2545" strokeWidth="1.5" />
      <circle cx="125" cy="172" r="1.8" fill="#fdb724" />
      <circle cx="135" cy="172" r="1.8" fill="#fdb724" />
      {/* tangga */}
      <rect x="100" y="190" width="60" height="4" fill="#efe1c8" />
      <rect x="92" y="194" width="76" height="4" fill="#e3d2b4" />
    </svg>
  );
}

/** Laboratorium 3D: gedung sains dua lantai dengan kubah observatorium di atap. */
function GedungLab({ className }: Props) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden>
      <Bayang cx={100} w={180} y={167} />
      <path d="M172 14 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#ffe46b" className="kampus-kelip" />
      <path d="M100 18 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5 Z" fill="#ffe46b" className="kampus-kelip kampus-kelip-2" />
      {/* kubah observatorium */}
      <rect x="134" y="20" width="8" height="30" rx="3" fill="#9a93ff" transform="rotate(35 138 50)" />
      <rect x="132" y="16" width="12" height="7" rx="3" fill="#5b4bff" transform="rotate(35 138 50)" />
      <path d="M112 56 A30 30 0 0 1 172 56 Z" fill="#2d2f86" />
      <path d="M120 56 A22 26 0 0 1 142 30 A30 30 0 0 0 116 56 Z" fill="#4a4fc0" opacity=".8" />
      <rect x="138" y="27" width="9" height="29" rx="2" fill="#16174f" />
      {/* badan */}
      <rect x="16" y="56" width="168" height="8" rx="2" fill="#2d2f86" />
      <rect x="22" y="64" width="156" height="104" fill="#eef1fb" />
      <rect x="22" y="64" width="10" height="104" fill="#dfe3f5" />
      <rect x="168" y="64" width="10" height="104" fill="#dfe3f5" />
      <Pelang x={34} y={70} w={132} h={20} teks="LABORATORIUM 3D" bg="#2d2f86" ukuran={11} />
      {/* lantai 2 */}
      {[38, 66, 112, 140].map((x) => (
        <Kaca key={x} x={x} y={98} w={22} h={20} />
      ))}
      <rect x="22" y="123" width="156" height="4" fill="#d4d9f0" />
      {/* lantai 1 */}
      {[38, 140].map((x) => (
        <Kaca key={x} x={x} y={134} w={22} h={22} />
      ))}
      {/* pintu kaca + kanopi */}
      <rect x="72" y="128" width="56" height="7" rx="2" fill="#2d2f86" />
      <rect x="80" y="135" width="40" height="33" fill="#7cc4f5" stroke="#2d2f86" strokeWidth="2" />
      <line x1="100" y1="135" x2="100" y2="168" stroke="#2d2f86" strokeWidth="2" />
      <path d="M86 140 L92 135" stroke="#ffffff" strokeWidth="3" opacity=".5" />
      {/* lambang atom */}
      <g transform="translate(100 108)" fill="none" stroke="#5b4bff" strokeWidth="1.6">
        <ellipse rx="9" ry="3.6" />
        <ellipse rx="9" ry="3.6" transform="rotate(60)" />
        <ellipse rx="9" ry="3.6" transform="rotate(-60)" />
        <circle r="1.8" fill="#5b4bff" />
      </g>
    </svg>
  );
}

/** Lab Komputer: gedung modern ungu, layar-layar menyala di jendela, parabola di atap. */
function GedungKomputer({ className }: Props) {
  const layar = ["#5eead4", "#fde68a", "#93c5fd", "#f9a8d4"];
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden>
      <Bayang cx={100} w={176} y={167} />
      {/* parabola & antena */}
      <rect x="146" y="20" width="3" height="22" fill="#6421c9" />
      <g className="kampus-lampu">
        <path d="M134 22 Q148 34 162 14 Z" fill="#c4b5fd" stroke="#6421c9" strokeWidth="2" />
      </g>
      <rect x="48" y="26" width="3" height="16" fill="#6421c9" />
      <circle cx="49.5" cy="25" r="3.5" fill="#22c55e" className="kampus-kelip" />
      {/* badan */}
      <rect x="18" y="40" width="164" height="9" rx="2" fill="#5b21b6" />
      <rect x="24" y="49" width="152" height="119" fill="#8b5cf6" />
      <rect x="24" y="49" width="152" height="119" fill="url(#kd-kaca-ungu)" opacity=".25" />
      <defs>
        <linearGradient id="kd-kaca-ungu" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Pelang x={36} y={55} w={128} h={20} teks="LAB KOMPUTER" bg="#ffffff" fg="#5b21b6" bingkai="#5b21b6" ukuran={12} />
      {/* jendela berisi monitor */}
      {[0, 1].map((baris) =>
        [36, 68, 108, 140].map((x, i) => (
          <g key={`${baris}-${x}`}>
            <rect x={x} y={84 + baris * 28} width="24" height="20" rx="2" fill="#1e1b4b" />
            <rect x={x + 3} y={87 + baris * 28} width="18" height="11" rx="1" fill={layar[(i + baris) % 4]} opacity=".9" />
            <rect x={x + 5} y={90 + baris * 28} width="9" height="1.6" fill="#1e1b4b" opacity=".5" />
            <rect x={x + 5} y={93.5 + baris * 28} width="12" height="1.6" fill="#1e1b4b" opacity=".5" />
          </g>
        )),
      )}
      {/* pintu */}
      <rect x="80" y="138" width="40" height="7" rx="2" fill="#5b21b6" />
      <rect x="84" y="145" width="32" height="23" fill="#c4b5fd" stroke="#5b21b6" strokeWidth="2" />
      <line x1="100" y1="145" x2="100" y2="168" stroke="#5b21b6" strokeWidth="2" />
      <text x="100" y="143" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="6.5" fill="#ffffff">
        {"</>"}
      </text>
    </svg>
  );
}

/** Taman Bermain: gapura berpelang di depan, perosotan & ayunan di belakang. */
function GedungTaman({ className }: Props) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden>
      <ellipse cx="100" cy="160" rx="96" ry="12" fill="#7cc95a" />
      {/* perosotan */}
      <rect x="22" y="72" width="5" height="88" fill="#1d6fd8" />
      <rect x="46" y="72" width="5" height="88" fill="#1d6fd8" />
      {[86, 102, 118, 134, 150].map((y) => (
        <rect key={y} x="22" y={y} width="29" height="4" fill="#1d6fd8" />
      ))}
      <rect x="18" y="66" width="38" height="8" rx="3" fill="#ef4444" />
      <path d="M51 74 C70 90 76 140 98 160 L88 162 C66 142 60 98 46 80 Z" fill="#fbbf24" />
      {/* ayunan */}
      <path d="M112 160 L128 64 L144 160 M156 160 L172 64 L188 160" stroke="#c2410c" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="124" y="60" width="52" height="7" rx="3" fill="#f97316" />
      <g className="kampus-ayun" style={{ transformOrigin: "150px 66px" }}>
        <line x1="142" y1="66" x2="142" y2="118" stroke="#475569" strokeWidth="1.6" />
        <line x1="158" y1="66" x2="158" y2="118" stroke="#475569" strokeWidth="1.6" />
        <rect x="138" y="117" width="24" height="5" rx="2" fill="#ef4444" />
      </g>
      {/* gapura berpelang */}
      <rect x="50" y="100" width="8" height="64" rx="2" fill="#fff3df" stroke="#e3c896" />
      <rect x="142" y="100" width="8" height="64" rx="2" fill="#fff3df" stroke="#e3c896" />
      <circle cx="54" cy="98" r="5" fill="#fd861d" />
      <circle cx="146" cy="98" r="5" fill="#fd861d" />
      <Pelang x={42} y={104} w={116} h={22} teks="TAMAN BERMAIN" bg="#fd861d" ukuran={11.5} />
      {/* bendera segitiga */}
      {[64, 80, 96, 112, 128].map((x, i) => (
        <polygon key={x} points={`${x},128 ${x + 10},128 ${x + 5},137`} fill={["#ef4444", "#fbbf24", "#22c55e", "#3b82f6", "#a855f7"][i]} />
      ))}
      <line x1="58" y1="128" x2="142" y2="128" stroke="#94a3b8" strokeWidth="1" />
    </svg>
  );
}

/** Mushola: kubah hijau, menara, pintu lengkung, dan pelang MUSHOLA di atas pintu. */
function GedungMusala({ className }: Props) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden>
      <Bayang cx={100} w={176} y={167} />
      {/* menara */}
      <rect x="160" y="44" width="16" height="124" fill="#fffaf0" stroke="#e7dcc6" />
      <rect x="157" y="70" width="22" height="6" rx="2" fill="#15803d" />
      <rect x="157" y="112" width="22" height="6" rx="2" fill="#15803d" />
      <path d="M164 92 v-6 a4 4 0 0 1 8 0 v6 Z" fill="#0f766e" />
      <polygon points="168,18 158,46 178,46" fill="#15803d" />
      <circle cx="168" cy="15" r="3" fill="#fbbf24" />
      {/* kubah */}
      <path d="M50 86 Q50 34 100 30 Q150 34 150 86 Z" fill="#16a34a" />
      <path d="M60 86 Q62 44 92 34 Q66 48 70 86 Z" fill="#4ade80" opacity=".55" />
      <rect x="98.5" y="16" width="3" height="16" fill="#ca8a04" />
      <path d="M106 14 a7 7 0 1 1 -6 -9 a5.5 5.5 0 1 0 6 9 Z" fill="#fbbf24" />
      {/* badan */}
      <rect x="22" y="84" width="140" height="9" rx="2" fill="#15803d" />
      <rect x="28" y="93" width="128" height="75" fill="#fffaf0" />
      <Pelang x={52} y={98} w={80} h={20} teks="MUSHOLA" bg="#15803d" bingkai="#fde68a" ukuran={12.5} />
      {/* jendela lengkung */}
      {[36, 130].map((x) => (
        <path key={x} d={`M${x} 150 V132 a9 9 0 0 1 18 0 V150 Z`} fill="#5eead4" stroke="#0f766e" strokeWidth="2" />
      ))}
      {/* pintu lengkung */}
      <path d="M78 168 V140 a14 14 0 0 1 28 0 V168 Z" fill="#0f766e" />
      <path d="M74 168 V139 a18 18 0 0 1 36 0 V168" fill="none" stroke="#15803d" strokeWidth="3" />
      <line x1="92" y1="126" x2="92" y2="168" stroke="#064e3b" strokeWidth="1.5" />
      {/* tangga */}
      <rect x="68" y="166" width="48" height="4" fill="#e7dcc6" />
    </svg>
  );
}

/** Kantor Guru (Rapor): kantor beratap genteng dengan pelang di fasad. */
export function KantorGuru({ className }: Props) {
  return (
    <svg viewBox="0 0 140 110" className={className} aria-hidden>
      <Bayang cx={70} w={124} y={107} />
      <polygon points="4,44 70,12 136,44" fill="#e0734f" />
      <rect x="2" y="42" width="136" height="7" rx="2" fill="#b9553a" />
      <rect x="12" y="49" width="116" height="59" fill="#fff4dc" />
      <Pelang x={24} y={54} w={92} h={18} teks="KANTOR GURU" bg="#b9553a" ukuran={10} />
      <Kaca x={20} y={78} w={24} h={18} />
      <Kaca x={96} y={78} w={24} h={18} />
      <rect x="56" y="78" width="28" height="30" rx="2" fill="#a5642f" />
      <circle cx="78" cy="94" r="1.8" fill="#fdb724" />
    </svg>
  );
}

/** Pos Satpam (Kartu Pelajar): pos jaga dengan pelang dan palang pintu. */
export function PosSatpam({ className }: Props) {
  return (
    <svg viewBox="0 0 140 110" className={className} aria-hidden>
      <Bayang cx={64} w={110} y={107} />
      <rect x="12" y="34" width="96" height="10" rx="3" fill="#0567c2" />
      <rect x="18" y="44" width="84" height="64" fill="#eef5fc" />
      <Pelang x={22} y={48} w={76} h={17} teks="POS SATPAM" bg="#ffffff" fg="#0567c2" bingkai="#0567c2" ukuran={9.5} />
      <Kaca x={26} y={70} w={40} h={20} />
      <rect x="72" y="70" width="22" height="38" rx="2" fill="#135385" />
      <rect x="18" y="94" width="50" height="5" fill="#0786eb" />
      {/* palang */}
      <rect x="112" y="76" width="6" height="32" rx="1" fill="#5b6b85" />
      <rect x="116" y="76" width="24" height="5" fill="#e8232f" />
      <rect x="124" y="76" width="6" height="5" fill="#ffffff" />
    </svg>
  );
}

export function IlustrasiGedung({ id, className }: { id: GedungId; className?: string }) {
  if (id === "lab") return <GedungLab className={className} />;
  if (id === "komputer") return <GedungKomputer className={className} />;
  if (id === "taman") return <GedungTaman className={className} />;
  return <GedungMusala className={className} />;
}
