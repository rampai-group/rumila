import { describe, expect, it } from "vitest";
import { cekDaftar, dataDaftar, emailSah, umurDari } from "../daftar";

const HARI_INI = new Date(2026, 10, 25); // 25 Nov 2026

describe("daftar akun", () => {
  it("email wajib berformat email", () => {
    expect(emailSah("tester")).toBe(false);
    expect(emailSah("a@b")).toBe(false);
    expect(emailSah(" ayah@gmail.com ")).toBe(true);
  });

  it("umur dihitung penuh dari tanggal lahir", () => {
    expect(umurDari("2018-11-25", HARI_INI)).toBe(8);
    expect(umurDari("2018-11-26", HARI_INI)).toBe(7);
    expect(umurDari("2018-02-30", HARI_INI)).toBeNull();
    expect(umurDari("2030-01-01", HARI_INI)).toBeNull();
  });

  it("orang tua cukup email; siswa wajib tanggal lahir yang wajar", () => {
    expect(cekDaftar({ email: "ayah@gmail.com", peran: "orang_tua", lahir: "" }, HARI_INI)).toBe("");
    expect(cekDaftar({ email: "ayah@gmail.com", peran: "", lahir: "" }, HARI_INI)).toMatch(/orang tua atau siswa/);
    expect(cekDaftar({ email: "raka@gmail.com", peran: "siswa", lahir: "" }, HARI_INI)).toMatch(/tanggal lahir/);
    expect(cekDaftar({ email: "raka@gmail.com", peran: "siswa", lahir: "2016-05-10" }, HARI_INI)).toMatch(/didaftarkan orang tua/);
    expect(cekDaftar({ email: "raka@gmail.com", peran: "siswa", lahir: "2013-11-26" }, HARI_INI)).toMatch(/didaftarkan orang tua/);
    expect(cekDaftar({ email: "raka@gmail.com", peran: "siswa", lahir: "2013-11-25" }, HARI_INI)).toBe("");
    expect(cekDaftar({ email: "raka@gmail.com", peran: "siswa", lahir: "1990-01-01" }, HARI_INI)).toMatch(/Umur siswa/);
  });

  it("metadata akun lama tidak punya peran", () => {
    expect(dataDaftar(undefined)).toEqual({ peran: null, lahir: null });
    expect(dataDaftar({ peran: "siswa", tanggal_lahir: "2016-05-10" })).toEqual({ peran: "siswa", lahir: "2016-05-10" });
  });
});
