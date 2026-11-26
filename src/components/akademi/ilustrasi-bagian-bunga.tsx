export const ILUSTRASI_BAGIAN_BUNGA_IDS = [
  "bunga-mahkota", "bunga-kelopak", "bunga-kepala-sari", "bunga-tangkai-sari",
  "bunga-kepala-putik", "bunga-tangkai-putik", "bunga-bakal-buah", "bunga-benang-sari",
  "bunga-putik", "bunga-tangkai", "bunga-daun",
];

/** Penampang bunga umum; letak bagian tetap, dengan warna dan garis tegas pada bagian yang dipilih. */
export function IlustrasiBagianBunga({ id }: { id: string }) {
  const garis = (aktif: boolean) => aktif ? "#263748" : "#8b9aa5";
  const sorot = (bagian: string, warna: string, gabungan?: string) => {
    const aktif = id === bagian || (gabungan !== undefined && id === gabungan);
    return { fill: aktif ? warna : "#edf1f3", stroke: garis(aktif), strokeWidth: aktif ? 3.4 : 1.9, "data-sorot-bunga": aktif ? bagian : undefined };
  };

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <g {...sorot("bunga-tangkai", "#499b56")}>
        <path d="M60 73h10v20H60Z" />
      </g>
      <g {...sorot("bunga-daun", "#67b550")}>
        <path d="M65 87Q83 75 99 77Q90 96 65 89Z" />
        <path d="M69 88l20-7" fill="none" />
      </g>
      <g {...sorot("bunga-mahkota", "#f98fae")}>
        <path d="M64 74C36 66 19 49 13 22c17-7 34-1 40 16 4 13 6 23 11 36Z" />
        <path d="M66 74c28-8 45-25 51-52-17-7-34-1-40 16-4 13-6 23-11 36Z" />
      </g>
      <g {...sorot("bunga-kelopak", "#8bcc64")}>
        <path d="M65 74Q44 81 29 61q21-2 36 13Z" />
        <path d="M65 74q21 7 36-13-21-2-36 13Z" />
      </g>
      <g {...sorot("bunga-tangkai-sari", "#e5a337", "bunga-benang-sari")}>
        <path d="M56 71C49 65 43 58 38 44l5-3c5 14 9 20 17 26Z" />
        <path d="M74 71c7-6 13-13 18-27l-5-3c-5 14-9 20-17 26Z" />
      </g>
      <g {...sorot("bunga-kepala-sari", "#ffbc28", "bunga-benang-sari")}>
        <ellipse cx="39" cy="41" rx="11" ry="6.5" transform="rotate(32 39 41)" />
        <ellipse cx="91" cy="41" rx="11" ry="6.5" transform="rotate(-32 91 41)" />
      </g>
      <g {...sorot("bunga-tangkai-putik", "#55b69a", "bunga-putik")}>
        <path d="M61 23h8v39h-8Z" />
      </g>
      <g {...sorot("bunga-kepala-putik", "#2aab81", "bunga-putik")}>
        <path d="M65 26c-9 0-15-2-15-7 0-6 10-8 15-3 5-5 15-3 15 3 0 5-6 7-15 7Z" />
      </g>
      <g {...sorot("bunga-bakal-buah", "#99d5a5", "bunga-putik")}>
        <path d="M61 58h8c1 6 9 7 9 15 0 6-6 10-13 10s-13-4-13-10c0-8 8-9 9-15Z" />
        <circle cx="60" cy="72" r="2.3" fill="#fff" strokeWidth="1.5" />
        <circle cx="70" cy="72" r="2.3" fill="#fff" strokeWidth="1.5" />
        <circle cx="65" cy="77" r="2.3" fill="#fff" strokeWidth="1.5" />
      </g>
    </g>
  );
}
