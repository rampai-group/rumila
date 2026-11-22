/** Block-letter geometry for folding exercises. Fixed advances also preserve word symmetry. */
export const HURUF_SIMETRI_PATH: Record<string, string> = {
  A: "M0 80L30 0 60 80M15 40H45",
  B: "M0 0V80H30C70 80 70 40 30 40H0M30 40C70 40 70 0 30 0H0",
  C: "M54 10C42-3 0-3 0 40C0 83 42 83 54 70",
  D: "M0 0V80H20C75 80 75 0 20 0Z",
  E: "M60 0H0V80H60M0 40H45",
  F: "M60 0H0V80M0 36H44",
  G: "M54 10C42-3 0-3 0 40C0 83 42 83 54 70V43H32",
  H: "M0 0V80M60 0V80M0 40H60",
  I: "M10 0H50M30 0V80M10 80H50",
  J: "M10 0H60M50 0V58C50 88 0 88 0 58",
  K: "M0 0V80M60 0L0 40 60 80",
  L: "M0 0V80H60",
  M: "M0 80V0L30 40 60 0V80",
  N: "M0 80V0L60 80V0",
  O: "M30 0C70 0 70 80 30 80C-10 80-10 0 30 0Z",
  P: "M0 80V0H30C70 0 70 40 30 40H0",
  Q: "M30 0C70 0 70 80 30 80C-10 80-10 0 30 0ZM38 56L66 84",
  R: "M0 80V0H30C70 0 70 40 30 40H0M30 40L60 80",
  S: "M57 10C40-10 0 0 0 20C0 40 60 40 60 60C60 80 20 90 3 70",
  T: "M0 0H60M30 0V80",
  U: "M0 0V50C0 90 60 90 60 50V0",
  V: "M0 0L30 80 60 0",
  W: "M0 0L15 80 30 40 45 80 60 0",
  X: "M0 0L60 80M60 0L0 80",
  Y: "M0 0L30 40 60 0M30 40V80",
  Z: "M0 0H60L0 80H60",
};

export function HurufSimetri({ kata }: { kata: string }) {
  const lebar = kata.length * 60 + (kata.length - 1) * 16;
  const skala = Math.min(1, 110 / lebar);
  return <g transform={`translate(${(130 - lebar * skala) / 2} ${(100 - 80 * skala) / 2}) scale(${skala})`} fill="none" stroke="#16364b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
    {[...kata].map((huruf, i) => <path key={i} d={HURUF_SIMETRI_PATH[huruf]} transform={`translate(${i * 76} 0)`} />)}
  </g>;
}
