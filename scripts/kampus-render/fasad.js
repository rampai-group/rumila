// Fasad berlubang sungguhan: dinding tebal, kusen, kaca masuk ke dalam, ambang, dan kaki dinding.
import * as T from "three";
import { B, balok, cat, cet, taruh } from "./bahan.js";

const TEBAL = 0.42;

function garis(jalur, { x, y, w, h, lengkung }, lebih = 0) {
  const a = x - w / 2 - lebih;
  const b = x + w / 2 + lebih;
  const r = (b - a) / 2;
  const atas = y + h + lebih;
  jalur.moveTo(a, y - lebih);
  jalur.lineTo(b, y - lebih);
  if (lengkung) {
    jalur.lineTo(b, atas - r);
    jalur.absarc(x, atas - r, r, 0, Math.PI, false);
  } else {
    jalur.lineTo(b, atas);
    jalur.lineTo(a, atas);
  }
  jalur.lineTo(a, y - lebih);
  return jalur;
}

/** Dinding menghadap +z dengan muka di z = 0. */
export function dinding(p, bahan, w, h, bukaan, { kusen = "#ffffff", kaca = B.kaca } = {}) {
  const s = new T.Shape([new T.Vector2(-w / 2, 0), new T.Vector2(w / 2, 0), new T.Vector2(w / 2, h), new T.Vector2(-w / 2, h)]);
  for (const o of bukaan) s.holes.push(garis(new T.Path(), o));
  taruh(p, new T.ExtrudeGeometry(s, { depth: TEBAL, bevelEnabled: false, curveSegments: 24 }), bahan, 0, 0, -TEBAL);
  const mk = cet(kusen);
  for (const o of bukaan) {
    taruh(p, new T.ShapeGeometry(garis(new T.Shape(), o), 24), o.bahan ?? kaca, 0, 0, -TEBAL + 0.1);
    const f = garis(new T.Shape(), o, 0.13);
    f.holes.push(garis(new T.Path(), o));
    taruh(p, new T.ExtrudeGeometry(f, { depth: 0.16, bevelEnabled: false, curveSegments: 24 }), mk, 0, 0, -0.05);
    const tinggi = o.lengkung ? o.h - o.w / 2 : o.h;
    const n = o.kisi ?? [2, 2];
    for (let i = 1; i < n[0]; i++) balok(p, mk, 0.1, o.lengkung ? o.h - 0.05 : o.h, 0.1, o.x - o.w / 2 + (o.w * i) / n[0], o.y, -TEBAL + 0.17);
    for (let i = 1; i < n[1]; i++) balok(p, mk, o.w, 0.1, 0.1, o.x, o.y + (tinggi * i) / n[1], -TEBAL + 0.17);
    if (o.lengkung) balok(p, mk, o.w, 0.12, 0.12, o.x, o.y + tinggi, -TEBAL + 0.17);
    if (o.y > 0.3) balok(p, cat("#e6ddcf"), o.w + 0.5, 0.17, 0.44, o.x, o.y - 0.29, 0.1);
  }
}

/** Massa bangunan: muka depan di z = 0, badan ke arah -z. */
export function badan(g, { w, d, h, bahan, depan, samping = [], kusen, kaca, kaki = B.mBatu, x = 0, z = 0 }) {
  const p = new T.Group();
  p.position.set(x, 0, z);
  g.add(p);
  balok(p, bahan, w - TEBAL * 2, h - 0.05, d - TEBAL * 2, 0, 0, -d / 2);
  dinding(p, bahan, w, h, depan, { kusen, kaca });
  for (const sisi of [-1, 1]) {
    const q = new T.Group();
    q.position.set((sisi * w) / 2, 0, -d / 2);
    q.rotation.y = (sisi * Math.PI) / 2;
    p.add(q);
    dinding(q, bahan, d, h, samping, { kusen, kaca });
  }
  balok(p, bahan, w, h, TEBAL, 0, 0, -d + TEBAL / 2);
  if (kaki) {
    // kaki dinding terputus di pintu
    const pintu = depan.filter((o) => o.y < 0.3).sort((a, b) => a.x - b.x);
    let kiri = -w / 2 - 0.08;
    for (const o of [...pintu, { x: w / 2 + 0.08, w: 0 }]) {
      const kanan = o.x - o.w / 2;
      if (kanan - kiri > 0.1) balok(p, kaki, kanan - kiri, 0.95, 0.2, (kiri + kanan) / 2, 0, 0.06);
      kiri = o.x + o.w / 2;
    }
    for (const sisi of [-1, 1]) balok(p, kaki, 0.2, 0.95, d, sisi * (w / 2 + 0.05), 0, -d / 2);
  }
  return p;
}
