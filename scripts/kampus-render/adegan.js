// Merakit adegan, membingkai otomatis, lalu merata-rata banyak sampel matahari + cahaya langit (bayangan lembut & oklusi).
import * as T from "three";
import { B, benih, siapkanBahan } from "./bahan.js";
import { DENAH } from "./denah.js";
import { lingkungan, orang, siapkanTanaman } from "./lingkungan.js";
import * as G from "./gedung.js";

const PEMBUAT = { utama: G.gedungUtama, lab: G.gedungLab, komputer: G.gedungKomputer, taman: G.taman, musala: G.mushola, kantor: G.kantorGuru, pos: G.posSatpam };
let R;
let R2;

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
  // renderer kedua berlatar transparan untuk sprite yang bergerak
  R2 = new T.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  R2.setPixelRatio(1);
  R2.toneMapping = T.NeutralToneMapping;
  R2.toneMappingExposure = 1.15;
  R2.shadowMap.enabled = true;
  R2.shadowMap.type = T.PCFSoftShadowMap;
  R2.setClearColor(0x000000, 0);
  B.env2 = new T.PMREMGenerator(R2).fromEquirectangular(B.langit).texture;
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
    const per = new T.Matrix4();
    for (let j = 0; j < (m.isInstancedMesh ? m.count : 1); j++) {
      if (m.isInstancedMesh) m.getMatrixAt(j, per);
      const dunia = m.isInstancedMesh ? m.matrixWorld.clone().multiply(per) : m.matrixWorld;
      for (let i = 0; i < p.count; i++) L.push(new T.Vector3().fromBufferAttribute(p, i).applyMatrix4(dunia));
    }
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

const SURYA = new T.Vector3(-82, 120, 118);
/** Geser bayangan per satuan tinggi (arah cahaya matahari). */
const GESER = [-SURYA.x / SURYA.y, -SURYA.z / SURYA.y];

const ORANG = [
  { baju: "#ffffff", celana: "#c0262d", kulit: "#c98d62", rambut: "#1b1410", tinggi: 1.9, tas: "#0786eb" },
  { baju: "#fd861d", celana: "#27466e", kulit: "#e0ac7e", rambut: "#2a1a10", tinggi: 1.75, tas: "#fdb724" },
  { baju: "#ffffff", celana: "#c0262d", kulit: "#a8714a", rambut: "#111", tinggi: 2, tas: "#e9414e" },
  { baju: "#2fb36d", celana: "#3a3f47", kulit: "#d39a6c", rambut: "#3b2414", tinggi: 1.8, tas: "#7a4ae0" },
  { baju: "#f45b94", celana: "#ffffff", kulit: "#e3b088", rambut: "#2a1a10", tinggi: 1.8, tas: "#0786eb" },
  { baju: "#ffffff", celana: "#c0262d", kulit: "#b97c52", rambut: "#1b1410", tinggi: 1.95, tas: "#2fb36d" },
  { baju: "#0786eb", celana: "#3a3f47", kulit: "#d39a6c", rambut: "#111", tinggi: 1.85, tas: "#fd861d" },
  { baju: "#135385", celana: "#3a3f47", kulit: "#c48a5f", rambut: "#1c1c1c", tinggi: 2.45 },
];
const ARAH = { depan: -Math.PI / 2, belakang: Math.PI / 2, samping: 0 };
const LANGKAH = 4;
const KIBAR = 8;

