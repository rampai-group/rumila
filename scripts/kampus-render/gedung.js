// Tujuh tempat di Kampus RINOYA + gerbang. Pintu depan menghadap +z, asal (0,0,0) = tengah garis depan.
import * as T from "three";
import { B, M, balok, bidang, cat, cet, kanvas, panel, papan, seng, tabung, taruh } from "./bahan.js";
import { badan } from "./fasad.js";

const deret = (n, jarak, tengah = 0) => Array.from({ length: n }, (_, i) => tengah + (i - (n - 1) / 2) * jarak);

function limas(g, bahan, { w, d, h, y, puncak, z }) {
  const a = [-w / 2, y, z + d / 2];
  const b = [w / 2, y, z + d / 2];
  const c = [w / 2, y, z - d / 2];
  const e = [-w / 2, y, z - d / 2];
  const p = [-puncak / 2, y + h, z];
  const q = [puncak / 2, y + h, z];
  return bidang(g, bahan, [[a, b, q, p], [c, e, p, q], [b, c, q], [e, a, p]]);
}

function perdu(g, xs, z = 0.9, r = 0.75) {
  for (const x of xs) {
    const o = taruh(g, B.gSemak, B.mSemak, x, r * 0.5, z);
    o.scale.set(r * 1.25, r, r);
    o.rotation.y = x;
  }
}

function tangga(g, w, n = 3, z = 0) {
  for (let i = 0; i < n; i++) balok(g, cat("#d9d0c1"), w + (n - i) * 0.5, 0.2, 0.55, 0, (n - i - 1) * 0.2, z + 0.3 + i * 0.55);
}

function pot(g, x, z) {
  tabung(g, cat("#b96b4a"), 0.5, 0.34, 0.75, x, 0, z);
  taruh(g, B.gSemak, B.mSemak, x, 1.1, z).scale.setScalar(0.62);
}

function atapDatar(g, bahan, w, d, y, z, tinggi = 0.95) {
  balok(g, M("#8f9499", 0.95), w - 0.6, 0.15, d - 0.6, 0, y, z);
  for (const s of [-1, 1]) {
    balok(g, bahan, w, tinggi, 0.36, 0, y, z + (s * (d - 0.36)) / 2);
    balok(g, bahan, 0.36, tinggi, d, (s * (w - 0.36)) / 2, y, z);
  }
}

function ac(g, x, y, z) {
  balok(g, cat("#d6dade"), 1.6, 0.85, 1.25, x, y, z);
  tabung(g, B.hitam, 0.42, 0.42, 0.08, x, y + 0.85, z);
}

