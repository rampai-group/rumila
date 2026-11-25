import { createClient } from "@supabase/supabase-js";
import type { GameEvent } from "@akademi/schema";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { catatEvent, eventsAnak, hariAktifAnak, tarikHariAktif } from "../jejak";
import { supabase } from "@/lib/supabase/client";

const cloud = vi.hoisted(() => ({ familyId: "" }));
vi.mock("@/lib/supabase/family", () => ({ useCloud: { getState: () => cloud } }));
vi.mock("@/lib/supabase/client", () => ({ supabase: vi.fn() }));

const LINA = "11111111-1111-4111-8111-111111111111";
const BIMA = "22222222-2222-4222-8222-222222222222";
const KUNCI = (id: string) => `rumila-akademi-events-${id}`;
const SEKARANG = new Date("2026-11-25T09:02:00+07:00");
const payload = { itemId: "ronde-1", correct: true, latencyMs: 500 };
const sesi: Omit<GameEvent, "id" | "clientAt"> = {
  learnerId: LINA, sessionId: LINA, activityId: "quiz-fixture", mechanic: "pilah", type: "attempt", payload,
};

const tanggal = (hari: number, jam = "08:00:00") => new Date(`2026-11-${hari}T${jam}+07:00`).toISOString();
const event = (hari: number, id = String(hari), jam?: string): GameEvent => ({ ...sesi, id, clientAt: tanggal(hari, jam) });
const baris = (hari: number, member_id = LINA, jam = "08:00:00") => ({
  client_at: tanggal(hari, jam), member_id, family_id: cloud.familyId, type: "attempt",
});

function server(rows: ReturnType<typeof baris>[]) {
  const fetch = vi.fn(async (url: RequestInfo | URL) => {
    const query = new URL(String(url)).searchParams;
    const [gte, lt] = query.getAll("client_at");
    const data = rows.filter((r) =>
      query.get("member_id") === `eq.${r.member_id}` &&
      query.get("family_id") === `eq.${r.family_id}` &&
      query.get("type") === `eq.${r.type}` &&
      r.client_at >= gte.slice(4) && r.client_at < lt.slice(3),
    ).sort((a, b) => b.client_at.localeCompare(a.client_at)).slice(0, Number(query.get("limit")));
    return Response.json(data.map(({ client_at }) => ({ client_at })));
  });
  const client = createClient("https://akademi-fixture.supabase.co", "fixture", {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch },
  });
  vi.mocked(supabase).mockReturnValue(client as ReturnType<typeof supabase>);
  return fetch;
}

