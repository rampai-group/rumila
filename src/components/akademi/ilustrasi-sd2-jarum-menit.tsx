const angkaJam = Array.from({ length: 12 }, (_, i) => i + 1);

function titik(angka: number, jari: number) {
  const sudut = (angka * 30 - 90) * Math.PI / 180;
  return { x: 65 + jari * Math.cos(sudut), y: 50 + jari * Math.sin(sudut) };
}

function MukaJam({ jarum }: { jarum?: number }) {
  return (
    <g aria-hidden>
      <circle cx="65" cy="50" r="46" fill="#fff" stroke="#526bba" strokeWidth="3.5" />
      {angkaJam.map((angka) => {
        const label = titik(angka, 32);
        const awal = titik(angka, 39);
        const akhir = titik(angka, 42);
        return <g key={angka}>
          <line x1={awal.x} y1={awal.y} x2={akhir.x} y2={akhir.y} stroke="#627096" strokeWidth="1.6" strokeLinecap="round" />
          <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="central" fill="#233956" fontFamily="sans-serif" fontSize="10" fontWeight="800">{angka}</text>
        </g>;
      })}
      {jarum !== undefined && <path d="M65 57V26" transform={`rotate(${jarum * 30} 65 50)`} stroke="#ea5437" strokeWidth="4" strokeLinecap="round" />}
      <circle cx="65" cy="50" r="3" fill="#233956" />
    </g>
  );
}

export const ILUSTRASI_JARUM_MENIT_SD2 = {
  "jam-menit-tanpa-jarum": <MukaJam />,
  ...Object.fromEntries(angkaJam.slice(0, 11).map((angka) => [`jam-menit-ke-${angka}`, <MukaJam key={angka} jarum={angka} />])),
};
