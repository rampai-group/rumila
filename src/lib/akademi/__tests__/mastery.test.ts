import { describe, expect, it } from "vitest";
import { hariWIB, jedaKeHariWIBBerikut } from "../kalender";
import { aturanUntuk, proyeksi, ringkasTrack, syaratPenguasaan } from "../mastery";
import { attempt, buktiKuat, kompetensi } from "./helper";

const C1 = "MAT.PAUD.BILANGAN-1-5.01";
const C2 = "MAT.PAUD.BILANGAN-1-5.02";

describe("proyeksi", () => {
  it("kompetensi tanpa event → belum dengan angka 0", () => {
    const p = proyeksi([], [kompetensi(C1)]);
    expect(p[C1]).toEqual({ status: "belum", success: 0, fail: 0, contexts: 0, days: 0, ratioLast10: 0, hintTail: 0 });
  });

  it("belum → berkembang → dikuasai sesuai aturan default", () => {
    const k = [kompetensi(C1)];
    expect(proyeksi([attempt([C1], { correct: false })], k)[C1].status).toBe("belum");
    const satu = proyeksi([attempt([C1])], k)[C1];
    expect(satu.status).toBe("berkembang");
    expect(satu.success).toBe(1);
    expect(satu.lastAt).toBeDefined();
    const kuat = proyeksi(buktiKuat(C1), k)[C1];
    expect(kuat.status).toBe("dikuasai");
    expect(kuat.contexts).toBe(2);
    expect(kuat.days).toBe(4);
    expect(kuat.ratioLast10).toBe(1);
  });

  it("konteks sama tidak naik ke dikuasai; hari sama juga tidak", () => {
    const k = [kompetensi(C1)];
    const satuKonteks = Array.from({ length: 5 }, (_, i) => attempt([C1], { hari: i, activityId: "paket-a" }));
    expect(proyeksi(satuKonteks, k)[C1]).toMatchObject({ status: "berkembang", contexts: 1, days: 5 });
    const satuHari = Array.from({ length: 5 }, (_, i) => attempt([C1], { hari: i * 0.01, activityId: i % 2 ? "b" : "a" }));
    expect(proyeksi(satuHari, k)[C1]).toMatchObject({ status: "berkembang", contexts: 2, days: 1 });
  });

  it("menghitung bukti sebelum dan setelah tengah malam WIB dalam dua hari meski UTC masih sama", () => {
    const sebelum = "2026-11-23T16:59:59.999Z";
    const sesudah = "2026-11-23T17:00:00.000Z";
    const k = [kompetensi(C1)];
    const bukti = [
      { ...attempt([C1], { activityId: "paket-a" }), clientAt: "2026-11-23T13:00:00.000Z" },
      { ...attempt([C1], { activityId: "paket-b" }), clientAt: "2026-11-23T16:00:00.000Z" },
    ];
    const satuHari = proyeksi([...bukti, { ...attempt([C1]), clientAt: sebelum }], k)[C1];
    const duaHari = proyeksi([...bukti, { ...attempt([C1]), clientAt: sesudah }], k)[C1];
    expect(satuHari).toMatchObject({ status: "berkembang", days: 1, hariBenar: ["2026-11-23"] });
    expect(duaHari).toMatchObject({ status: "dikuasai", days: 2, hariBenar: ["2026-11-23", "2026-11-24"] });
    expect(jedaKeHariWIBBerikut(new Date(sebelum))).toBe(1);
    expect(jedaKeHariWIBBerikut(new Date(sesudah))).toBe(24 * 60 * 60 * 1000);
    expect(hariWIB("2026-11-24T00:00:00.000Z")).toBe("2026-11-24");
  });

  it("hint di akhir menahan, hint di tengah tidak", () => {
    const k = [kompetensi(C1)];
    const ev = buktiKuat(C1, 4);
    ev.push(attempt([C1], { hari: 4, hintUsed: true }));
    const p = proyeksi(ev, k)[C1];
    expect(p.status).toBe("berkembang");
    expect(p.hintTail).toBe(1);
    // satu lagi tanpa hint masih kurang (noHintLast = 2), dua lagi cukup
    ev.push(attempt([C1], { hari: 5 }));
    expect(proyeksi(ev, k)[C1].status).toBe("berkembang");
    ev.push(attempt([C1], { hari: 6 }));
    expect(proyeksi(ev, k)[C1].status).toBe("dikuasai");
    expect(proyeksi(ev, k)[C1].hintTail).toBe(0);
  });

  it("ratio rendah di 10 terakhir menahan", () => {
    const k = [kompetensi(C1)];
    const ev = buktiKuat(C1, 4);
    for (let i = 0; i < 4; i++) ev.push(attempt([C1], { hari: 4 + i, correct: false }));
    const p = proyeksi(ev, k)[C1];
    expect(p.ratioLast10).toBe(0.5);
    expect(p.status).toBe("berkembang");
    expect(p.fail).toBe(4);
  });

  it("override mastery dihormati", () => {
    const longgar = kompetensi(C1, { mastery: { minContexts: 1, minDays: 1, minSuccess: 2, noHintLast: 0 } });
    const ev = [attempt([C1], { hintUsed: true }), attempt([C1], { hintUsed: true, hari: 0.01 })];
    expect(proyeksi(ev, [longgar])[C1].status).toBe("dikuasai");
    expect(proyeksi(ev, [kompetensi(C1)])[C1].status).toBe("berkembang");
    const ketat = kompetensi(C1, { mastery: { minSuccess: 6 } });
    expect(proyeksi(buktiKuat(C1, 5), [ketat])[C1].status).toBe("berkembang");
  });

  it("aktivitas gedung kampus (impor Coding, game Coding Agam, quest 3D) tidak dihitung ke Academy", () => {
    const k = [kompetensi(C1)];
    const kampus = [
      ...Array.from({ length: 4 }, (_, i) => attempt([C1], { hari: i, activityId: `lama-${i}`, imported: true })),
      ...Array.from({ length: 4 }, (_, i) => attempt([C1], { hari: i, activityId: "koding-langkah" })),
      ...Array.from({ length: 4 }, (_, i) => attempt([C1], { hari: i, activityId: "quest:edukasi-buah" })),
    ];
    expect(proyeksi(kampus, k)[C1]).toMatchObject({ status: "belum", success: 0 });
    expect(proyeksi([...kampus, attempt([C1], { hari: 5, activityId: "paket-a" })], k)[C1].success).toBe(1);
  });

  it("event tanpa competencyIds atau bukan attempt diabaikan; satu attempt bisa membuktikan banyak kompetensi", () => {
    const k = [kompetensi(C1), kompetensi(C2)];
    const polos = attempt([C1]);
    polos.payload = { ...polos.payload, competencyIds: undefined };
    const p = proyeksi([polos, attempt([C1, C2])], k);
    expect(p[C1].success).toBe(1);
    expect(p[C2].success).toBe(1);
  });
});

