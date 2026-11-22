import { describe, expect, it } from "vitest";
import { kolomTerbaik } from "../kisi";

describe("pembagi baris kartu", () => {
  it("ruang tegak: empat kartu jadi dua baris", () => {
    expect(kolomTerbaik(470, 780, 4, 5, 10)).toBe(2);
    expect(kolomTerbaik(690, 800, 4, 7, 10)).toBe(2);
  });
  it("ruang miring: empat kartu tetap sebaris", () => {
    expect(kolomTerbaik(1050, 380, 4, 9, 10)).toBe(4);
  });
  it("tidak ada baris timpang 3+1", () => {
    expect(kolomTerbaik(330, 200, 4, 3, 10)).toBe(2);
  });
  it("lima kartu di ruang tegak: tidak sebaris", () => {
    expect(kolomTerbaik(690, 800, 5, 7, 10)).toBeLessThan(5);
  });
});
