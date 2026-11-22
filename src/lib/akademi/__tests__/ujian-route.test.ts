import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/akademi/ujian/route";
import { anggotaMilik, klien, semuaEvent } from "../server";
import { LEARNER, SESSION } from "./helper";

vi.mock("../server", async (importOriginal) => ({
  ...await importOriginal<typeof import("../server")>(),
  klien: vi.fn(),
  anggotaMilik: vi.fn(),
  semuaEvent: vi.fn(),
}));

const FAMILY = "11111111-1111-4111-8111-111111111112";
const placement = { member_id: LEARNER, session_id: SESSION, jenis: "penempatan", level: "TKB", ruang: "", benar: 8, total: 10, nilai: 80, lulus: true, created_at: "2026-11-20T00:00:00Z" };

function req(jenis: string, level = "PAUD", ruang = "") {
  return new Request("http://localhost/api/akademi/ujian", {
    method: "POST",
    body: JSON.stringify({ memberId: LEARNER, sessionId: SESSION, jenis, level, ruang }),
  });
}

function database({ simpanPenempatan, penempatanSudahAda = false }: { simpanPenempatan?: () => Promise<{ error: unknown }>; penempatanSudahAda?: boolean } = {}) {
  const admin = {
    from: vi.fn((tabel: string) => {
      const filter: Record<string, unknown> = {};
      const q = {
        select: () => q,
        eq: (k: string, v: unknown) => { filter[k] = v; return q; },
        maybeSingle: async () => {
          if (tabel === "akademi_siswa") return { data: { level: "PAUD", sumber: "awal", semester: 1 }, error: null };
          return { data: penempatanSudahAda && filter.session_id === SESSION ? placement : null, error: null };
        },
        then: (resolve: (r: { data: never[]; error: null }) => void) => resolve({ data: [], error: null }),
        upsert: simpanPenempatan,
      };
      return q;
    }),
  };
  vi.mocked(klien).mockReturnValue({ pemanggil: admin, admin } as unknown as Exclude<ReturnType<typeof klien>, string>);
  vi.mocked(anggotaMilik).mockResolvedValue({ id: LEARNER, family_id: FAMILY });
  return admin;
}

afterEach(() => vi.clearAllMocks());

describe("POST hasil ujian", () => {
  it("menolak Ujian Akhir yang belum terbuka di peta meski jenjang dan sesi sah", async () => {
    database();
    vi.mocked(semuaEvent).mockResolvedValue([]);
    const res = await POST(req("kenaikan"));
    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({ error: "ujian_terkunci" });
  });

  it("sesi penempatan yang nilainya sudah tersimpan menunggu konfirmasi jenjang dan bisa dikirim ulang", async () => {
    const simpanPenempatan = vi.fn(async (): Promise<{ error: unknown }> => ({ error: null }))
      .mockResolvedValueOnce({ error: new Error("tidak tersimpan") });
    database({ penempatanSudahAda: true, simpanPenempatan });
    const gagal = await POST(req("penempatan", "TKB"));
    expect(gagal.status).toBe(500);
    expect(await gagal.json()).toEqual({ error: "galat" });
    const berhasil = await POST(req("penempatan", "TKB"));
    expect(berhasil.status).toBe(200);
    expect(await berhasil.json()).toMatchObject({ levelBaru: "TKB", ujian: { sessionId: SESSION, lulus: true } });
    expect(simpanPenempatan).toHaveBeenCalledTimes(2);
  });
});