export function gedungUtama() {
  const g = new T.Group();
  const [w, d, h] = [38, 13, 9.6];
  const krem = cat("#f6ead4");
  const lis = cat("#fffaf0");
  const biru = seng("#1681d8");
  const atas = [-16.2, -12.6, -9, 9, 12.6, 16.2];
  badan(g, {
    w, d, h, bahan: krem,
    depan: [
      ...atas.map((x) => ({ x, y: 5.5, w: 2, h: 3.2, lengkung: true })),
      ...atas.map((x) => ({ x, y: 1.3, w: 2, h: 2.9, kisi: [2, 3] })),
    ],
    samping: [-3.7, 0, 3.7].flatMap((x) => [{ x, y: 1.3, w: 1.8, h: 2.8 }, { x, y: 5.5, w: 1.8, h: 3.1, lengkung: true }]),
  });
  balok(g, lis, w + 0.3, 0.32, d + 0.3, 0, 4.7, -d / 2);
  balok(g, lis, w + 0.7, 0.55, d + 0.7, 0, h, -d / 2);
  balok(g, lis, w + 1.1, 0.25, d + 1.1, 0, h + 0.55, -d / 2);
  limas(g, biru, { w: w + 1.6, d: d + 1.6, h: 3.5, y: h + 0.8, puncak: w - 11, z: -d / 2 });
  for (const x of [-18.3, -14.4, -10.8, 10.8, 14.4, 18.3]) balok(g, lis, 0.6, h - 0.9, 0.22, x, 0.9, 0.12);

  // sayap tengah + serambi bertiang
  const depanTengah = [
    { x: 0, y: 0.6, w: 3.4, h: 5, lengkung: true, kisi: [2, 2], bahan: B.kacaGelap },
    ...[-4.4, 4.4].map((x) => ({ x, y: 1.3, w: 1.8, h: 4.2, lengkung: true, kisi: [2, 3] })),
  ];
  badan(g, { w: 14.2, d: 3, h: 10, bahan: krem, depan: depanTengah, z: 2.2 });
  balok(g, cat("#dcd3c4"), 15.6, 0.6, 2.4, 0, 0, 3.3);
  for (const x of [-6.7, -2.5, 2.5, 6.7]) {
    balok(g, lis, 1.2, 0.5, 1.2, x, 0.6, 3.9);
    tabung(g, lis, 0.39, 0.49, 6.2, x, 1.1, 3.9);
    tabung(g, lis, 0.64, 0.4, 0.4, x, 7.1, 3.9);
    balok(g, lis, 1.35, 0.25, 1.35, x, 7.5, 3.9);
  }
  balok(g, lis, 16, 3, 2.7, 0, 7.75, 3.3);
  papan(g, "GEDUNG UTAMA", { w: 14.8, h: 2.2, y: 9.25, z: 4.85, latar: "#0b5fb5", jarak: 18 });
  papan(g, "ACADEMY", { w: 4.3, h: 0.85, y: 6.95, z: 4.62, latar: "#fffaf0", huruf: "#0b5fb5", bingkai: "#d7b978", jarak: 14 });
  const [kiri, kanan, puncak] = [[-8.4, 10.8, 4.9], [8.4, 10.8, 4.9], [0, 14, 4.9]];
  bidang(g, lis, [[kiri, kanan, puncak]]);
  const belakang = ([x, y]) => [x, y + 0.12, -3.5];
  const muka = ([x, y]) => [x, y + 0.12, 5.4];
  bidang(g, biru, [[muka(kiri), muka(puncak), belakang(puncak), belakang(kiri)], [muka(puncak), muka(kanan), belakang(kanan), belakang(puncak)]]);
  tangga(g, 8, 3, 4.5);

  // menara jam
  const z = -5;
  balok(g, krem, 5.4, 7.4, 5.4, 0, 12, z);
  for (const y of [13.6, 18.9]) balok(g, lis, 6.1, 0.4, 6.1, 0, y, z);
  limas(g, biru, { w: 6.6, d: 6.6, h: 3.4, y: 19.4, puncak: 0.01, z });
  const jam = kanvas(512, 512, (c) => {
    c.fillStyle = "#fff";
    c.fillRect(0, 0, 512, 512);
    c.translate(256, 256);
    c.fillStyle = "#16314f";
    for (let i = 0; i < 12; i++) {
      c.fillRect(-7, -226, 14, i % 3 ? 30 : 54);
      c.rotate(Math.PI / 6);
    }
    c.lineCap = "round";
    c.lineWidth = 24;
    c.strokeStyle = "#16314f";
    for (const [x, y] of [[-76, -70], [128, -92]]) {
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(x, y);
      c.stroke();
    }
  });
  for (let i = 0; i < 4; i++) {
    const q = new T.Group();
    q.position.set(0, 16.4, z);
    q.rotation.y = (i * Math.PI) / 2;
    g.add(q);
    taruh(q, new T.TorusGeometry(1.9, 0.18, 10, 48), B.emas, 0, 0, 2.8);
    taruh(q, new T.CircleGeometry(1.85, 48), M("#fff", 0.3, { map: jam }), 0, 0, 2.8);
  }
  tabung(g, B.logam, 0.08, 0.12, 5, 0, 22.7, z, 10).userData.tanpaSiluet = true;
  const kain = new T.PlaneGeometry(3.6, 2.4, 24, 4).translate(1.8, 0, 0);
  const pos = kain.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(pos.getX(i) * 2.2) * 0.22);
  kain.computeVertexNormals();
  const bendera = kanvas(64, 64, (c) => {
    c.fillStyle = "#e8232f";
    c.fillRect(0, 0, 64, 32);
    c.fillStyle = "#fff";
    c.fillRect(0, 32, 64, 32);
  });
  taruh(g, kain, M("#fff", 0.85, { map: bendera, side: T.DoubleSide }), 0.1, 26.4, z).userData.tanpaSiluet = true;

  perdu(g, deret(8, 1.35, -13), 1, 0.8);
  perdu(g, deret(8, 1.35, 13), 1, 0.8);
  for (const x of [-5, 5]) pot(g, x, 6.2);
  return g;
}