window.denah = (nama, sampel, skala) => {
  const { D, S, tempat, gerbang } = rakit(nama);
  const C = kamera(new T.Vector3(0, 2, 2), D.kamera.sudut, D.kamera.jarak);
  const raya = S.userData.raya;
  const hidup = [];
  const penutup = [];
  S.traverse((o) => {
    if (o.userData.hidup) hidup.push(o);
    if (o.userData.penutup) penutup.push(o);
  });
  gerbang.userData.penutup = "gerbang";
  penutup.push(gerbang);

  const P = Object.fromEntries(Object.entries(tempat).map(([id, o]) => [id, layar(C, titik(o))]));
  // jalan raya depan gerbang ikut bagian aman: tidak boleh tertutup dok
  const semua = batas([...Object.values(P).flat(), ...layar(C, titik(gerbang)), ...layar(C, [new T.Vector3(0, 0, raya + 6.8)])]);
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

  for (const o of hidup) o.visible = false;
  const url = potret(S, C, v, W, H, sampel);

  // ---- benda hidup: sprite dipotong dari kamera yang sama, jadi ukuran & perspektifnya pas dengan latar ----
  const keLayar = (p) => {
    const [[x, y]] = layar(C, [p]);
    return [((x - v.l) / (v.r - v.l)) * W, ((v.t - y) / (v.t - v.b)) * H];
  };
  const gambar = [];
  const sprite = (namaG, objek, { titikKotak, alas = 0.12, bayang = true, siapkan, jumlah = 1 }) => {
    const L = layar(C, titikKotak).map(([x, y]) => [((x - v.l) / (v.r - v.l)) * W, ((v.t - y) / (v.t - v.b)) * H]);
    const b = batas(L.map(([x, y]) => [x, -y]));
    const r = { x: Math.floor(b.l) - 2, y: Math.floor(-b.t) - 2 };
    r.w = Math.ceil(b.r) + 2 - r.x;
    r.h = Math.ceil(-b.b) + 2 - r.y;
    const [ax, ay] = keLayar(objek.getWorldPosition(new T.Vector3()));
    for (let i = 0; i < jumlah; i++) {
      siapkan?.(i);
      gambar.push({ nama: jumlah > 1 ? `${namaG}.${i}` : namaG, url: potongan(S, C, v, W, H, r, objek, { alas, bayang }), w: r.w, h: r.h });
    }
    return { x: r.x, y: r.y, w: r.w, h: r.h, ax: +(ax - r.x).toFixed(2), ay: +(ay - r.y).toFixed(2) };
  };
  /** 8 sudut kotak benda + jatuhnya bayangan di tanah. */
  const sudutBayang = (box, alas) => {
    const L = [];
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
      L.push(new T.Vector3(x, y, z));
      L.push(new T.Vector3(x + GESER[0] * (y - alas), alas, z + GESER[1] * (y - alas)));
    }
    return L;
  };
  const info = { mobil: [], perahu: [], orang: {}, rute: [], penutup: [] };

  const fraksi = ([x, y]) => [+(x / W).toFixed(5), +(y / H).toFixed(5)];
  /** posisi layar (fraksi) untuk x dunia = 0 dan perubahan per satuan x, pada kedalaman z */
  const lajur = (y0, z) => {
    const [a] = [keLayar(new T.Vector3(0, y0, z))];
    const c = keLayar(new T.Vector3(1, y0, z));
    return { fx: +(a[0] / W).toFixed(5), fy: +(a[1] / H).toFixed(5), dx: +((c[0] - a[0]) / W).toFixed(6) };
  };

  hidup.filter((o) => o.userData.hidup.jenis === "mobil").forEach((o, i) => {
    o.visible = true;
    const x0 = o.position.x;
    o.position.x = 0;
    o.updateMatrixWorld(true);
    const box = new T.Box3().setFromObject(o);
    info.mobil.push({ ...sprite(`mobil${i}`, o, { titikKotak: sudutBayang(box, 0.11), alas: 0.11 }), ...lajur(o.position.y, o.position.z), z: o.position.z, arah: o.userData.hidup.arah });
    o.position.x = x0;
    o.visible = false;
  });
  hidup.filter((o) => o.userData.hidup.jenis === "perahu").forEach((o, i) => {
    o.visible = true;
    const x0 = o.position.x;
    o.position.x = 0;
    o.updateMatrixWorld(true);
    const box = new T.Box3().setFromObject(o);
    info.perahu.push({ ...sprite(`perahu${i}`, o, { titikKotak: sudutBayang(box, 0.1), bayang: false }), ...lajur(o.position.y, o.position.z), z: o.position.z, xAwal: x0 });
    o.position.x = x0;
    o.visible = false;
  });
  const kain = hidup.find((o) => o.userData.hidup === "bendera");
  if (kain) {
    kain.visible = true;
    const L = [];
    for (let i = 0; i < KIBAR; i++) {
      G.kibar(kain.geometry, i / KIBAR);
      kain.geometry.computeBoundingBox();
      kain.updateMatrixWorld(true);
      L.push(...titik(kain));
    }
    info.bendera = sprite("bendera", kain, { titikKotak: L, bayang: false, jumlah: KIBAR, siapkan: (i) => G.kibar(kain.geometry, i / KIBAR) });
    kain.visible = false;
  }

  // orang: dirender di titik acuan di tengah kampus; di jalur lain diskalakan menurut kedalaman
  const [, gz] = D.gerbang;
  const [, uz, us] = D.tempat.utama;
  const zAcuan = Math.round((gz + uz) / 2);
  const tinggiLayar = (x, z) => {
    const a = keLayar(new T.Vector3(x, 0.17, z));
    const b = keLayar(new T.Vector3(x, 1.67, z));
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
  };
  const acuan = tinggiLayar(0, zAcuan);
  ORANG.forEach((gaya, n) => {
    const o = orang(gaya);
    o.position.set(0, 0.17, zAcuan);
    S.add(o);
    info.orang[n] = {};
    for (const [arah, sudut] of Object.entries(ARAH)) {
      o.rotation.y = sudut;
      const L = [];
      for (let i = 0; i < LANGKAH; i++) {
        o.userData.langkah(i / LANGKAH);
        o.updateMatrixWorld(true);
        L.push(...sudutBayang(new T.Box3().setFromObject(o), 0.17));
      }
      info.orang[n][arah] = sprite(`orang${n}-${arah}`, o, { titikKotak: L, alas: 0.17, jumlah: LANGKAH, siapkan: (i) => (o.userData.langkah(i / LANGKAH), o.updateMatrixWorld(true)) });
    }
    S.remove(o);
  });

  // rute jalan kaki: dari gerbang lewat jalan utama, belok ke pintu gedung (memutari air mancur bila perlu)
  const [, fz, fr] = D.mancur;
  const PINTU = { musala: -1.5, pos: 1.8 };
  const rute = (id, n) => {
    const [x, z, s] = D.tempat[id];
    const sisiJalan = n % 2 ? 1.3 : -1.3;
    const L = [[sisiJalan, gz + 3.5]];
    let tuju;
    let akhir;
    if (id === "utama") {
      tuju = uz + 4.6 * us;
      akhir = [[0, uz + 3.2 * us]];
    } else {
      const pintu = x + (PINTU[id] ?? 0) * s;
      tuju = z + 1.6 * s + 1.55;
      akhir = [[pintu, tuju], [pintu, z + 0.9 * s]];
    }
    if (tuju < fz + fr + 2.2) {
      const sg = id === "utama" ? Math.sign(sisiJalan) : Math.sign(x) || 1;
      const R = fr + 1.4;
      L.push([sisiJalan, fz + fr + 2.6]);
      for (let k = 0; k <= 8; k++) {
        const t = (k / 8) * Math.PI;
        L.push([sg * R * Math.sin(t), fz + R * Math.cos(t)]);
      }
      L.push([sg * 1.3, fz - fr - 2.6]);
      L.push([sg * 1.3, Math.max(tuju, uz + 4.6 * us)]);
    } else L.push([sisiJalan, tuju]);
    L.push(...akhir);
    return L;
  };
  const halangan = [];
  const sinar = new T.Raycaster();
  const bisaMenutup = [];
  S.traverse((o) => {
    if (!(o.isMesh || o.isInstancedMesh) || !o.visible) return;
    let p = o;
    while (p && !p.userData.penutup && !p.userData.hidup) p = p.parent;
    if (!p) bisaMenutup.push(o);
  });
  for (const id of Object.keys(D.tempat))
    for (let n = 0; n < 2; n++) {
      const L = rute(id, n);
      const titikRute = [];
      for (let i = 0; i < L.length; i++) {
        const [x, z] = L[i];
        const [fx, fy] = fraksi(keLayar(new T.Vector3(x, 0.17, z)));
        titikRute.push([+x.toFixed(2), +z.toFixed(2), fx, fy, +(tinggiLayar(x, z) / acuan).toFixed(4)]);
        // periksa: apakah benda lain menutupi orang di ruas ini?
        if (i === L.length - 1) continue;
        const [x2, z2] = L[i + 1];
        const pjg = Math.hypot(x2 - x, z2 - z);
        for (let d = 0; d < pjg; d += 0.8) {
          const q = [x + ((x2 - x) * d) / pjg, z + ((z2 - z) * d) / pjg];
          for (const y of [0.6, 1.3]) {
            const tuju = new T.Vector3(q[0], y, q[1]);
            const arah = tuju.clone().sub(C.position);
            const jauh = arah.length();
            sinar.set(C.position, arah.normalize());
            sinar.far = jauh - 0.5;
            const kena = sinar.intersectObjects(bisaMenutup, false).find((k) => k.point.y > 0.45);
            if (!kena) continue;
            let o = kena.object;
            while (o.parent && o.parent !== S) o = o.parent;
            const pemilik = Object.keys(tempat).find((k) => tempat[k] === o) ?? `${o.type}:${kena.object.geometry.type}`;
            halangan.push({ rute: `${id}/${n}`, pemilik, di: `(${kena.point.x.toFixed(1)},${kena.point.y.toFixed(1)},${kena.point.z.toFixed(1)})` });
          }
        }
      }
      info.rute.push({ ke: id, titik: titikRute });
    }

  // gedung yang menutupi jalur ikut jadi penutup: orang tampak lewat di belakangnya
  const hitung = Object.groupBy(halangan, (k) => k.pemilik);
  for (const id of Object.keys(hitung))
    if (tempat[id] && hitung[id].length >= 12) {
      tempat[id].userData.penutup = id;
      penutup.push(tempat[id]);
    }
  // penutup: piksel latar sendiri dipotong mengikuti siluet benda, ditaruh di atas orang yang lewat di belakangnya
  for (const o of penutup) {
    const L = layar(C, titik(o)).map(([x, y]) => [((x - v.l) / (v.r - v.l)) * W, ((v.t - y) / (v.t - v.b)) * H]);
    const b = batas(L);
    const r = { x: Math.max(0, Math.floor(b.l) - 2), y: Math.max(0, Math.floor(b.b) - 2) };
    r.w = Math.min(W, Math.ceil(b.r) + 2) - r.x;
    r.h = Math.min(H, Math.ceil(b.t) + 2) - r.y;
    const z = o === gerbang || o.userData.penutup === "pagar" ? D.gerbang[1] : o.userData.penutup === "mancur" ? fz : D.tempat[o.userData.penutup][1];
    gambar.push({ nama: `tutup-${o.userData.penutup}`, url: potongan(S, C, v, W, H, r, o, { bayang: false, topeng: true }), w: r.w, h: r.h, potong: r });
    info.penutup.push({ nama: o.userData.penutup, x: r.x, y: r.y, w: r.w, h: r.h, z });
  }

  return {
    url,
    w: W,
    h: H,
    aman: kotak(aman),
    tempat: Object.fromEntries(Object.entries(P).map(([id, L]) => [id, { kotak: kotak(batas(L)), bentuk: siluet(C, tempat[id]).map(px) }])),
    hidup: info,
    gambar,
    halangan: Object.entries(Object.groupBy(halangan, (k) => k.pemilik)).map(([k, L]) => `${k}: ${L.length} titik, rute ${[...new Set(L.map((x) => x.rute))].join(" ")}, contoh ${L[0].di}`),
  };
};

