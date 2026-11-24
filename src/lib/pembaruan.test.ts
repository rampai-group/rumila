import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { muatUlang } from "./mode-app";

vi.mock("./mode-app", () => ({ muatUlang: vi.fn() }));

const location = { pathname: "/akademi" };
const ambilVersi = vi.fn<() => Promise<Response>>();
const simpanVersi = vi.fn();

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.stubEnv("NEXT_PUBLIC_VERSI", "sebelum");
  vi.stubGlobal("window", { location });
  vi.stubGlobal("navigator", {});
  vi.stubGlobal("fetch", ambilVersi);
  vi.stubGlobal("sessionStorage", { getItem: () => null, setItem: simpanVersi });
  location.pathname = "/akademi";
  ambilVersi.mockResolvedValue(Response.json({ versi: "sesudah" }));
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it.each(["/akademi/main/panen", "/akademi/ujian", "/akademi/penempatan"])("menunda pembaruan saat di %s", async (pathname) => {
  const { cekPembaruan } = await import("./pembaruan");
  location.pathname = pathname;
  await cekPembaruan();
  expect(ambilVersi).not.toHaveBeenCalled();
  expect(muatUlang).not.toHaveBeenCalled();

  location.pathname = "/akademi";
  await cekPembaruan();
  expect(simpanVersi).toHaveBeenCalledWith("rinoya-coba-versi", "sesudah");
  expect(muatUlang).toHaveBeenCalledOnce();
});

it("tidak mengulang halaman jika misi dibuka saat cek versi berlangsung", async () => {
  const { cekPembaruan } = await import("./pembaruan");
  let jawabVersi!: (r: Response) => void;
  ambilVersi.mockImplementationOnce(() => new Promise((resolve) => { jawabVersi = resolve; }));
  const pembaruan = cekPembaruan();
  location.pathname = "/akademi/main/panen";
  jawabVersi(Response.json({ versi: "sesudah" }));
  await pembaruan;

  expect(simpanVersi).not.toHaveBeenCalled();
  expect(muatUlang).not.toHaveBeenCalled();
});
