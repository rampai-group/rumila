// Bahan dan bentuk dasar untuk render kampus. Satuan = meter, tekstur mengikuti ukuran benda.
import * as T from "three";

let biji = 73;
export const acak = (a = 0, b = 1) => ((biji = (biji * 16807) % 2147483647), a + ((b - a) * biji) / 2147483647);
export const benih = (n) => (biji = n);
export const B = {};

export const M = (color, roughness = 0.75, o = {}) => new T.MeshStandardMaterial({ color, roughness, ...o });

export function kanvas(w, h, gambar, { warna = true, ulang } = {}) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  gambar(c.getContext("2d"), w, h);
  const t = new T.CanvasTexture(c);
  if (warna) t.colorSpace = T.SRGBColorSpace;
  t.anisotropy = 16;
  if (ulang) {
    t.wrapS = t.wrapT = T.RepeatWrapping;
    t.repeat.set(...ulang);
  }
  return t;
}

async function foto(nama, rx = 1, ry = rx) {
  const t = await new T.TextureLoader().loadAsync(`/publik/${nama}.webp`);
  t.colorSpace = T.SRGBColorSpace;
  t.wrapS = t.wrapT = T.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.anisotropy = 16;
  return t;
}

const bintik = (c, w, h, n, gelap, besar = 2) => {
  for (let i = 0; i < n; i++) {
    c.fillStyle = `rgba(${gelap},${acak(0.015, 0.09)})`;
    c.fillRect(acak(0, w), acak(0, h), acak(1, besar), acak(1, besar));
  }
};

export async function siapkanBahan() {
  B.rumput = await foto("roket/textures/grass-albedo", 1 / 5);
  B.kulit = await foto("roket/textures/bark-albedo", 1, 3);
  B.daun = await foto("roket/textures/tropical-leaves");
  B.genteng = await foto("fruits/garden/realism/roof", 1 / 4);
  B.batu = await foto("fruits/garden/realism/stone", 1 / 3);
  B.kayu = await foto("fruits/garden/realism/wood", 1 / 2);
  B.langit = await foto("roket/latar-360");
  B.langit.mapping = T.EquirectangularReflectionMapping;

  B.plester = kanvas(512, 512, (c, w, h) => {
    c.fillStyle = "#f7f7f7";
    c.fillRect(0, 0, w, h);
    bintik(c, w, h, 16000, "70,62,52", 3);
  }, { ulang: [0.3, 0.3] });
  B.bata = kanvas(512, 512, (c, w, h) => {
    c.fillStyle = "#d8cbb9";
    c.fillRect(0, 0, w, h);
    for (let y = 0, r = 0; y < h; y += 32, r++)
      for (let x = -64; x < w; x += 64) {
        c.fillStyle = `hsl(${acak(12, 20)},${acak(38, 50)}%,${acak(36, 48)}%)`;
        c.fillRect(x + (r % 2) * 32 + 2, y + 2, 59, 27);
      }
    bintik(c, w, h, 9000, "30,20,10");
  }, { ulang: [0.45, 0.45] });
  B.panel = kanvas(512, 512, (c, w, h) => {
    c.fillStyle = "#f2f2f2";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "rgba(0,0,0,.2)";
    for (let i = 0; i < 4; i++) {
      c.fillRect(0, i * 128, w, 3);
      c.fillRect(i * 256, 0, 3, h);
    }
    bintik(c, w, h, 5000, "40,40,40");
  }, { ulang: [0.2, 0.24] });
  B.seng = kanvas(256, 256, (c, w, h) => {
    c.fillStyle = "#dedede";
    c.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 64) {
      c.fillStyle = "#fff";
      c.fillRect(x, 0, 7, h);
      c.fillStyle = "#8f8f8f";
      c.fillRect(x + 7, 0, 4, h);
    }
  }, { ulang: [0.4, 0.4] });
  B.paving = kanvas(512, 512, (c, w, h) => {
    c.fillStyle = "#a58f70";
    c.fillRect(0, 0, w, h);
    for (let y = 0, r = 0; y < h; y += 32, r++)
      for (let x = -64; x < w; x += 64) {
        c.fillStyle = `hsl(${acak(30, 40)},${acak(25, 38)}%,${acak(70, 82)}%)`;
        c.fillRect(x + (r % 2) * 32 + 2, y + 2, 60, 28);
      }
    bintik(c, w, h, 6000, "90,70,50");
  }, { ulang: [0.25, 0.25] });
  B.aspal = kanvas(512, 512, (c, w, h) => {
    c.fillStyle = "#555b62";
    c.fillRect(0, 0, w, h);
    bintik(c, w, h, 24000, "10,10,12", 3);
    bintik(c, w, h, 9000, "220,220,220");
  }, { ulang: [0.16, 0.16] });

  B.kaca = new T.MeshPhysicalMaterial({ color: "#8dc0ea", metalness: 0.55, roughness: 0.06, envMapIntensity: 1.2, emissive: "#174a73", emissiveIntensity: 0.55 });
  B.kacaGelap = new T.MeshPhysicalMaterial({ color: "#3c76a3", metalness: 0.6, roughness: 0.08, envMapIntensity: 1.1, emissive: "#0d2c4a", emissiveIntensity: 0.5 });
  B.logam = M("#9aa3ab", 0.3, { metalness: 0.85 });
  B.hitam = M("#252b32", 0.5);
  B.putih = M("#faf8f2", 0.5);
  B.emas = M("#e9b22c", 0.22, { metalness: 0.95 });
  B.mBatu = new T.MeshStandardMaterial({ map: B.batu, roughness: 0.95, color: "#d8d0c4" });
  B.mBata = new T.MeshStandardMaterial({ map: B.bata, bumpMap: B.bata, bumpScale: 1, roughness: 0.9 });
  B.mPaving = new T.MeshStandardMaterial({ map: B.paving, bumpMap: B.paving, bumpScale: 0.6, roughness: 0.92 });
  B.mKayu = new T.MeshStandardMaterial({ map: B.kayu, color: "#c98a55", roughness: 0.6 });
}