/** Render satu benda saja, dipotong pada persegi r (piksel gambar penuh), latar transparan, 4× lalu diperkecil di Node. */
function potongan(S, C, v, W, H, r, objek, { alas = 0.12, bayang = true, topeng = false }) {
  const K = 4;
  const sembunyi = [];
  const dalam = new Set();
  objek.traverse((o) => dalam.add(o));
  S.traverse((o) => {
    if ((o.isMesh || o.isInstancedMesh || o.isLight) && !dalam.has(o) && o.visible) {
      o.visible = false;
      sembunyi.push(o);
    }
  });
  const box = new T.Box3().setFromObject(objek);
  const pusat = box.getCenter(new T.Vector3());
  const ukuran = box.getSize(new T.Vector3()).length();
  const tambahan = [];
  if (bayang) {
    const lantai = new T.Mesh(new T.PlaneGeometry(ukuran * 3, ukuran * 3).rotateX(-Math.PI / 2), new T.ShadowMaterial({ opacity: 0.38 }));
    lantai.position.set(pusat.x, alas, pusat.z);
    lantai.receiveShadow = true;
    tambahan.push(lantai);
  }
  const surya = new T.DirectionalLight("#ffecc8", 4);
  surya.position.copy(pusat).add(SURYA.clone().normalize().multiplyScalar(60));
  surya.target.position.copy(pusat);
  surya.castShadow = true;
  surya.shadow.mapSize.set(2048, 2048);
  surya.shadow.bias = -0.0002;
  surya.shadow.normalBias = 0.02;
  surya.shadow.radius = 3;
  Object.assign(surya.shadow.camera, { left: -ukuran, right: ukuran, top: ukuran, bottom: -ukuran, near: 1, far: 140 });
  surya.shadow.camera.updateProjectionMatrix();
  const kubah = new T.HemisphereLight("#d5e8f8", "#6f8a55", 1.1);
  tambahan.push(surya, surya.target, kubah);
  S.add(...tambahan);
  const latar = [S.background, S.environment];
  S.background = null;
  S.environment = B.env2;
  if (topeng) {
    objek.traverse((o) => {
      if (o.isMesh) {
        o.userData.bahanAsli = o.material;
        o.material = new T.MeshBasicMaterial({ color: "#fff", transparent: o.material.transparent, opacity: o.material.transparent ? Math.min(1, o.material.opacity * 1.6) : 1, depthWrite: !o.material.transparent });
      }
    });
  }

  const n = 0.5;
  const [sx, sy] = [(v.r - v.l) / W, (v.t - v.b) / H];
  const C2 = C.clone();
  C2.projectionMatrix.makePerspective((v.l + r.x * sx) * n, (v.l + (r.x + r.w) * sx) * n, (v.t - r.y * sy) * n, (v.t - (r.y + r.h) * sy) * n, n, 1500);
  C2.projectionMatrixInverse.copy(C2.projectionMatrix).invert();
  R2.setSize(r.w * K, r.h * K);
  R2.render(S, C2);
  const hasil = R2.domElement.toDataURL("image/png");

  if (topeng) objek.traverse((o) => o.isMesh && (o.material = o.userData.bahanAsli));
  [S.background, S.environment] = latar;
  S.remove(...tambahan);
  surya.shadow.map?.dispose();
  for (const o of sembunyi) o.visible = true;
  return hasil;
}

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