export function gedungLab() {
  const g = new T.Group();
  const [w, d, h] = [19.5, 11.5, 10.4];
  const navy = panel("#2b3284");
  badan(g, {
    w, d, h, bahan: panel("#eef1f6"), kusen: "#2b3284",
    depan: [
      ...[-7, -3.6, 3.6, 7].map((x) => ({ x, y: 4.65, w: 2.7, h: 2.3, kisi: [3, 1] })),
      ...[-7, 7].map((x) => ({ x, y: 1, w: 3.2, h: 2.6, kisi: [3, 1] })),
      { x: 0, y: 0.02, w: 5, h: 3.4, kisi: [4, 1], bahan: B.kacaGelap },
    ],
    samping: [-3.3, 0, 3.3].flatMap((x) => [{ x, y: 1, w: 2.2, h: 2.5 }, { x, y: 4.65, w: 2.2, h: 2.3 }]),
  });
  atapDatar(g, navy, w + 0.7, d + 0.7, h, -d / 2);
  balok(g, navy, w + 0.2, 0.3, 0.4, 0, 4, 0.12);
  // sirip peneduh
  for (const x of [-9.4, -5.3, 5.3, 9.4]) balok(g, navy, 0.22, 2.9, 0.8, x, 4.4, 0.4);
  papan(g, "LABORATORIUM 3D", { w: 18.4, h: 2.2, y: 8.85, z: 0.2, latar: "#252b7c", jarak: 6 });
  balok(g, navy, 6.6, 0.3, 1.6, 0, 3.6, 0.8);
  for (const x of [-2.9, 2.9]) tabung(g, B.logam, 0.11, 0.11, 3.6, x, 0, 1.4, 12);
  balok(g, cat("#d5d8dc"), 7.4, 0.12, 3, 0, 0, 1.5);

  const atom = M("#6656ff", 0.3, { metalness: 0.4, emissive: "#3325c9", emissiveIntensity: 0.4 });
  for (let i = 0; i < 3; i++) {
    const c = taruh(g, new T.TorusGeometry(1.25, 0.09, 8, 48), atom, 0, 5.8, 0.4);
    c.scale.y = 0.4;
    c.rotation.z = (i * Math.PI) / 3;
  }
  taruh(g, new T.SphereGeometry(0.3), atom, 0, 5.8, 0.45);

  // observatorium
  const [x, z] = [4.8, -5.4];
  tabung(g, panel("#d8dde8"), 3.5, 3.6, 1.6, x, h, z, 48);
  taruh(g, new T.SphereGeometry(3.45, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshPhysicalMaterial({ color: "#39419c", metalness: 0.7, roughness: 0.22, clearcoat: 0.8 }), x, h + 1.6, z);
  taruh(g, new T.SphereGeometry(3.5, 10, 24, Math.PI / 2 - 0.17, 0.34, 0, Math.PI / 2), B.hitam, x, h + 1.6, z);
  taruh(g, new T.CylinderGeometry(0.42, 0.56, 3.4, 24), B.putih, x, h + 4.3, z + 1.9).rotation.x = 0.85;
  for (let i = 1; i < 4; i++) taruh(g, new T.TorusGeometry(3.47, 0.045, 6, 40, Math.PI), B.logam, x, h + 1.6, z).rotation.y = (i * Math.PI) / 4;

  const surya = M("#17375e", 0.15, { metalness: 0.7 });
  for (const sx of [-7.2, -4.3, -1.4])
    for (const sz of [-3.4, -7.4]) {
      const p = balok(g, surya, 2.6, 0.12, 2.9, sx, h + 0.6, sz);
      p.rotation.x = 0.32;
      balok(g, B.logam, 0.15, 0.6, 1.4, sx, h + 0.1, sz);
    }
  perdu(g, [-8.4, -7.1, -5.8, 5.8, 7.1, 8.4], 0.9, 0.62);
  for (const px of [-3.6, 3.6]) pot(g, px, 2.6);
  return g;
}

export function gedungKomputer() {
  const g = new T.Group();
  const [w, d, h] = [19.5, 11.5, 11];
  const ungu = panel("#7548d8");
  const tua = panel("#4a2398");
  const layar = (isi, dasar) => {
    const t = kanvas(320, 220, (c, W, H) => {
      const q = c.createLinearGradient(0, 0, W, H);
      q.addColorStop(0, dasar);
      q.addColorStop(1, "#0d2038");
      c.fillStyle = q;
      c.fillRect(0, 0, W, H);
      c.fillStyle = isi;
      for (let i = 0; i < 6; i++) c.fillRect(28 + (i % 3) * 22, 28 + i * 28, [150, 96, 180, 70, 130, 100][i], 11);
    });
    t.repeat.set(1 / 3, 1 / 2.4);
    t.wrapS = t.wrapT = T.RepeatWrapping;
    return M("#fff", 0.12, { map: t, emissiveMap: t, emissive: "#fff", emissiveIntensity: 0.5, metalness: 0.2 });
  };
  const L = [layar("#86f7e5", "#145d70"), layar("#ffe38a", "#584a2c"), layar("#acd2ff", "#1c4c91"), layar("#ffb1df", "#68335f")];
  badan(g, {
    w, d, h, bahan: ungu, kusen: "#26233f", kaki: cat("#3b3550"),
    depan: [
      ...[-7.1, -2.5, 2.5, 7.1].map((x, i) => ({ x, y: 4.8, w: 3.5, h: 2.6, kisi: [1, 1], bahan: L[i] })),
      ...[-6.9, 6.9].map((x, i) => ({ x, y: 1, w: 3.8, h: 2.6, kisi: [1, 1], bahan: L[(i + 2) % 4] })),
      { x: 0, y: 0.02, w: 5.2, h: 3.4, kisi: [4, 1], bahan: B.kacaGelap },
    ],
    samping: [-2.6, 2.6].flatMap((x) => [{ x, y: 1, w: 3.2, h: 2.5, kisi: [3, 1] }, { x, y: 4.8, w: 3.2, h: 2.5, kisi: [3, 1] }]),
  });
  atapDatar(g, tua, w + 0.8, d + 0.8, h, -d / 2);
  balok(g, tua, w + 0.2, 0.34, 0.5, 0, 4.05, 0.18);
  for (const x of [-9.5, 9.5]) balok(g, panel("#f3f1fa"), 0.5, h, 0.6, x, 0, 0.2);
  papan(g, "LAB KOMPUTER", { w: 18.2, h: 2.4, y: 9.35, z: 0.22, latar: "#fff", huruf: "#4a2398", bingkai: "#4a2398", jarak: 8 });
  balok(g, tua, 6.6, 0.45, 1.1, 0, 3.6, 0.55);
  papan(g, "</>", { w: 3, h: 0.9, y: 3.9, z: 1.15, latar: "#4a2398", bingkai: "#4a2398" });
  balok(g, cat("#d5d8dc"), 7.4, 0.12, 3, 0, 0, 1.5);

  tabung(g, B.logam, 0.14, 0.2, 2.5, 6.1, h, -6, 12);
  const p = taruh(g, new T.SphereGeometry(2.2, 40, 12, 0, Math.PI * 2, Math.PI * 0.7, Math.PI * 0.3), M("#e8e2f5", 0.3, { side: T.DoubleSide, metalness: 0.5 }), 6.1, h + 4.1, -6);
  p.rotation.set(0.8, 0, -0.4);
  taruh(g, new T.CylinderGeometry(0.04, 0.04, 1.6), B.logam, 6.4, h + 3.4, -5.1).rotation.x = 0.9;
  tabung(g, B.logam, 0.06, 0.12, 4, -7.6, h, -8, 10);
  taruh(g, new T.SphereGeometry(0.28), M("#22c55e", 0.3, { emissive: "#22c55e" }), -7.6, h + 4.1, -8);
  for (const x of [-5.2, -2.6, 1.2]) ac(g, x, h + 0.15, -5.6);
  perdu(g, [-8.3, -6.9, -5.5, 5.5, 6.9, 8.3], 0.9, 0.62);
  for (const px of [-3.6, 3.6]) pot(g, px, 2.6);
  return g;
}

export function mushola() {
  const g = new T.Group();
  const [w, d, h] = [15.5, 11.5, 7.6];
  const putih = cat("#fbf6ea");
  const hijau = cet("#17864a");
  const pirus = new T.MeshPhysicalMaterial({ color: "#2f9c90", metalness: 0.65, roughness: 0.12 });
  const x0 = -1.5;
  badan(g, {
    w, d, h, x: x0, bahan: putih, kusen: "#17864a",
    depan: [
      ...[-5.3, 5.3].map((x) => ({ x, y: 1.2, w: 1.9, h: 3.8, lengkung: true, kisi: [3, 4], bahan: pirus })),
      { x: 0, y: 0.02, w: 3.5, h: 4.9, lengkung: true, kisi: [2, 3], bahan: B.kacaGelap },
    ],
    samping: [-3.4, 0, 3.4].map((x) => ({ x, y: 1.2, w: 1.8, h: 3.8, lengkung: true, kisi: [3, 4], bahan: pirus })),
  });
  balok(g, putih, w + 0.6, 0.4, d + 0.6, x0, h, -d / 2);
  balok(g, hijau, w + 0.9, 0.42, d + 0.9, x0, h + 0.4, -d / 2);
  const rangka = taruh(g, new T.TorusGeometry(2.25, 0.2, 10, 40, Math.PI), B.emas, x0, 3.18, 0.3);
  rangka.scale.y = 1.05;
  papan(g, "MUSHOLA", { w: 11.6, h: 2, y: 6.7, z: 0.6, x: x0, latar: "#14763f", bingkai: "#e9c977", jarak: 14 });
  for (const x of [x0 - 7.2, x0 + 7.2]) balok(g, putih, 0.8, h, 0.5, x, 0, 0.2);

  // kubah dengan rusuk
  const z = -6;
  const r = 4.7;
  tabung(g, putih, r, r, 1.3, x0, h + 0.82, z, 64);
  tabung(g, B.emas, r + 0.1, r + 0.1, 0.16, x0, h + 2.1, z, 64);
  const profil = [];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32;
    profil.push(new T.Vector2(r * Math.pow(Math.cos((t * Math.PI) / 2), 0.68) * (1 + 0.08 * Math.sin(Math.PI * Math.min(1, t * 2))) + 0.001, t * 5.2));
  }
  const alas = h + 2.2;
  taruh(g, new T.LatheGeometry(profil, 64), new T.MeshPhysicalMaterial({ color: "#1b9a55", metalness: 0.5, roughness: 0.22, clearcoat: 0.8 }), x0, alas, z);
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const kurva = new T.CatmullRomCurve3(profil.map((p) => new T.Vector3(Math.cos(a) * p.x * 1.005, p.y, Math.sin(a) * p.x * 1.005)));
    taruh(g, new T.TubeGeometry(kurva, 32, 0.05, 6), B.emas, x0, alas, z);
  }
  tabung(g, B.emas, 0.07, 0.2, 1, x0, alas + 5.1, z);
  const sabit = new T.Shape();
  sabit.absarc(0, 0, 1, 0.579, Math.PI - 0.579, true);
  sabit.absarc(0, 0.4, 0.85, Math.PI - 0.174, 0.174, false);
  taruh(g, new T.ExtrudeGeometry(sabit, { depth: 0.14, bevelEnabled: false }), B.emas, x0, alas + 6.9, z);

  // menara
  const [mx, mz] = [7.8, -1.2];
  tabung(g, B.mBatu, 1.4, 1.5, 1.2, mx, 0, mz);
  tabung(g, putih, 0.98, 1.15, 11.6, mx, 1.2, mz);
  for (const y of [7.2, 11.4]) {
    tabung(g, hijau, 1.5, 1.2, 0.5, mx, y, mz);
    taruh(g, new T.TorusGeometry(1.45, 0.06, 6, 32), B.emas, mx, y + 1.15, mz).rotation.x = Math.PI / 2;
    for (let i = 0; i < 12; i++) tabung(g, B.emas, 0.035, 0.035, 0.65, mx + Math.cos(i / 1.91) * 1.45, y + 0.5, mz + Math.sin(i / 1.91) * 1.45, 6);
  }
  taruh(g, new T.ConeGeometry(1.4, 3.4, 32), hijau, mx, 14.5, mz);
  taruh(g, new T.SphereGeometry(0.28), B.emas, mx, 16.4, mz);

  balok(g, cat("#e2d8c8"), 5.8, 0.18, 2.2, x0, 0, 1.1);
  balok(g, cat("#e2d8c8"), 6.6, 0.1, 3.2, x0, 0, 1.6);
  perdu(g, [-7.6, -6.2, 3.4, 4.8], 0.9, 0.6);
  return g;
}