describe("Pemantapan uji Navigator", () => {
  const id = "MAT.TKB.BILANGAN.01";
  const mulai = new Date("2026-11-26T11:00:00Z");
  const berakhir = new Date("2026-11-26T12:00:00Z");
  const uji = { mulai, berakhir };
  const inti = kompetensi(id, { core: true });
  const lama = ["a", "b", "a"].map((activityId, i) => ({
    ...attempt([id], { activityId }),
    clientAt: new Date(mulai.getTime() - (3 - i) * 1000).toISOString(),
  }));
  const baru = { ...attempt([id], { activityId: "a" }), clientAt: mulai.toISOString() };

  it("memerlukan dua jawaban latihan, lalu memenuhi syarat tanpa menambah jumlah hari", () => {
    expect(proyeksi(lama, [inti], uji)[id]).toMatchObject({ status: "berkembang", pemantapanUji: "perlu-latihan" });
    const bukti = [...lama, baru];
    expect(proyeksi(bukti, [inti])[id]).toMatchObject({ status: "berkembang", days: 1 });
    const hasil = proyeksi(bukti, [inti], uji)[id];
    expect(hasil).toMatchObject({ status: "dikuasai", days: 1, hariBenar: ["2026-11-26"], pemantapanUji: "terpenuhi" });
    expect(syaratPenguasaan(hasil, aturanUntuk(inti))).toEqual([]);

    const hanyaBaru = lama.map((e) => ({ ...e, clientAt: mulai.toISOString() }));
    expect(proyeksi([...hanyaBaru, baru], [inti], uji)[id]).not.toHaveProperty("pemantapanUji");
  });

  it.each([
    ["jawaban salah", { correct: false }],
    ["Bantu", { hintUsed: true }],
    ["status Bantu yang tidak diketahui", { hintUsed: undefined }],
    ["impor", { imported: true }],
    ["latihan ujian", { detail: { ujian: "latihan" } }],
    ["ujian resmi", { detail: { ujian: "kenaikan" } }],
    ["jawaban ulang", { detail: { percobaan: 2 } }],
  ])("%s tidak menjadi bukti baru", (_label, payload) => {
    const bukti = [...lama, { ...baru, payload: { ...baru.payload, ...payload } }];
    expect(proyeksi(bukti, [inti], uji)[id]).toMatchObject({ status: "berkembang", pemantapanUji: "perlu-latihan" });
  });

  it("tidak menghitung jawaban pada batas akhir, di luar periode, atau dari ujian sebelum periode", () => {
    const terlambat = { ...baru, clientAt: berakhir.toISOString() };
    expect(proyeksi([...lama, terlambat], [inti], uji)[id]).toMatchObject({ status: "berkembang", pemantapanUji: "perlu-latihan" });
    expect(proyeksi([...lama, baru], [inti], { mulai: berakhir, berakhir: mulai })[id]).not.toHaveProperty("pemantapanUji");
    const ujianLama = lama.map((e) => ({ ...e, payload: { ...e.payload, detail: { ujian: "semester" } } }));
    expect(proyeksi([...ujianLama, baru], [inti], uji)[id]).not.toHaveProperty("pemantapanUji");
  });

  it("mempertahankan pengecekan konteks dan hanya berlaku untuk inti Navigator bersyarat dua hari", () => {
    const bukti = [...lama, baru];
    const satuPaket = bukti.map((e) => ({ ...e, activityId: "a" }));
    expect(proyeksi(satuPaket, [inti], uji)[id]).toMatchObject({ status: "berkembang", pemantapanUji: "terpenuhi", contexts: 1 });
    for (const c of [kompetensi(id), { ...inti, level: "SD1" as const }, { ...inti, mastery: { minDays: 3 } }]) {
      expect(proyeksi(bukti, [c], uji)[id]).not.toHaveProperty("pemantapanUji");
      expect(proyeksi(bukti, [c], uji)[id].status).toBe("berkembang");
    }
  });
});

describe("ringkasTrack", () => {
  it("menghitung per track × level dan core", () => {
    const k = [kompetensi(C1, { core: true }), kompetensi(C2), kompetensi("KODE.PAUD.URUTAN.01", { core: true })];
    const peng = proyeksi([...buktiKuat(C1), attempt([C2])], k);
    expect(ringkasTrack(peng, k, "MAT", "PAUD")).toEqual({ total: 2, dikuasai: 1, berkembang: 1, belum: 0, coreDikuasai: 1, coreTotal: 1 });
    expect(ringkasTrack(peng, k, "KODE", "PAUD")).toEqual({ total: 1, dikuasai: 0, berkembang: 0, belum: 1, coreDikuasai: 0, coreTotal: 1 });
  });
});
