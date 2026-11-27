import type { ReactNode } from "react";

const garis = { strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Sendok({ kayu }: { kayu: boolean }) {
  const tepi = kayu ? "#795033" : "#547d78";
  return <g {...garis} transform="rotate(24 65 50)">
    <path d="M65 10C81 10 90 22 89 38C87 51 77 57 70 58L72 85Q72 93 65 94Q57 93 58 85L60 58C51 55 43 49 42 37C40 22 50 10 65 10Z" fill={kayu ? "#c69160" : "#99cdb9"} stroke={tepi} />
    <path d="M52 31Q53 53 66 51Q77 50 80 34" fill="none" stroke={kayu ? "#a56947" : "#6ba497"} />
    {kayu ? <path d="M59 19q-3 12 4 25m8-25q6 12 1 23m-8 22-1 20" fill="none" stroke="#9f6644" />
      : <path d="M54 27q4-8 11-8m10 18q-4 8-10 9m-2 20v17" fill="none" stroke="#d4eee8" />}
  </g>;
}

function Kaleng({ minuman }: { minuman: boolean }) {
  const x = minuman ? 42 : 30;
  const width = minuman ? 46 : 70;
  const y = minuman ? 16 : 28;
  const color = minuman ? "#45a5a2" : "#bccbd4";
  return <g {...garis} stroke="#5c7182">
    <path d={`M${x} ${y}H${x + width}V82Q65 93 ${x} 82Z`} fill={color} />
    <ellipse cx="65" cy={y} rx={width / 2} ry="8" fill="#e6edf1" />
    {minuman ? <>
      <path d="M57 17q7-8 17-2l-3 3H57Z" fill="#b1c1cc" />
      <path d="M47 67Q64 37 82 38Q69 51 58 72" fill="#b9efdb" stroke="none" />
    </> : <>
      <path d="M32 43H98V72H32Z" fill="#f5ecd6" stroke="none" />
      <path d="M32 48H98M32 69H98" stroke="#96a7be" />
      <path d="M66 45q-9 10-9 14a9 9 0 0 0 18 0q0-4-9-14Z" fill="#fff" stroke="#8aa1ae" />
    </>}
    <path d={`M${x + 2} 80Q65 89 ${x + width - 2} 80`} fill="none" stroke="#dce9f1" />
  </g>;
}

export const ILUSTRASI_BENDA_LOGAM_SD3: Record<string, ReactNode> = {
  "logam-baut": <g {...garis} transform="rotate(-29 65 50)" stroke="#556a78">
    <path d="M46 19L54 12H76L84 19V37H46Z" fill="#acbec9" />
    <path d="M57 37H73V84L65 90 57 84Z" fill="#a1b5c2" />
    <path d="M57 49l16-3m-16 13 16-3m-16 13 16-3m-16 13 16-3" />
  </g>,
  "logam-sekrup": <g {...garis} transform="rotate(-29 65 50)" stroke="#556a78">
    <path d="M46 22Q46 14 65 14Q84 14 84 22L73 36H57Z" fill="#b2c1cf" />
    <path d="M57 36H73V68L65 91 57 68Z" fill="#9cabb8" />
    <path d="M58 20h14m-7-4v8M55 45l19-5m-19 16 19-5m-19 16 19-5m-16 15 13-5" />
  </g>,
  "logam-mur": <g {...garis} stroke="#526b7c">
    <path d="M23 38 46 23H84L107 38V62L83 79H47L23 62Z" fill="#829aa8" />
    <path d="M23 38 46 22H84L107 38 84 56H46Z" fill="#b8cad4" />
    <ellipse cx="65" cy="39" rx="20" ry="12" fill="#526b7c" />
    <path d="M49 40q16-9 32 0m-29 4q13-6 26 0" fill="none" stroke="#8fa8ba" />
    <path d="M46 56v21m38-21v21" fill="none" />
  </g>,
  "logam-kawat-tembaga": <g {...garis} fill="none">
    {[0, 9, 18, 27].map(offset => <ellipse key={offset} cx={50 + offset} cy={48 + offset / 4} rx="25" ry="21" stroke="#bc6e4e" strokeWidth="4" />)}
    <path d="M25 48Q19 67 13 66M100 58q8 11 19 10" stroke="#bc6e4e" strokeWidth="4" />
  </g>,
  "logam-gelang-perak": <g {...garis} transform="rotate(-17 65 50)">
    <path d="M20 51C20 19 110 19 110 51V57C110 88 20 88 20 57ZM33 51C33 70 97 70 97 51C97 32 33 32 33 51Z" fill="#a5b7cc" fillRule="evenodd" stroke="#6c7e99" />
    <path d="M23 47Q33 23 78 29M53 75q31 4 47-11" fill="none" stroke="#edf3fa" />
  </g>,
  "logam-sendok-kayu": <Sendok kayu />,
  "logam-sendok-plastik": <Sendok kayu={false} />,
  "logam-kaleng-minuman": <Kaleng minuman />,
  "logam-kaleng-susu": <Kaleng minuman={false} />,
  "logam-wajan-aluminium": <g {...garis} stroke="#627486">
    <path d="M86 48L116 24Q123 19 127 24Q129 29 123 34L96 59" fill="#576577" />
    <path d="M10 48Q14 87 53 90Q95 88 98 48Z" fill="#a9bdc9" />
    <ellipse cx="54" cy="48" rx="44" ry="20" fill="#d4e1e7" />
    <ellipse cx="54" cy="51" rx="33" ry="12" fill="#adbecb" />
    <path d="M22 45q15-11 35-9m-31 37q12 9 25 9" fill="none" stroke="#f2f7fa" />
  </g>,
};
