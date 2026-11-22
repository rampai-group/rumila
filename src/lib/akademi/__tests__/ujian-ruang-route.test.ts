import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/akademi/ujian/route";
import { anggotaMilik, klien, semuaEvent } from "../server";
import { petaDariBukti, ujianTerbuka } from "../peta";
import { PAKET } from "../katalog";
import { LEARNER, SESSION } from "./helper";

vi.mock("../server", async (importOriginal) => ({ ...await importOriginal<typeof import("../server")>(), klien: vi.fn(), anggotaMilik: vi.fn(), semuaEvent: vi.fn() }));
vi.mock("../peta", async (importOriginal) => ({ ...await importOriginal<typeof import("../peta")>(), petaDariBukti: vi.fn(), ujianTerbuka: vi.fn(() => true) }));
const family = "11111111-1111-4111-8111-111111111112";
const old = { member_id: LEARNER, session_id: SESSION, jenis: "kuis", level: "SD1", ruang: "DATA", benar: 8, total: 8, nilai: 100, lulus: true, created_at: "2026-11-22T00:00:00Z" };
function request(ruang: string) { return new Request("http://localhost/api/akademi/ujian", { method: "POST", body: JSON.stringify({ memberId: LEARNER, sessionId: SESSION, jenis: "kuis", level: "SD1", ruang }) }); }
function database(existing = false) {
  let inserted: Record<string, unknown> | undefined;
  const admin = { from: vi.fn((table: string) => {
    const filters: Record<string, unknown> = {};
    const q = {
      select: () => q,
      eq: (k: string, v: unknown) => { filters[k] = v; return q; },
      maybeSingle: async () => ({ data: table === "akademi_siswa" ? { level: "SD1", sumber: "awal", semester: 2 } : existing && filters.session_id === SESSION ? old : null, error: null }),
      then: (resolve: (x: unknown) => void) => resolve({ data: [], error: null }),
      insert: (row: Record<string, unknown>) => { inserted = row; return q; },
      single: async () => ({ data: { ...inserted, created_at: old.created_at }, error: null }),
    };
    return q;
  }) };
  vi.mocked(klien).mockReturnValue({ pemanggil: admin, admin } as unknown as Exclude<ReturnType<typeof klien>, string>);
  vi.mocked(anggotaMilik).mockResolvedValue({ id: LEARNER, family_id: family });
  return () => inserted;
}
function answers(track: "MAT" | "KODE") {
  const p = PAKET.find((p) => p.competencyIds.includes(`${track}.SD1.DATA.01`))!;
  vi.mocked(semuaEvent).mockImplementation(async (_admin, _member, session) => session ? Array.from({ length: 8 }, () => ({ activity_id: p.id, type: "attempt", payload: { correct: true, hintUsed: false } })) as unknown as NonNullable<Awaited<ReturnType<typeof semuaEvent>>> : []);
}
afterEach(() => vi.clearAllMocks());
describe("penyimpanan ruang modul", () => {
  it("menyimpan KODE:DATA dengan soal Coding tanpa mengubahnya menjadi MAT:DATA", async () => {
    const saved = database(); answers("KODE");
    const res = await POST(request("KODE:DATA"));
    expect(res.status).toBe(200);
    expect(saved()).toMatchObject({ jenis: "kuis", level: "SD1", ruang: "KODE:DATA" });
    expect(await res.json()).toMatchObject({ ujian: { ruang: "KODE:DATA" } });
    expect(ujianTerbuka).toHaveBeenCalledWith(vi.mocked(petaDariBukti).mock.results[0].value, "kuis", "KODE:DATA");
  });
  it("menolak jawaban Matematika ketika ruangnya Coding", async () => {
    const saved = database(); answers("MAT");
    const res = await POST(request("KODE:DATA"));
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ error: "soal_di_luar_cakupan" });
    expect(saved()).toBeUndefined();
  });
  it("permintaan lama tetap disimpan dengan ruang kanonik yang dahulu benar-benar diuji", async () => {
    const saved = database(); answers("MAT");
    expect((await POST(request("DATA"))).status).toBe(200);
    expect(saved()).toMatchObject({ ruang: "MAT:DATA" });
  });
  it("retry hasil lama menerima ruang kanoniknya saja", async () => {
    database(true);
    const accepted = await POST(request("MAT:DATA"));
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toMatchObject({ ujian: { ruang: "MAT:DATA" } });
    expect((await POST(request("KODE:DATA"))).status).toBe(409);
  });
});
