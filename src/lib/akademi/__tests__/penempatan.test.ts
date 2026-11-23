import { describe, expect, it } from "vitest";
import { ACTIVE_LEVELS } from "@akademi/schema";
import { levelDariUsia, levelDiBawah } from "../penempatan";

const semua = [...ACTIVE_LEVELS];

describe("tes penempatan dari usia", () => {
  it("usia awal tiap pangkat memilih pangkat itu", () => {
    expect(levelDariUsia(3, semua)).toBe("PAUD");
    expect(levelDariUsia(4, semua)).toBe("TKA");
    expect(levelDariUsia(6, semua)).toBe("SD1");
    expect(levelDariUsia(9, semua)).toBe("SD4");
  });
  it("di bawah 3 tahun mulai dari Tunas, di atas jangkauan mulai dari pangkat tertinggi yang ada", () => {
    expect(levelDariUsia(2, semua)).toBe("PAUD");
    expect(levelDariUsia(15, semua)).toBe(semua.at(-1));
    expect(levelDariUsia(9, ["PAUD", "TKA", "SD1"])).toBe("SD1");
  });
  it("belum lulus turun ke pangkat di bawahnya yang punya soal", () => {
    expect(levelDiBawah("SD1", ["PAUD", "TKA", "SD1"])).toBe("TKA");
    expect(levelDiBawah("PAUD", semua)).toBeUndefined();
  });
});
