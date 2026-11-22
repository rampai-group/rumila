// Merakit adegan, membingkai otomatis, lalu merata-rata banyak sampel matahari + cahaya langit (bayangan lembut & oklusi).
import * as T from "three";
import { B, benih, siapkanBahan } from "./bahan.js";
import { DENAH } from "./denah.js";
import { lingkungan, siapkanTanaman } from "./lingkungan.js";
import * as G from "./gedung.js";

const PEMBUAT = { utama: G.gedungUtama, lab: G.gedungLab, komputer: G.gedungKomputer, taman: G.taman, musala: G.mushola, kantor: G.kantorGuru, pos: G.posSatpam };
let R;

window.siapkan = async () => {
  const f = new FontFace("Kampus", "url(/font/Baloo2.woff2)", { weight: "400 800" });
  await f.load();
  document.fonts.add(f);
  await siapkanBahan();
  benih(73);
  siapkanTanaman();
  R = new T.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
  R.setPixelRatio(1);
  R.toneMappingExposure = 1.15;
  R.shadowMap.enabled = true;
  R.shadowMap.type = T.PCFShadowMap;
  B.env = new T.PMREMGenerator(R).fromEquirectangular(B.langit).texture;
};

function rakit(nama) {
  benih(9173);
  const D = DENAH[nama];
  const S = new T.Scene();
  S.background = new T.Color("#cfe8f5");
  S.environment = B.env;
  S.environmentIntensity = 0.85;
  S.fog = new T.Fog("#cfe8f5", D.kamera.jarak + 80, D.kamera.jarak + 420);
  const tempat = {};
  for (const [id, [x, z, s]] of Object.entries(D.tempat)) {
    const g = PEMBUAT[id]();
    g.position.set(x, 0, z);
    g.scale.setScalar(s);
    S.add(g);
    g.updateMatrixWorld(true);
    tempat[id] = g;
  }
  const g = G.gerbang();
  g.position.set(D.gerbang[0], 0, D.gerbang[1]);
  g.scale.setScalar(D.gerbang[2]);
  S.add(g);
  g.updateMatrixWorld(true);
  lingkungan(S, D, [...Object.values(tempat), g].map((o) => new T.Box3().setFromObject(o)));
  return { D, S, tempat, gerbang: g };
}

function titik(o) {
  const L = [];
  o.traverse((m) => {
    if (!m.isMesh) return;
    const p = m.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) L.push(new T.Vector3().fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld));
  });
  return L;
}

/** Proyeksi ke bidang berjarak 1 di depan kamera. */
function layar(C, L) {
  return L.map((v) => {
    const q = v.clone().applyMatrix4(C.matrixWorldInverse);
    return [q.x / -q.z, q.y / -q.z];
  });
}

function batas(L) {
  const b = { l: Infinity, r: -Infinity, b: Infinity, t: -Infinity };
  for (const [x, y] of L) {
    b.l = Math.min(b.l, x);
    b.r = Math.max(b.r, x);
    b.b = Math.min(b.b, y);
    b.t = Math.max(b.t, y);
  }
  return b;
}

/** Siluet satu gedung di layar (garis atas + garis bawah per kolom), dalam koordinat proyeksi. */
function siluet(C, o) {
  const muka = [];
  o.traverse((m) => {
    if (!m.isMesh || m.userData.tanpaSiluet) return;
    const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry;
    const p = g.attributes.position;
    const L = [];
    for (let i = 0; i < p.count; i++) L.push(new T.Vector3().fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld));
    muka.push(...layar(C, L));
  });
  const b = batas(muka);
  const N = 360;
  const k = (N - 4) / Math.max(b.r - b.l, b.t - b.b);
  const c = document.createElement("canvas");
  c.width = c.height = N;
  const x2 = c.getContext("2d", { willReadFrequently: true });
  x2.lineWidth = 1.5;
  for (let i = 0; i + 2 < muka.length; i += 3) {
    x2.beginPath();
    for (let j = 0; j < 3; j++) x2[j ? "lineTo" : "moveTo"](2 + (muka[i + j][0] - b.l) * k, 2 + (b.t - muka[i + j][1]) * k);
    x2.closePath();
    x2.fill();
    x2.stroke();
  }
  const piksel = x2.getImageData(0, 0, N, N).data;
  const atas = [];
  const bawah = [];
  for (let x = 0; x < N; x++) {
    let y0 = -1;
    let y1 = -1;
    for (let y = 0; y < N; y++)
      if (piksel[(y * N + x) * 4 + 3] > 60) {
        if (y0 < 0) y0 = y;
        y1 = y + 1;
      }
    if (y0 >= 0) {
      atas.push([x, y0]);
      bawah.push([x, y1]);
    }
  }
  return [...sederhana(atas, 1.6), ...sederhana(bawah, 1.6).reverse()].map(([x, y]) => [b.l + (x - 2) / k, b.t - (y - 2) / k]);
}

