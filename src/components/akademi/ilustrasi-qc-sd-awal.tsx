export const ILUSTRASI_QC_SD_AWAL_IDS = [
  "qc-kain-pel",
  "qc-yoghurt",
  "qc-serigala-kutub",
  "qc-ayakan-kasar",
  "qc-kain-saring-halus",
  "qc-gelas-ukur",
  "qc-pasir-halus-batu-kecil",
  "qc-bahan-pasir",
  "qc-bahan-semen",
  "qc-bahan-wol",
  "qc-bahan-kapas",
  "qc-bahan-bambu",
  "qc-bahan-tanah-liat",
  "qc-bahan-aluminium-foil",
  "qc-kelereng-bertabrakan",
  "qc-kelereng-kedua-menggelinding",
  "qc-adonan-roti",
  "qc-biji-kedelai",
  "qc-abu-kayu",
  "qc-abu-kertas",
];

function Abu({ kertas }: { kertas: boolean }) {
  return <g strokeLinecap="round" strokeLinejoin="round">
    {kertas
      ? <path d="M32 57L39 21L85 25L98 35L89 45L94 63L72 69Z" fill="#b7ada1" stroke="#605852" strokeWidth="3" />
      : <path d="M24 64L27 45L39 38L96 43L107 55L102 72L46 75Z" fill="#625652" stroke="#493d3c" strokeWidth="3" />}
    <path d="M20 78Q29 67 52 58Q64 52 76 59Q97 62 113 75Q121 83 108 87H29Q14 87 20 78Z" fill="#c4c5c4" stroke="#737a7d" strokeWidth="3" />
    <path d="M31 78L38 75M45 73L52 71M62 64L68 65M69 77L74 76M88 76L96 79M99 83L103 82M53 83L58 82" fill="none" stroke="#e9e7e1" strokeWidth="2.8" />
    <path d="M14 88H15M41 89H43M115 89H117M106 63H108" fill="none" stroke="#83898a" strokeWidth="2.8" />
  </g>;
}

function KelerengGerak({ setelah }: { setelah: boolean }) {
  const xPertama = setelah ? 44 : 49;
  const xKedua = setelah ? 93 : 85;
  return <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 76H123" stroke="#b0c8c9" strokeWidth="2" />
    <ellipse cx={xPertama} cy="72" rx="17" ry="4" fill="#c8e1e1" />
    <ellipse cx={xKedua} cy="72" rx="17" ry="4" fill="#c8e1e1" />
    <g transform={`translate(${xPertama} 54)`}>
      <circle r="18" fill="#a8deea" stroke="#356878" strokeWidth="2.6" />
      <path d="M-10 8Q5 11 9-12" fill="none" stroke="#388aba" strokeWidth="3.5" />
      <path d="M-11-5Q-10-11-4-12" fill="none" stroke="#eafaff" strokeWidth="2.9" />
    </g>
    <g transform={`translate(${xKedua} 54)`}>
      <circle r="18" fill="#aceaaf" stroke="#397963" strokeWidth="2.6" />
      <path d="M-10 8Q5 11 9-12" fill="none" stroke="#399777" strokeWidth="3.5" />
      <path d="M-11-5Q-10-11-4-12" fill="none" stroke="#effff4" strokeWidth="2.9" />
    </g>
    {setelah
      ? <path d="M83 26H118M112 20L118 26L112 32M67 48H73M63 56H72" fill="none" stroke="#397963" strokeWidth="3.6" />
      : <>
        <path d="M8 26H41M35 20L41 26L35 32M11 48H25M15 56H24" fill="none" stroke="#356878" strokeWidth="3.6" />
        <path d="M63 39L60 34M70 38L74 33M67 34V28" fill="none" stroke="#ad692b" strokeWidth="2.8" />
      </>}
  </g>;
}