export function taman() {
  const g = new T.Group();
  const [merah, biru, kuning, hijau, jingga] = ["#e23d36", "#176fd0", "#f7bd24", "#2fae60", "#f07820"].map(cet);
  balok(g, cat("#e7d9bf"), 20.4, 0.16, 14.4, 0, 0, -7.2);
  balok(g, M("#c98957", 0.98), 19.6, 0.2, 13.6, 0, 0, -7.2);
  for (const [x, z, r, c] of [[-5.5, -7, 3.4, "#3f86c9"], [4.6, -8, 3.6, "#57a868"], [2, -3.2, 1.8, "#e6b84a"]]) taruh(g, new T.CircleGeometry(r, 48).rotateX(-Math.PI / 2), M(c, 0.95), x, 0.215, z);

  // menara + perosotan
  const [tx, tz] = [-6.2, -8.6];
  for (const a of [-1.5, 1.5]) for (const b of [-1.5, 1.5]) tabung(g, biru, 0.16, 0.16, 8.2, tx + a, 0.2, tz + b, 14);
  balok(g, B.mKayu, 3.4, 0.25, 3.4, tx, 4.2, tz);
  for (const y of [5, 5.7]) {
    balok(g, kuning, 3, 0.14, 0.12, tx, y, tz - 1.5);
    balok(g, kuning, 0.12, 0.14, 3, tx - 1.5, y, tz);
  }
  limas(g, seng("#e23d36"), { w: 4.6, d: 4.6, h: 2.2, y: 8.3, puncak: 0.01, z: tz }).position.x = tx;
  for (let i = 1; i < 8; i++) balok(g, merah, 2.2, 0.12, 0.15, tx, i * 0.55, tz + 1.65);
  const jalur = new T.CatmullRomCurve3([[tx + 1.6, 4.5, tz], [tx + 3.4, 3.6, tz + 0.5], [tx + 4.3, 1.8, tz + 2.6], [tx + 4.5, 0.55, tz + 4.6]].map((a) => new T.Vector3(...a)));
  taruh(g, new T.TubeGeometry(jalur, 40, 0.68, 16), kuning);

  // ayunan
  const [ay, az, ax] = [6, -9, [1.2, 8.4]];
  for (const x of ax)
    for (const s of [-1, 1]) taruh(g, new T.CylinderGeometry(0.17, 0.17, Math.hypot(ay, 2.4), 14), jingga, x, ay / 2 + 0.2, az + s * 1.2).rotation.x = -s * Math.atan2(2.4, ay);
  balok(g, jingga, 7.8, 0.32, 0.32, 4.8, ay + 0.1, az);
  for (const [x, ayun] of [[3.2, 0.4], [6.5, -0.28]]) {
    const p = new T.Group();
    p.position.set(x, ay + 0.1, az);
    p.rotation.x = ayun;
    g.add(p);
    for (const s of [-0.6, 0.6]) tabung(p, B.logam, 0.04, 0.04, 4.8, s, -4.8, 0, 6);
    balok(p, merah, 1.6, 0.16, 0.75, 0, -4.9, 0);
  }

  // panjatan kubah + jungkat-jungkit
  for (let i = 0; i < 5; i++) taruh(g, new T.TorusGeometry(1.8, 0.08, 8, 28, Math.PI), hijau, 7.2, 0.2, -4).rotation.y = (i * Math.PI) / 5;
  taruh(g, new T.TorusGeometry(1.45, 0.07, 8, 28), hijau, 7.2, 1.28, -4).rotation.x = Math.PI / 2;
  balok(g, biru, 0.6, 0.9, 0.6, 2, 0.2, -3.6);
  balok(g, merah, 4, 0.18, 0.65, 2, 1.1, -3.6).rotation.z = 0.2;

  // papan nama rendah di depan
  for (const x of [-7.6, 7.6]) {
    balok(g, B.mBata, 1.1, 2.9, 1.1, x, 0, 0.4);
    balok(g, cat("#eee5d6"), 1.4, 0.25, 1.4, x, 2.9, 0.4);
    taruh(g, new T.SphereGeometry(0.5, 24, 16), jingga, x, 3.65, 0.4);
  }
  papan(g, "TAMAN BERMAIN", { w: 15.4, h: 2.3, y: 2, z: 1, latar: "#e9741c", jarak: 8 });
  perdu(g, [-9.6, 9.6], 0.7, 0.8);
  return g;
}

