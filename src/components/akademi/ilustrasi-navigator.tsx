export const ILUSTRASI_NAVIGATOR_IDS: readonly string[] = [
  "navigator-tempe",
  "navigator-panekuk-sirup",
  "navigator-soda",
  "navigator-roti-manis",
  "navigator-toples-jajanan",
  "navigator-tempat-pensil",
  "navigator-cat-air",
  "navigator-kelereng",
  "navigator-selai",
];

export function IlustrasiNavigator({ id }: { id: string }) {
  switch (id) {
    case "navigator-tempe":
      return (
        <g strokeLinejoin="round">
          <path d="M22 38 81 19l30 29v24L52 92 22 62Z" fill="#d7ae77" stroke="#865f3c" strokeWidth="3" />
          <path d="M22 38 81 19l30 29-59 20Z" fill="#f7e4bc" stroke="#865f3c" strokeWidth="3" />
          <path d="M52 68v24" stroke="#865f3c" strokeWidth="3" />
          {[[40,40],[53,35],[65,31],[79,27],[52,49],[65,44],[78,39],[90,36],[62,56],[76,51],[91,47],[101,50],[32,56],[42,67],[61,77],[77,72],[94,66],[104,59]].map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${(x + y) % 50 - 36})`}>
              <ellipse rx="4.8" ry="3.3" fill="#e3b977" stroke="#a2764d" strokeWidth="1.3" />
              <path d="M1-2Q-1 0 1 1.8" fill="none" stroke="#ad8559" strokeWidth="1.1" strokeLinecap="round" />
            </g>
          ))}
        </g>
      );
    case "navigator-panekuk-sirup":
      return (
        <g strokeLinejoin="round">
          <ellipse cx="65" cy="79" rx="47" ry="13" fill="#d6ecfa" stroke="#5693af" strokeWidth="3" />
          <path d="M27 45q-5 6 0 13-5 7 0 13 6 12 38 12t38-12q5-6 0-13 5-7 0-13Z" fill="#ecab65" stroke="#8b4b25" strokeWidth="3" />
          <path d="M26 56q4 10 39 10t39-10M26 68q4 9 39 9t39-9" fill="none" stroke="#a96231" strokeWidth="3" />
          <ellipse cx="65" cy="45" rx="39" ry="14" fill="#ffce82" stroke="#a96231" strokeWidth="3" />
          <path d="M39 42c8-6 36-11 48-4 8 6-5 9-5 12 0 4 6 3 4 11-1 4-8 5-11 1l-2-10c-7-2-16 0-24-1-9-1-15-4-10-9Z" fill="#995027" />
          <rect x="59" y="32" width="15" height="10" rx="2" transform="rotate(-12 66 37)" fill="#fff0a2" stroke="#d19038" strokeWidth="2" />
        </g>
      );
    case "navigator-soda":
      return (
        <g strokeLinejoin="round">
          <path d="M43 36h45l-5 51q-17 8-35 0Z" fill="#8b4b3a" stroke="#693827" strokeWidth="3" />
          <path d="M35 28h61l-9 60q-22 10-44 0Z" fill="#bfdde8" fillOpacity=".26" stroke="#40778c" strokeWidth="3" />
          <ellipse cx="65.5" cy="37" rx="22.5" ry="5" fill="#c47a54" stroke="#753b2c" strokeWidth="2" />
          <ellipse cx="65.5" cy="28" rx="30.5" ry="7" fill="none" stroke="#40778c" strokeWidth="3" />
          <path d="m44 39 6 41M53 46l1 11" fill="none" stroke="#f0faff" strokeWidth="3" strokeLinecap="round" />
          <g fill="#ffe2a9" stroke="#ad6c43" strokeWidth="1.5">
            <circle cx="67" cy="62" r="4" /><circle cx="74" cy="50" r="3" /><circle cx="63" cy="43" r="3.5" />
            <circle cx="68" cy="23" r="3.5" /><circle cx="80" cy="14" r="4" /><circle cx="61" cy="9" r="2.5" />
          </g>
        </g>
      );
    case "navigator-roti-manis":
      return (
        <g strokeLinejoin="round">
          <path d="M19 67q0-37 39-40c21-2 44 8 50 26 12 17-2 32-44 32q-30 0-45-9Z" fill="#e99a44" stroke="#864b2d" strokeWidth="3" />
          <path d="M21 63c3-22 15-36 37-36 24-1 44 8 50 26-9 9-15-6-22 0-8 9-13 2-22 10-7 6-11-5-18-4-12 2-15 11-25 4Z" fill="#f9d2a3" stroke="#a9603b" strokeWidth="3" />
          <path d="m40 44 5 2m11-9 4 3m12 4 4-2m9 7 5 1m-25 2 4 2m-23 0 3-2" fill="none" stroke="#fff8eb" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 74q28 8 65 0" fill="none" stroke="#bf7433" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "navigator-toples-jajanan":
      return (
        <g strokeLinejoin="round">
          <path d="M40 31h50v9q10 8 10 19v24q0 7-8 7H38q-8 0-8-7V59q0-11 10-19Z" fill="#e1f5fb" stroke="#3c778b" strokeWidth="3" />
          <circle cx="55" cy="56" r="11" fill="#ed94b3" stroke="#b9557b" strokeWidth="3" />
          <path d="M49 52q8-8 12-1 3 6-6 9" fill="none" stroke="#fff1ed" strokeWidth="2" strokeLinecap="round" />
          <path d="M69 62l-3-9 11 2 8-4 3 10-8 8-8 3Z" fill="#f4b755" stroke="#b27235" strokeWidth="2" />
          <rect x="49" y="68" width="17" height="14" rx="3" transform="rotate(12 57 75)" fill="#9d77d1" stroke="#694a95" strokeWidth="2" />
          <path d="M85 77q-8-3-11 4l13 2Z" fill="#5fbf9d" stroke="#388571" strokeWidth="2" />
          <path d="M38 56v20M43 47l3-3" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <rect x="36" y="20" width="58" height="16" rx="5" fill="#ca73a1" stroke="#8b4771" strokeWidth="3" />
          <path d="M47 25v6m12-6v6m12-6v6m12-6v6" stroke="#f6c1d8" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "navigator-tempat-pensil":
      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          <path d="M20 53 80 20l11-1-6 9-61 33Z" fill="#ffc73a" stroke="#805126" strokeWidth="3" />
          <path d="m80 20 11-1-6 9Zm8-1 3 0-2 3Z" fill="#f6d59f" stroke="#805126" strokeWidth="2" />
          <path d="M39 54 77 35h15l-10 9-39 20Z" fill="#ec6a7d" stroke="#874253" strokeWidth="3" />
          <path d="M18 58q3-11 15-11h64q9 0 13 9l6 16q4 13-9 15H27q-14 0-15-13Z" fill="#55aacb" stroke="#285b78" strokeWidth="3" />
          <path d="M17 63h96M27 69h46l5 12H27Z" fill="none" stroke="#285b78" strokeWidth="3" />
          <path d="M28 62h68" stroke="#f4f7fb" strokeWidth="3" strokeDasharray="2 4" />
          <path d="m95 61 7 3-3 7-7-3Z" fill="#ffe482" stroke="#285b78" strokeWidth="2" />
        </g>
      );
    case "navigator-cat-air":
      return (
        <g strokeLinejoin="round" strokeLinecap="round">
          <rect x="15" y="29" width="96" height="56" rx="8" fill="#eef2fa" stroke="#425c77" strokeWidth="3" />
          <path d="M18 78h89" stroke="#99acc8" strokeWidth="3" />
          {["#e84654", "#faab36", "#f3d22d", "#479c65", "#3297d1", "#7655b5"].map((paint, index) => (
            <rect key={paint} x={24 + (index % 3) * 26} y={37 + Math.floor(index / 3) * 18} width="18" height="13" rx="4" fill={paint} stroke="#495970" strokeWidth="2" />
          ))}
          <path d="m44 77 58-56 4 4-54 61-14 2Z" fill="#e1a462" stroke="#694b3d" strokeWidth="3" />
          <path d="m44 77 8 9-14 2-12 3 5-10Z" fill="#514f63" stroke="#4b4355" strokeWidth="2" />
          <path d="m44 77 8 9 6-7-8-7Z" fill="#aebed1" stroke="#4b4355" strokeWidth="2" />
        </g>
      );
    case "navigator-kelereng":
      return (
        <g strokeWidth="3">
          {[
            { x: 42, y: 54, r: 19, fill: "#95dbf8", swirl: "#387fae" },
            { x: 81, y: 38, r: 21, fill: "#ffcdb3", swirl: "#dd7075" },
            { x: 76, y: 72, r: 19, fill: "#b9e8b8", swirl: "#56a466" },
          ].map(({ x, y, r, fill, swirl }) => (
            <g key={fill} transform={`translate(${x} ${y})`}>
              <circle r={r} fill={fill} stroke={swirl} />
              <path d="M-15 9C3 14 15-12 4-15-4-18-15-2-8 3Q-2 9 7 0" fill="none" stroke={swirl} strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="-5" cy="-8" rx="5" ry="3" transform="rotate(-27 -5 -8)" fill="#fff" />
            </g>
          ))}
        </g>
      );
    case "navigator-selai":
      return (
        <g strokeLinejoin="round">
          <path d="M42 28h46v11q9 7 9 15v28q0 8-9 8H42q-9 0-9-8V54q0-8 9-15Z" fill="#ad3856" stroke="#753350" strokeWidth="3" />
          <path d="M40 48q3-6 7-7M40 54v5" fill="none" stroke="#ea8e9b" strokeWidth="3" strokeLinecap="round" />
          <path d="M34 59q31 4 62 0v19q-31 5-62 0Z" fill="#fff3db" stroke="#753350" strokeWidth="2.5" />
          <path d="M65 67q-12-7-12 2c0 5 8 12 12 14 4-2 12-9 12-14q0-9-12-2Z" fill="#e75064" stroke="#9f2945" strokeWidth="2" />
          <path d="M65 69q-4-8-10-7l5 6H70l5-6q-6-1-10 7Z" fill="#5c9d55" stroke="#3b713c" strokeWidth="2" />
          <path d="m60 72 1 1m8-1-1 1m-3 3v1" stroke="#ffdda4" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="38" y="20" width="54" height="15" rx="5" fill="#d96472" stroke="#753350" strokeWidth="3" />
          <path d="M48 24v7m11-7v7m12-7v7m11-7v7" stroke="#f6adb5" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}