let nominal = 0;
beforeEach(() => {
  cloud.familyId = `rumah-${nominal++}`;
  vi.useFakeTimers();
  vi.setSystemTime(SEKARANG);
  const data = new Map<string, string>();
  vi.stubGlobal("window", new EventTarget());
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("hari aktif Akademi", () => {
  it("mempertahankan dua hari lama saat percobaan baru memangkas cache 3000 event", () => {
    const rekaman = [19, 20, 22, 24, 25].map((hari) => event(hari));
    for (let i = 0; i < 2995; i++) rekaman.push(event(25, `hari-ini-${i}`));
    localStorage.setItem(KUNCI(LINA), JSON.stringify(rekaman));
    expect(hariAktifAnak(LINA).size).toBe(5);

    catatEvent(sesi);
    catatEvent(sesi);

    expect(eventsAnak(LINA)).toHaveLength(3000);
    expect(eventsAnak(LINA).some((e) => e.id === "19" || e.id === "20")).toBe(false);
    expect(hariAktifAnak(LINA).size).toBe(5);
    expect(hariAktifAnak(BIMA).size).toBe(0);
  });

  it("memulihkan tanggal dari server pada cache kosong dengan kueri terbatas untuk anak dan rumah aktif", async () => {
    const fetch = server([
      ...[19, 20, 22, 24, 25].map((hari) => baris(hari)),
      baris(20, LINA, "17:00:00"),
      baris(21, BIMA),
      { ...baris(23), type: "hint" },
      { ...baris(23), family_id: "rumah-lain" },
    ]);
    const janji = tarikHariAktif(cloud.familyId, LINA);
    expect(tarikHariAktif(cloud.familyId, LINA)).toBe(janji);
    await janji;
    await tarikHariAktif(cloud.familyId, LINA);

    expect(hariAktifAnak(LINA).size).toBe(5);
    expect(hariAktifAnak(LINA).get("2026-11-20")).toBe(Date.parse(tanggal(20, "17:00:00")));
    expect(eventsAnak(LINA)).toHaveLength(0);
    expect(fetch).toHaveBeenCalledTimes(8);
    for (const [url] of fetch.mock.calls) {
      const query = new URL(String(url)).searchParams;
      expect(query.get("select")).toBe("client_at");
      expect(query.get("limit")).toBe("1");
      expect(query.get("order")).toBe("client_at.desc");
      expect(query.get("type")).toBe("eq.attempt");
      expect(query.get("member_id")).toBe(`eq.${LINA}`);
      expect(query.get("family_id")).toBe(`eq.${cloud.familyId}`);
    }
    await tarikHariAktif(cloud.familyId, BIMA);
    expect([...hariAktifAnak(BIMA).keys()]).toEqual(["2026-11-21"]);
    expect(hariAktifAnak(LINA).size).toBe(5);
  });

  it("mempertahankan tanggal lokal saat kueri gagal dan dapat mencoba lagi", async () => {
    localStorage.setItem(KUNCI(LINA), JSON.stringify([event(23)]));
    const fetch = server([baris(24)]);
    fetch.mockResolvedValueOnce(Response.json({ message: "offline fixture" }, { status: 403 }));
    await tarikHariAktif(cloud.familyId, LINA);
    expect(hariAktifAnak(LINA).size).toBe(2);
    const pertama = fetch.mock.calls.length;
    await tarikHariAktif(cloud.familyId, LINA);
    expect(fetch.mock.calls.length).toBeGreaterThan(pertama);
    expect(hariAktifAnak(LINA).size).toBe(2);
  });

  it("tidak menyimpan balasan yang datang setelah akun rumah berpindah", async () => {
    server([baris(24)]);
    const janji = tarikHariAktif(cloud.familyId, LINA);
    cloud.familyId = "rumah-baru";
    await janji;
    expect(hariAktifAnak(LINA).size).toBe(0);
  });

  it("menjaga batas 168 jam ketika jam atau tanggal WIB berubah", async () => {
    localStorage.setItem(KUNCI(LINA), JSON.stringify([event(18, "lama", "09:02:00"), event(24)]));
    expect(hariAktifAnak(LINA).size).toBe(2);
    vi.setSystemTime(new Date("2026-11-25T09:02:00.001+07:00"));
    expect(hariAktifAnak(LINA).size).toBe(1);

    const fetch = server([baris(25, LINA, "23:59:30"), baris(26, LINA, "00:00:30")]);
    vi.setSystemTime(new Date("2026-11-25T23:59:59+07:00"));
    await tarikHariAktif(cloud.familyId, LINA);
    expect(hariAktifAnak(LINA).has("2026-11-26")).toBe(false);
    const pertama = fetch.mock.calls.length;
    vi.setSystemTime(new Date("2026-11-26T00:01:00+07:00"));
    await tarikHariAktif(cloud.familyId, LINA);
    expect(fetch.mock.calls.length).toBeGreaterThan(pertama);
    expect(hariAktifAnak(LINA).has("2026-11-26")).toBe(true);
  });

  it("balasan dari sebelum tengah malam tidak menghapus tanggal baru", async () => {
    vi.setSystemTime(new Date("2026-11-25T23:59:59+07:00"));
    const fetch = server([baris(25), baris(26, LINA, "00:00:15")]);
    const baca = fetch.getMockImplementation()!;
    let buka = () => {};
    const tunggu = new Promise<void>((resolve) => { buka = resolve; });
    fetch.mockImplementation(async (url) => {
      if (new URL(String(url)).searchParams.get("client_at") === `gte.${tanggal(18, "23:59:59")}`) await tunggu;
      return baca(url);
    });
    const kemarin = tarikHariAktif(cloud.familyId, LINA);
    vi.setSystemTime(new Date("2026-11-26T00:01:00+07:00"));
    await tarikHariAktif(cloud.familyId, LINA);
    expect(hariAktifAnak(LINA).has("2026-11-26")).toBe(true);
    buka();
    await kemarin;
    expect(hariAktifAnak(LINA).has("2026-11-26")).toBe(true);
  });
});