export function kantorGuru() {
  const g = new T.Group();
  const [w, d, h] = [14, 9, 6.5];
  badan(g, {
    w, d, h, bahan: cat("#f7ead1"), kaki: B.mBata, kusen: "#7b4a31",
    depan: [
      ...[-4.4, 4.4].map((x) => ({ x, y: 1.2, w: 2.8, h: 2.3, kisi: [3, 2] })),
      { x: 0, y: 0.02, w: 2.3, h: 3.5, kisi: [2, 1], bahan: B.mKayu },
    ],
    samping: [-2, 2].map((x) => ({ x, y: 1.2, w: 2, h: 2.3 })),
  });
  balok(g, cat("#fffaf0"), w + 1.2, 0.3, d + 1.2, 0, h, -d / 2);
  const genteng = new T.MeshStandardMaterial({ map: B.genteng, bumpMap: B.genteng, bumpScale: 2, color: "#f2b89c", roughness: 0.85, side: T.DoubleSide });
  limas(g, genteng, { w: w + 1.9, d: d + 1.9, h: 3.4, y: h + 0.3, puncak: 5, z: -d / 2 });
  balok(g, cet("#8c3d2a"), 5.2, 0.22, 0.32, 0, h + 3.6, -d / 2);
  papan(g, "KANTOR GURU", { w: 12.8, h: 2, y: 5.2, z: 0.3, latar: "#9b402c", jarak: 8 });
  for (const x of [-1.9, 1.9]) tabung(g, cat("#fffaf0"), 0.15, 0.18, 3.6, x, 0, 1.4, 14);
  balok(g, seng("#9b402c"), 4.6, 0.2, 1.8, 0, 3.62, 0.9);
  tangga(g, 2.8, 2);
  perdu(g, [-5.8, -4.5, -3.2, 3.2, 4.5, 5.8], 0.9, 0.56);
  return g;
}

