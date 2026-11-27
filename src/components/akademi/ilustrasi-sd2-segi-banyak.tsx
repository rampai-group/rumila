import type { ReactNode } from "react";

function TepiBangun({ titik, warna, bergaris = false }: { titik: string; warna: string; bergaris?: boolean }) {
  return <polygon points={titik} fill={bergaris ? "none" : warna} stroke={bergaris ? warna : "#273b57"} strokeWidth={bergaris ? 3.6 : 2.4} />;
}

export const ILUSTRASI_SEGI_BANYAK_SD2: Record<string, ReactNode> = {
  "sd2-sisi-merah-penuh": <TepiBangun titik="65,13 110,86 20,86" warna="#e75063" />,
  "sd2-sisi-kuning-bergaris": <TepiBangun titik="65,13 110,86 20,86" warna="#a66d14" bergaris />,
  "sd2-sisi-biru-miring": <TepiBangun titik="52,12 108,58 22,86" warna="#5089dd" />,
  "sd2-sisi-hijau-kecil": <TepiBangun titik="65,26 99,80 31,80" warna="#3da97e" />,
  "sd2-sisi-biru-penuh": <TepiBangun titik="28,13 102,13 102,87 28,87" warna="#5089dd" />,
  "sd2-sisi-hijau-penuh": <TepiBangun titik="28,13 102,13 102,87 28,87" warna="#3da97e" />,
  "sd2-sisi-jingga-miring": <TepiBangun titik="65,10 111,51 65,92 19,51" warna="#ea873f" />,
  "sd2-sisi-kuning-melebar": <TepiBangun titik="13,23 117,23 117,77 13,77" warna="#eabb4d" />,
  "sd2-sisi-ungu-penuh": <TepiBangun titik="65,11 108,40 92,88 38,88 22,40" warna="#815bc1" />,
  "sd2-sisi-ungu-bergaris": <TepiBangun titik="65,11 108,40 92,88 38,88 22,40" warna="#815bc1" bergaris />,
  "sd2-sisi-biru-tua": <TepiBangun titik="42,13 88,13 112,50 88,87 42,87 18,50" warna="#425f9b" />,
  "sd2-sisi-toska-bergaris": <TepiBangun titik="42,13 88,13 112,50 88,87 42,87 18,50" warna="#2d9b92" bergaris />,
  "sd2-sisi-jingga-mendatar": <TepiBangun titik="40,20 90,20 115,50 90,80 40,80 15,50" warna="#ea873f" />,
  "sd2-sisi-merah-tua": <TepiBangun titik="47,11 83,11 105,33 105,67 83,89 47,89 25,67 25,33" warna="#a23954" />,
  "sd2-sisi-merah-terbalik": <TepiBangun titik="20,14 110,14 65,87" warna="#e75063" />,
  "sd2-sisi-biru-muda": <TepiBangun titik="25,12 109,88 25,88" warna="#8dc5de" />,
};