export function IlustrasiQcSdAwal({ id }: { id: string }) {
  if (id === "qc-abu-kayu" || id === "qc-abu-kertas") return <Abu kertas={id === "qc-abu-kertas"} />;
  if (id === "qc-adonan-roti") return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 63L44 49L117 59L104 80L58 91L14 82Z" fill="#b88b60" stroke="#8b674a" strokeWidth="3" />
      <path d="M11 63L44 48L117 59L103 72L60 84L14 74Z" fill="#d7ab78" stroke="#8b674a" strokeWidth="3" />
      <path d="M29 65C27 48 35 34 47 28Q66 19 83 33Q97 42 98 56Q99 70 83 73Q65 79 45 75Q32 73 29 65Z" fill="#f4e4be" stroke="#ae8b62" strokeWidth="3" />
      <path d="M37 52Q43 39 54 39Q65 39 63 48M64 34Q73 35 76 43M78 48Q84 51 84 57M39 62Q48 66 60 66M100 65L106 62M21 66L25 68M74 78L82 76" fill="none" stroke="#fff4d9" strokeWidth="3" />
    </g>
  );
  if (id === "qc-biji-kedelai") return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="65" cy="78" rx="48" ry="10" fill="#f0dfba" />
      {[[32, 60], [50, 67], [76, 64], [95, 59], [43, 43], [62, 43], [84, 42], [68, 25]].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${(x + y) % 68 - 34})`}>
          <ellipse rx="12" ry="9" fill="#ecd29b" stroke="#9a754c" strokeWidth="2.4" />
          <path d="M2-1L8-2" stroke="#805d43" strokeWidth="2.6" />
          <path d="M-7-2Q-5-5-1-5" fill="none" stroke="#fff3d0" strokeWidth="2.2" />
        </g>
      ))}
    </g>
  );
  if (id === "qc-bahan-pasir") return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M13 78q12-8 24-16 8-5 16-14 7-7 14-7 8 2 17 10l35 24q7 8-7 11H28q-14 0-15-8Z" fill="#edc37c" stroke="#ac7841" strokeWidth="3" />
      <path d="M25 79l21-10m-6 12 15-5m1-22 8-6m-3 15 14-2m-8 16 17 2m6-15 13 7m-3 8 11 2" fill="none" stroke="#9e6c3c" strokeWidth="2" strokeDasharray="1 4" />
    </g>
  );
  if (id === "qc-bahan-semen") return (
    <g stroke="#665b4c" strokeWidth="3" strokeLinejoin="round">
      <path d="M30 24q24 7 55 2l9 44-7 17H33l-8-11Z" fill="#dfbb80" />
      <path d="M29 24q22-16 55 1-16 14-52 4Z" fill="#aaa39a" />
      <path d="M43 42H72L77 66H40Z" fill="#a6a8a4" />
      <path d="M44 54l28 1m-22-12 1 11m13 1 1 10" fill="none" stroke="#727875" strokeWidth="2" />
      <path d="M60 87q12-5 20-14 6-7 14-3l26 17Z" fill="#adb0ad" stroke="#686965" />
      <path d="m84 79 12 1m4 4 9 1" fill="none" stroke="#6a6c66" strokeWidth="2" />
    </g>
  );
  if (id === "qc-bahan-wol") return (
    <g stroke="#8e6e4c" strokeLinejoin="round" strokeLinecap="round">
      <path d="M16 67q-2-16 13-19-1-12 14-15 9-13 22-6 15-4 23 9 16-2 20 12 13 2 11 15 6 15-12 20-13 7-24 2-15 6-32 0-17 4-28-4-8-2-7-14Z" fill="#ead3ae" strokeWidth="3" />
      <path d="M27 65q7-14 15-5 4 11-4 12-6 0-5-5m16-20q2-14 14-9 11 5 6 12-6 6-10-1m17 19q3-14 14-12 10 1 7 11-4 7-11 3m12-26q8 1 9 8M48 76q8-9 18-5m37 6q6-2 8-7" fill="none" strokeWidth="2.5" />
    </g>
  );
  if (id === "qc-bahan-kapas") return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M60 89l-4-56m4 37-24-17m23 12 35-17" stroke="#735745" fill="none" strokeWidth="5" />
      <path d="M60 83q9-16 30-13-7 15-30 13Zm-2-9q-18 0-26-10 16-7 26 10Z" fill="#78ac56" stroke="#527946" strokeWidth="2" />
      <path d="M48 40q-10-4-8-15 0-7 9-9 4-10 14-6 9 4 9 10 10 6 4 14-6 9-20 9Z M24 64q-10-3-9-13 2-8 11-8 6-9 15-4 11 6 7 14-3 12-24 11Z M82 57q-5-5-5-11 2-9 11-10 1-8 12-7 9 1 12 12 9 2 5 12-5 11-35 4Z" fill="#fff8ef" stroke="#89765c" strokeWidth="2.7" />
      <path d="m48 38 9 7 11-7M22 60l10 6 10-7m42-6 11 9 12-7" fill="none" stroke="#906444" strokeWidth="3" />
    </g>
  );
  if (id === "qc-bahan-bambu") return (
    <g stroke="#4c7150" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M21 76 70 15l14 9-50 62Z" fill="#9cc86b" />
      <path d="m45 50 13 8m-31 9 12 10m20-46 13 9" fill="none" />
      <path d="M48 83 99 26l13 10-54 56Z" fill="#7bb45c" />
      <path d="m73 55 12 9m-25 5 11 9M89 38l12 10" fill="none" />
      <path d="M76 32q7-17 27-18-6 14-27 18Zm1 2q21-3 27 11-16 0-27-11Z" fill="#6cab55" />
      <ellipse cx="77" cy="20" rx="8" ry="4" transform="rotate(34 77 20)" fill="#e5ebae" />
      <ellipse cx="105" cy="31" rx="8" ry="4" transform="rotate(36 105 31)" fill="#dce8a0" />
    </g>
  );
  if (id === "qc-bahan-tanah-liat") return (
    <g stroke="#7d4b3d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 69q9-9 10-24l12-13 26-7 23 6 21 22-1 18-20 13-48-2Z" fill="#b27661" />
      <path d="m32 47 19-9 17 4 20-4 15 13M40 69l19-9 14 7 22-10" fill="none" stroke="#d69a7f" />
      <path d="m16 79 17-5 9 8-8 8-22-3Zm83-4 16-1 7 10-10 6-15-4Z" fill="#c28870" />
    </g>
  );
  if (id === "qc-bahan-aluminium-foil") return (
    <g stroke="#697782" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M22 62l49-21 50 28-46 20Z" fill="#cbd7e0" />
      <path d="m36 65 43-16 17 8-43 16Zm24 14 43-18 12 7-44 17Z" fill="#f6fafd" stroke="none" />
      <path d="M22 44 89 19q11-3 17 5t-2 18L35 69Z" fill="#b5c5d1" />
      <path d="m26 50 72-27m-68 36 74-27" fill="none" stroke="#f3f8fb" />
      <ellipse cx="28" cy="57" rx="11" ry="14" transform="rotate(-25 28 57)" fill="#dce5ed" />
      <ellipse cx="28" cy="57" rx="5" ry="7" transform="rotate(-25 28 57)" fill="#8e6752" />
    </g>
  );
  if (id === "qc-kelereng-bertabrakan" || id === "qc-kelereng-kedua-menggelinding") {
    return <KelerengGerak setelah={id === "qc-kelereng-kedua-menggelinding"} />;
  }
  if (id === "qc-pasir-halus-batu-kecil") return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 74c17-5 28-10 43-22 7-6 19-11 28-5 9 6 19 13 36 25q5 7-8 10H23q-13-1-11-8Z"
        fill="#f3cc7e" stroke="#bd8d4a" strokeWidth="2.5" />
      <path d="m27 75 12-4m-3 8 11-3m8-13 7-3m-2 14 9 1m19-1 9 4m10-7 5 3"
        stroke="#a97946" strokeWidth="2" strokeDasharray="1 3" />
      <path d="m45 47 8-12 13-1 6 7-5 11-13 3Zm21 16 8-11 13-2 8 8-3 10-17 1Zm25-16 2-9 9-4 8 5 2 9-10 4Z"
        fill="#929eaa" stroke="#586776" strokeWidth="2.7" />
      <path d="m50 44 9-4 6 2m7 18 9-4 7 2m9-15 5-3 4 2" fill="none" stroke="#d9e0e4" strokeWidth="2.1" />
    </g>
  );
  if (id === "qc-gelas-ukur") return (
    <g stroke="#286278" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="65" cy="86" rx="26" ry="7" fill="#bce5ed" />
      <path d="M45 16v63q0 6 20 6t20-6V16" fill="#d8f2f6" />
      <path d="M45 16c0-7 40-7 40 0s-40 7-40 0Z" fill="#f1fcff" />
      <path d="M52 31v39" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M65 32h13m-8 8h8m-13 8h13m-8 8h8m-13 8h13m-8 8h8" fill="none" strokeWidth="2.6" />
    </g>
  );
  if (id === "qc-ayakan-kasar") return (
    <g stroke="#774e35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 43v15c0 12 20 22 46 22s46-10 46-22V43" fill="#ca8950" />
      <ellipse cx="57" cy="43" rx="46" ry="22" fill="#efc18b" />
      <path d="M93 51l21-9q8-3 10 2t-5 9l-21 10Z" fill="#ca8950" />
      <ellipse cx="57" cy="43" rx="36" ry="15" fill="#f7eadb" />
      <path d="M24 39h66M23 47h68M38 31v23M50 29v28M63 29v28M76 31v23"
        fill="none" stroke="#94704e" strokeWidth="2.5" />
    </g>
  );
  if (id === "qc-kain-saring-halus") return (
    <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 42l8 36q27 14 54 0l8-36" fill="#d8f1f5" stroke="#4f8493" />
      <ellipse cx="65" cy="42" rx="35" ry="12" fill="#c0e7ed" stroke="#4f8493" />
      <path d="M25 43C35 18 49 30 60 28c16-4 23 0 41 1l11 33c-15-10-21 4-37-4-12-6-20 6-31-1-8-6-15 1-25 4Z"
        fill="#fff0c6" stroke="#a17c43" />
      <path d="M37 39q10-4 18-1m13 0q12-2 23 1M34 47q11-4 19-1m14 0q15-2 28 1"
        fill="none" stroke="#bf9d60" strokeWidth="2" strokeDasharray="1 3" />
      <path d="M26 54q9-5 16-3m39 1q12 1 20-2" fill="none" stroke="#d9bd86" strokeWidth="2" />
    </g>
  );
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