export function posSatpam() {
  const g = new T.Group();
  const [w, d, h] = [9.6, 6.4, 6.1];
  const x0 = -1.3;
  const biru = panel("#0b5fb5");
  badan(g, {
    w, d, h, x: x0, bahan: panel("#f1f5f8"), kusen: "#16314f", kaki: cet("#0b5fb5"),
    depan: [{ x: -1.5, y: 1.3, w: 5, h: 2.2, kisi: [3, 1] }, { x: 3.1, y: 0.02, w: 2, h: 3.5, kisi: [1, 2], bahan: B.kacaGelap }],
    samping: [{ x: 0, y: 1.3, w: 4, h: 2.2, kisi: [3, 1] }],
  });
  balok(g, biru, w + 1.5, 0.55, d + 1.5, x0, h, -d / 2 + 0.2);
  balok(g, cat("#cfd5da"), w, 0.12, d, x0, h + 0.55, -d / 2);
  ac(g, x0 - 2.2, h + 0.67, -3.4);
  papan(g, "POS SATPAM", { w: 9.2, h: 1.9, y: 4.8, z: 0.3, x: x0, latar: "#fff", huruf: "#0b5fb5", bingkai: "#0b5fb5", jarak: 8 });
  balok(g, cet("#f4b728"), 0.8, 1.9, 0.8, 4.2, 0, 1.4);
  for (let i = 0; i < 7; i++) balok(g, cet(i % 2 ? "#fff" : "#df2e32"), 0.75, 0.24, 0.16, 4.7 + i * 0.75, 1.5, 1.4);
  return g;
}

export function gerbang() {
  const g = new T.Group();
  for (const s of [-1, 1]) {
    balok(g, B.mBatu, 2, 1.1, 2, s * 6.6, 0, 0);
    balok(g, B.mBata, 1.6, 5.4, 1.6, s * 6.6, 1.1, 0);
    balok(g, cat("#fffaf0"), 2, 0.35, 2, s * 6.6, 6.5, 0);
    taruh(g, new T.SphereGeometry(0.45, 20, 12), M("#fff2c4", 0.3, { emissive: "#ffd98a", emissiveIntensity: 0.4 }), s * 6.6, 7.3, 0);
  }
  const lengkung = new T.QuadraticBezierCurve3(new T.Vector3(-6.6, 6.4, 0), new T.Vector3(0, 11.2, 0), new T.Vector3(6.6, 6.4, 0));
  taruh(g, new T.TubeGeometry(lengkung, 40, 0.28, 12), cet("#0b5fb5"));
  papan(g, "KAMPUS RINOYA", { w: 14.4, h: 2.2, y: 7.9, z: 0.5, latar: "#0b5fb5", jarak: 10 });
  return g;
}
