import { afterEach, describe, expect, it, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import type { LevelId } from "@akademi/schema";
import { POST } from "@/app/api/akademi/sertifikat/route";
import { KOMPETENSI } from "../katalog";
import { aturanUntuk } from "../mastery";
import { attempt, LEARNER } from "./helper";

vi.mock("@supabase/supabase-js", () => ({ createClient: vi.fn() }));

const FAMILY = "11111111-1111-4111-8111-111111111112";

function req(level: LevelId) {
  return new Request("http://localhost/api/akademi/sertifikat", {
    method: "POST",
    headers: { authorization: "Bearer sesi-uji" },
    body: JSON.stringify({ memberId: LEARNER, level }),
  });
}

function database(level: LevelId, nilai: number | null = 60) {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "http://localhost");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "publik-uji");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "server-uji");

  const bukti = KOMPETENSI.filter((c) => c.level === level && c.core).flatMap((c) => {
    const aturan = aturanUntuk(c);
    const panjang = Math.max(aturan.minSuccess, aturan.minContexts, aturan.minDays, aturan.noHintLast);
    return Array.from({ length: panjang }, (_, i) => {
      const e = attempt([c.id], { hari: i, activityId: `paket-${i % aturan.minContexts}` });
      return {
        id: e.id, member_id: e.learnerId, session_id: e.sessionId, activity_id: e.activityId,
        mechanic: e.mechanic, type: e.type, payload: e.payload, client_at: e.clientAt, created_at: e.clientAt,
      };
    });
  });
  const sukses = (data: unknown) => ({ data, error: null });
  let sertifikat: Record<string, unknown> | null = null;
  const state = { aktif: level as LevelId | null, gagalNaik: false, sebelumNaik: () => {} };
  const naik = vi.fn((levelBaru: LevelId, levelLama?: LevelId | null) => {
    state.sebelumNaik();
    if (state.gagalNaik) return { data: null, error: new Error("putus saat menyimpan jenjang") };
    if (levelLama !== undefined && state.aktif !== levelLama) return sukses(null);
    state.aktif = levelBaru;
    return sukses({ level: state.aktif });
  });
  const admin = {
    from: vi.fn((tabel: string) => {
      const filter: Record<string, unknown> = {};
      let operasi: "baca" | "ubah" = "baca";
      let levelBaru: LevelId;
      const q = {
        select: () => q,
        eq: (kolom: string, isi: unknown) => { filter[kolom] = isi; return q; },
        is: () => q,
        or: () => q,
        order: () => q,
        update: (isi: { level: LevelId }) => { operasi = "ubah"; levelBaru = isi.level; return q; },
        upsert: (isi: { level: LevelId }, opsi: { ignoreDuplicates?: boolean }) => {
          if (!opsi.ignoreDuplicates) return naik(isi.level);
          operasi = "ubah"; levelBaru = isi.level; return q;
        },
        insert: (isi: Record<string, unknown>) => {
          sertifikat = { ...isi, id: "sertifikat-uji", status: "sah" };
          return q;
        },
        single: async () => sukses(sertifikat),
        maybeSingle: async () => {
          if (tabel === "member") return sukses({ id: LEARNER, family_id: FAMILY });
          if (tabel === "akademi_certificate") return sukses(sertifikat);
          if (operasi === "ubah") return naik(levelBaru, filter.level as LevelId | null ?? null);
          return sukses(state.aktif ? { level: state.aktif } : null);
        },
        range: async (dari: number, sampai: number) => sukses(bukti.slice(dari, sampai + 1)),
        limit: async () => sukses(nilai === null ? [] : [{ nilai }]),
        then: (resolve: (r: ReturnType<typeof sukses>) => void) => resolve(sukses(nilai === null ? [] : [{ jenis: "kenaikan", ruang: "", nilai, lulus: nilai >= 75 }])),
      };
      return q;
    }),
  };
  vi.mocked(createClient).mockReturnValue(admin as unknown as ReturnType<typeof createClient>);
  return { state, naik };
}

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("penerbitan sertifikat dan kenaikan pangkat", () => {
  it("sertifikat tetap satu dan kenaikan diselesaikan saat percobaan kedua", async () => {
    const { state } = database("PAUD");
    vi.spyOn(console, "error").mockImplementation(() => {});
    state.gagalNaik = true;
    expect((await POST(req("PAUD"))).status).toBe(500);
    expect(state.aktif).toBe("PAUD");

    state.gagalNaik = false;
    const kedua = await POST(req("PAUD"));
    expect(kedua.status).toBe(200);
    const hasil = await kedua.json();
    expect(hasil).toMatchObject({ sertifikat: { id: "sertifikat-uji", snapshot: { nilai: 60, predikat: "Cukup" } }, levelBaru: "TKA" });
    expect(state.aktif).toBe("TKA");
    expect(await (await POST(req("PAUD"))).json()).toEqual(hasil);
  });

  it("permintaan yang tertunda tidak memundurkan pangkat aktif yang sudah lebih tinggi", async () => {
    const { state } = database("SD3");
    state.sebelumNaik = () => { state.aktif = "SD5"; };
    const res = await POST(req("SD3"));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ levelBaru: "SD5" });
    expect(state.aktif).toBe("SD5");
  });

  it("Legenda menerbitkan sertifikat tanpa menulis pangkat berikutnya", async () => {
    const { state, naik } = database("SD6", 100);
    const pertama = await POST(req("SD6"));
    expect(pertama.status).toBe(200);
    const hasil = await pertama.json();
    expect(hasil).toMatchObject({ sertifikat: { level: "SD6", snapshot: { level: "SD6", pangkat: "Legenda", nilai: 100 } } });
    expect(hasil).not.toHaveProperty("levelBaru");
    expect(await (await POST(req("SD6"))).json()).toEqual(hasil);
    expect(state.aktif).toBe("SD6");
    expect(naik).not.toHaveBeenCalled();
  });

  it("Legenda menunggu hasil Ujian Akhir resmi sebelum sertifikat terbit", async () => {
    const { naik } = database("SD6", null);
    const res = await POST(req("SD6"));
    expect(res.status).toBe(422);
    expect(await res.json()).toMatchObject({ error: "belum_ujian_kenaikan" });
    expect(naik).not.toHaveBeenCalled();
  });
});