/** Ramer–Douglas–Peucker. */
function sederhana(L, batasGalat) {
  if (L.length < 3) return L;
  const [a, b] = [L[0], L.at(-1)];
  const panjang = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  let jauh = 0;
  let di = 0;
  for (let i = 1; i < L.length - 1; i++) {
    const d = Math.abs((b[0] - a[0]) * (a[1] - L[i][1]) - (a[0] - L[i][0]) * (b[1] - a[1])) / panjang;
    if (d > jauh) [jauh, di] = [d, i];
  }
  if (jauh <= batasGalat) return [a, b];
  return [...sederhana(L.slice(0, di + 1), batasGalat).slice(0, -1), ...sederhana(L.slice(di), batasGalat)];
}

function kamera(pusat, sudut, jarak) {
  const C = new T.PerspectiveCamera();
  const a = T.MathUtils.degToRad(sudut);
  C.position.copy(pusat).add(new T.Vector3(0, Math.sin(a) * jarak, Math.cos(a) * jarak));
  C.lookAt(pusat);
  C.updateMatrixWorld(true);
  return C;
}

function potret(S, C, v, W, H, sampel) {
  R.setSize(W, H);
  const satu = new T.WebGLRenderTarget(W, H, { type: T.HalfFloatType, samples: 4 });
  const jumlah = new T.WebGLRenderTarget(W, H, { type: T.HalfFloatType, depthBuffer: false });
  const ortho = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const layarPenuh = (m) => new T.Scene().add(new T.Mesh(new T.PlaneGeometry(2, 2), m));
  const tambah = layarPenuh(new T.MeshBasicMaterial({ map: satu.texture, opacity: 1 / sampel, transparent: true, blending: T.AdditiveBlending, toneMapped: false, depthTest: false }));
  const akhir = layarPenuh(new T.MeshBasicMaterial({ map: jumlah.texture, depthTest: false }));

  const surya = new T.DirectionalLight("#ffecc8", 4);
  const kubah = new T.DirectionalLight("#d5e8f8", 1.35);
  const pusat = new T.Vector3(0, 0, 2);
  for (const l of [surya, kubah]) {
    l.castShadow = true;
    l.shadow.mapSize.set(6144, 6144);
    l.shadow.bias = -0.00015;
    l.shadow.normalBias = 0.035;
    Object.assign(l.shadow.camera, { left: -105, right: 105, top: 105, bottom: -105, near: 10, far: 420 });
    l.shadow.camera.updateProjectionMatrix();
    l.target.position.copy(pusat);
    S.add(l, l.target);
  }
  R.setRenderTarget(jumlah);
  R.setClearColor(0x000000, 0);
  R.clear();
  const n = 0.5;
  for (let i = 0; i < sampel; i++) {
    const q = (i + 0.5) / sampel;
    const a = i * 2.39996;
    const r = Math.sqrt(q);
    surya.position.set(-82 + Math.cos(a) * r * 5, 120 + Math.sin(a * 1.3) * r * 3, 118 + Math.sin(a) * r * 5).add(pusat);
    const y = 1 - q * 0.75;
    const e = Math.sqrt(1 - y * y);
    kubah.position.set(Math.cos(a) * e * 190, y * 190, Math.sin(a) * e * 190).add(pusat);
    const dx = (((i * 0.7548776662) % 1) - 0.5) * ((v.r - v.l) / W);
    const dy = (((i * 0.569840296) % 1) - 0.5) * ((v.t - v.b) / H);
    C.projectionMatrix.makePerspective((v.l + dx) * n, (v.r + dx) * n, (v.t + dy) * n, (v.b + dy) * n, n, 1500);
    C.projectionMatrixInverse.copy(C.projectionMatrix).invert();
    R.toneMapping = T.NoToneMapping;
    R.setRenderTarget(satu);
    R.clear();
    R.render(S, C);
    R.autoClear = false;
    R.setRenderTarget(jumlah);
    R.render(tambah, ortho);
    R.autoClear = true;
  }
  R.toneMapping = T.NeutralToneMapping;
  R.setRenderTarget(null);
  R.render(akhir, ortho);
  const url = R.domElement.toDataURL("image/png");
  satu.dispose();
  jumlah.dispose();
  for (const l of [surya, kubah]) {
    l.shadow.map?.dispose();
    S.remove(l, l.target);
  }
  return url;
}

