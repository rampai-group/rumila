import type { ReactNode } from "react";

const kontur = { strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ILUSTRASI_HABITAT: Record<string, ReactNode> = {
  "habitat-arktik": <g {...kontur}>
    <rect x="5" y="11" width="120" height="78" rx="9" fill="#daeff7" stroke="#5c89a3" />
    <path d="M7 53L25 33 42 45 58 26 81 49 100 35 123 52V65H7Z" fill="#9cc8db" stroke="#689ab2" />
    <path d="M37 48L58 26 72 40 60 37 51 42 47 40ZM86 45L100 35 113 43 103 40 95 44Z" fill="#fff" />
    <path d="M7 55Q33 49 46 61L65 63 81 58Q104 57 123 60V80Q123 87 116 87H14Q7 87 7 80Z" fill="#68b3d1" />
    <path d="M7 56Q30 46 53 59L66 62 57 69 36 72 29 79 7 78Z" fill="#f6fafc" stroke="#8cbad1" />
    <path d="M77 64L87 61 100 64 93 69 80 69ZM97 77L106 73 117 75 113 80 102 81Z" fill="#f6fafc" stroke="#4389a9" />
    <path d="M47 80H63M70 74H80M87 84H94" fill="none" stroke="#c5e7f1" />
  </g>,
  "rubah-fennec": <g {...kontur} stroke="#966542">
    <path d="M46 68Q33 59 25 65Q14 75 10 70Q14 84 29 84Q41 85 48 79" fill="#dcaf79" />
    <path d="M12 70Q21 77 29 67L31 65Q22 64 19 69Q14 72 10 70Z" fill="#8f5e45" stroke="none" />
    <path d="M35 69Q42 61 60 63L97 68Q112 74 106 88H96L93 81Q69 88 52 80L51 88H41Z" fill="#e6bd87" />
    <path d="M47 56Q29 46 23 19Q21 11 24 7Q51 14 59 42M76 43Q90 13 111 7Q116 14 110 31Q102 49 89 54" fill="#ecc489" />
    <path d="M48 47Q33 33 30 16Q46 24 52 43ZM83 43Q91 26 106 15Q103 34 89 46Z" fill="#f5cfbb" stroke="#b27859" />
    <path d="M44 47Q65 35 85 45Q98 50 96 65Q92 76 70 81Q47 75 42 64Q39 56 44 47Z" fill="#efd19c" />
    <path d="M43 62Q52 60 63 65L70 67L77 64Q90 58 96 62Q92 76 70 81Q48 75 43 62Z" fill="#fff0d8" stroke="none" />
    <path d="M65 66Q71 64 76 66L71 71Z" fill="#533d34" stroke="none" />
    {[54, 86].map((x) => <circle key={x} cx={x} cy="55" r="3.7" fill="#402f30" stroke="none" />)}
  </g>,
  "burung-hantu-salju": <g {...kontur} stroke="#6a7b91">
    <path d="M48 78Q46 87 36 90Q44 94 52 91L60 93 65 88 74 93 82 91Q94 94 96 90Q86 87 82 78" fill="#edf4f9" />
    <path d="M46 34Q37 39 31 56Q28 75 37 85Q44 87 50 80Q65 87 80 80Q86 87 93 84Q103 69 95 53Q90 41 84 35Z" fill="#f5f8fa" />
    <path d="M32 64Q38 69 42 78M97 63Q92 69 88 77M45 74Q64 79 85 74" fill="none" stroke="#b9c8d0" />
    <path d="M36 38C33 22 47 11 65 11C83 11 97 22 94 38Q91 57 65 57Q39 57 36 38Z" fill="#fdfcfa" />
    <path d="M44 29Q51 21 60 27M86 29Q79 21 70 27" fill="none" stroke="#a6b6c2" />
    <circle cx="53" cy="35" r="7.6" fill="#ebbc42" stroke="#80653a" />
    <circle cx="77" cy="35" r="7.6" fill="#ebbc42" stroke="#80653a" />
    {[53, 77].map((x) => <circle key={x} cx={x} cy="35" r="3.6" fill="#273342" stroke="none" />)}
    <path d="M62 41Q65 39 68 41L65 47Z" fill="#425364" stroke="none" />
    <path d="M35 54l5 2m-6 6 6 2m50-10 5-2m-7 11 6-2M48 60l5 2m7 3 6 1m9-3 6-2m-30 8 6 2m17-1 6-2" fill="none" stroke="#778797" strokeWidth="2.6" />
  </g>,
  "rusa-kutub": <g {...kontur} stroke="#665044">
    <path d="M36 65L33 87H40L47 68M77 68L81 88H88L88 64" fill="#8f7564" />
    <path d="M14 48Q21 47 30 50Q44 44 65 48L78 44L89 35Q101 34 107 43L119 46Q122 49 116 55L103 56Q99 63 93 67L95 89H87L81 69Q65 75 47 69L42 90H34L35 68Q19 65 18 53Z" fill="#b59c88" />
    <path d="M79 45L89 35Q98 35 104 40L100 45Q97 57 93 67L83 71Q86 62 78 58L82 55Z" fill="#f5eee2" stroke="none" />
    <path d="M25 55Q33 51 41 52M92 44L97 40M90 48Q88 58 85 63" fill="none" stroke="#907766" strokeWidth="2" />
    <path d="M94 38Q86 31 87 18L91 7M88 24L82 18 80 11M89 31Q97 26 99 15M94 37Q104 32 108 24L109 13M106 29L114 24 118 17M103 33L115 32 122 27" fill="none" stroke="#8d674c" strokeWidth="3.1" />
    <path d="M86 20L83 15 86 12 90 14 92 9 96 11 93 17 91 22Z" fill="#997255" stroke="none" />
    <path d="M34 88H42M87 89H95" stroke="#42382f" strokeWidth="3.4" />
    <circle cx="103" cy="45" r="2.4" fill="#253239" stroke="none" />
    <path d="M117 46L121 49L118 52 114 49Z" fill="#3d342e" stroke="none" />
  </g>,
  "paus-beluga": <g {...kontur} stroke="#658c9e">
    <path d="M38 59Q27 58 22 63Q16 63 10 58Q5 67 14 74Q24 77 40 69" fill="#d4e5ef" />
    <path d="M31 61Q52 56 66 45Q75 39 85 37Q87 21 103 22Q119 22 124 39Q128 51 117 57Q100 72 72 74Q54 74 33 71Z" fill="#f8fbff" />
    <path d="M35 66Q57 68 73 63Q94 64 112 56Q103 68 82 72Q61 76 36 71Z" fill="#d8e8f2" stroke="none" />
    <path d="M87 58Q82 71 69 79Q75 85 85 76Q93 71 93 64" fill="#dceaf1" />
    <path d="M88 38Q91 28 103 27Q112 28 116 34" fill="none" stroke="#fff" strokeWidth="3.5" />
    <circle cx="111" cy="43" r="2.4" fill="#263c48" stroke="none" />
    <path d="M109 52Q116 53 122 47" fill="none" stroke="#628395" strokeWidth="1.9" />
  </g>,
};