const simpan = new Map();
const sekali = (kunci, buat) => simpan.get(kunci) ?? (simpan.set(kunci, buat()), simpan.get(kunci));
export const cat = (c) => sekali("cat" + c, () => new T.MeshStandardMaterial({ color: c, map: B.plester, bumpMap: B.plester, bumpScale: 0.5, roughness: 0.8 }));
export const panel = (c) => sekali("panel" + c, () => new T.MeshStandardMaterial({ color: c, map: B.panel, roughness: 0.42, metalness: 0.2 }));
export const seng = (c) => sekali("seng" + c, () => new T.MeshStandardMaterial({ color: c, map: B.seng, bumpMap: B.seng, bumpScale: 1.4, roughness: 0.36, metalness: 0.4, side: T.DoubleSide }));
export const cet = (c) => sekali("cet" + c, () => M(c, 0.32, { metalness: 0.15 }));

export function taruh(p, g, m, x = 0, y = 0, z = 0) {
  const o = new T.Mesh(g, m);
  o.position.set(x, y, z);
  o.castShadow = o.receiveShadow = true;
  p.add(o);
  return o;
}

/** Balok dengan UV dalam meter; x/z = tengah, y = alas. */
export function balok(p, m, w, h, d, x = 0, y = 0, z = 0) {
  const g = new T.BoxGeometry(w, h, d);
  const pos = g.attributes.position;
  const n = g.attributes.normal;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    if (Math.abs(n.getX(i)) > 0.5) uv.setXY(i, pos.getZ(i), pos.getY(i));
    else if (Math.abs(n.getY(i)) > 0.5) uv.setXY(i, pos.getX(i), pos.getZ(i));
    else uv.setXY(i, pos.getX(i), pos.getY(i));
  }
  return taruh(p, g, m, x, y + h / 2, z);
}

export const tabung = (p, m, a, b, h, x = 0, y = 0, z = 0, n = 28) => taruh(p, new T.CylinderGeometry(a, b, h, n), m, x, y + h / 2, z);

/** Permukaan dari segitiga/segiempat, UV mengikuti kemiringan bidang. */
export function bidang(p, m, muka) {
  const pos = [];
  const uv = [];
  for (const f of muka) {
    const v = f.map((a) => new T.Vector3(...a));
    const u = v[1].clone().sub(v[0]).normalize();
    const n = u.clone().cross(v[2].clone().sub(v[0])).normalize();
    const w = n.clone().cross(u);
    for (const tiga of v.length === 4 ? [[0, 1, 2], [0, 2, 3]] : [[0, 1, 2]])
      for (const i of tiga) {
        pos.push(v[i].x, v[i].y, v[i].z);
        const r = v[i].clone().sub(v[0]);
        uv.push(r.dot(u), r.dot(w));
      }
  }
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return taruh(p, g, m);
}

/** Papan nama: pelat berbingkai + huruf Baloo. */
export function papan(p, teks, { w, h, x = 0, y, z, latar, huruf = "#fff", bingkai = "#fff", jarak = 4, ukuran = 0.76 }) {
  balok(p, cet(bingkai), w + 0.36, h + 0.36, 0.22, x, y - h / 2 - 0.18, z);
  const t = kanvas(1600, Math.round((1600 * h) / w), (c, W, H) => {
    c.fillStyle = latar;
    c.fillRect(0, 0, W, H);
    let f = H * ukuran;
    c.letterSpacing = `${jarak}px`;
    c.font = `800 ${f}px Kampus`;
    while (c.measureText(teks).width > W * 0.94) c.font = `800 ${(f -= 3)}px Kampus`;
    c.fillStyle = huruf;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(teks, W / 2, H / 2 + f * 0.06);
  });
  // sedikit menyala supaya nama tetap terbaca di sisi bayangan
  const m = new T.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: "#fff", emissiveIntensity: 0.28, roughness: 0.5 });
  const o = taruh(p, new T.PlaneGeometry(w, h), m, x, y, z + 0.13);
  o.castShadow = false;
}