window.denah = (nama, sampel, skala) => {
  const { D, S, tempat, gerbang } = rakit(nama);
  const C = kamera(new T.Vector3(0, 2, 2), D.kamera.sudut, D.kamera.jarak);
  const P = Object.fromEntries(Object.entries(tempat).map(([id, o]) => [id, layar(C, titik(o))]));
  const semua = batas([...Object.values(P).flat(), ...layar(C, titik(gerbang))]);
  const pinggir = (semua.r - semua.l) * 0.008;
  // palang pos boleh sedikit keluar; kampus tetap simetris terhadap jalan utama
  const sisi = Math.max(-semua.l, semua.r) + pinggir;
  const aman = { l: -sisi, r: sisi, b: semua.b - pinggir, t: semua.t + pinggir };
  const [w, h] = [aman.r - aman.l, aman.t - aman.b];
  const E = D.lebih;
  const v = { l: aman.l - E.kiri * w, r: aman.r + E.kanan * w, t: aman.t + E.atas * h, b: aman.b - E.bawah * h };
  const px = ([x, y]) => [+((x - v.l) / (v.r - v.l)).toFixed(4), +((v.t - y) / (v.t - v.b)).toFixed(4)];
  const kotak = (b) => {
    const [x0, y0] = px([b.l, b.t]);
    const [x1, y1] = px([b.r, b.b]);
    return [x0, y0, +(x1 - x0).toFixed(4), +(y1 - y0).toFixed(4)];
  };
  const W = Math.round((D.lebarPx * skala * (v.r - v.l)) / w);
  const H = Math.round((W * (v.t - v.b)) / (v.r - v.l));
  const url = potret(S, C, v, W, H, sampel);
  return { url, w: W, h: H, aman: kotak(aman), tempat: Object.fromEntries(Object.entries(P).map(([id, L]) => [id, { kotak: kotak(batas(L)), bentuk: siluet(C, tempat[id]).map(px) }])) };
};

/** Potret dekat satu gedung untuk kepala halaman gedung. */
window.satuGedung = (id, sampel, skala) => {
  const { S, tempat, gerbang } = rakit("sedang");
  const o = tempat[id];
  for (const lain of [...Object.values(tempat), gerbang]) lain.visible = lain === o;
  const pusat = new T.Box3().setFromObject(o).getCenter(new T.Vector3());
  const C = kamera(pusat, 20, 150);
  const b = batas(layar(C, titik(o)));
  const [W, H] = [720 * skala, 560 * skala];
  let w = (b.r - b.l) * 1.12;
  let h = (b.t - b.b) * 1.1;
  if (w / h < W / H) w = (h * W) / H;
  else h = (w * H) / W;
  const [x, y] = [(b.l + b.r) / 2, (b.b + b.t) / 2];
  S.fog = new T.Fog("#b9d3df", 190, 430);
  return potret(S, C, { l: x - w / 2, r: x + w / 2, b: y - h / 2, t: y + h / 2 }, Math.round(W), Math.round(H), sampel);
};

