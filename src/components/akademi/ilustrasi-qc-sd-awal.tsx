export const ILUSTRASI_QC_SD_AWAL_IDS = [
  "qc-kain-pel",
  "qc-yoghurt",
  "qc-serigala-kutub",
];

export function IlustrasiQcSdAwal({ id }: { id: string }) {
  if (id === "qc-kain-pel") return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M20 37 91 21 114 63 41 82Z" fill="#278499" stroke="#196072" strokeWidth="3" />
      <path d="M17 31 89 15 109 55 38 74Z" fill="#77d0d4" stroke="#196072" strokeWidth="3" />
      <path d="m23 35 63-14 16 31-62 17Z" fill="none" stroke="#d7f6f4" strokeWidth="2" strokeDasharray="3 3" />
      <path d="m32 39 2 4m12-7 2 4m12-7 2 4m12-7 2 4m12-7 2 4m-50 17 2 4m12-7 2 4m12-7 2 4m12-7 2 4m12-7 2 4"
        fill="none" stroke="#418e98" strokeWidth="2" />
      <path d="m44 77 2 8m8-10 2 7m8-10 2 7m8-9 2 7m8-10 2 7m8-10 2 7m8-10 2 7"
        fill="none" stroke="#196072" strokeWidth="2.5" />
    </g>
  );
  if (id === "qc-yoghurt") return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M34 44 42 81Q63 95 86 82L97 44Z" fill="#d590cb" stroke="#713976" strokeWidth="3" />
      <path d="M39 60Q64 72 92 60L88 75Q64 86 43 74Z" fill="#9256aa" />
      <ellipse cx="65" cy="44" rx="33" ry="13" fill="#fff9ec" stroke="#713976" strokeWidth="3" />
      <path d="M46 44Q55 38 64 43T83 43" fill="none" stroke="#d9c9b5" strokeWidth="2" />
      <path d="M69 39 94 15Q99 10 102 14Q105 17 100 21L76 45Z" fill="#bccbd0" stroke="#526c78" strokeWidth="2.5" />
      <path d="M57 40Q63 36 72 39Q76 42 72 46Q63 52 55 47Q52 44 57 40Z" fill="#fffdf5" stroke="#9c8b7c" strokeWidth="2" />
    </g>
  );
  if (id === "qc-serigala-kutub") return (
    <g stroke="#537285" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M44 59Q24 63 10 80Q26 82 47 70" fill="#d9e8ee" />
      <path d="M42 67 35 84H47L57 66M83 67 81 84H91L97 61" fill="#c3d7df" />
      <path d="M39 48Q52 37 80 43L89 30 91 19 100 27 107 22 109 35 119 44 123 48 119 54 105 54 100 61 96 83H86L87 61Q73 70 53 65L47 83H36L40 67Q34 60 39 48Z"
        fill="#eff5f7" />
      <path d="M45 49Q63 41 80 46L88 39 91 43 87 48 92 51 85 55 80 52Q62 48 45 54Z" fill="#c3d7df" stroke="none" />
      <path d="m94 25 5 5m3 1 4-4m-6 22 6 3" fill="none" strokeWidth="1.75" />
      <circle cx="107" cy="41" r="2" fill="#173b50" stroke="none" />
      <path d="m119 44 6 4-4 4-4-3Z" fill="#173b50" stroke="none" />
    </g>
  );
  return null;
}
