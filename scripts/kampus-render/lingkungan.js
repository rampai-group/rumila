// Medan, jalan, taman, pepohonan, pagar, perabot, dan jalan raya.
import * as T from "three";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { B, M, acak, balok, cet, kanvas, tabung, taruh } from "./bahan.js";

export function siapkanTanaman() {
  // semak: gumpalan tak beraturan
  const g = mergeVertices(new T.IcosahedronGeometry(1, 4));
  const p = g.attributes.position;
  const c = [];
  for (let i = 0; i < p.count; i++) {
    const [x, y, z] = [p.getX(i), p.getY(i), p.getZ(i)];
    const f = 0.86 + 0.1 * Math.sin(x * 11 + z * 7) * Math.sin(y * 9) + acak(0, 0.14);
    p.setXYZ(i, x * f, y * f, z * f);
    const t = acak(0.62, 1.05);
    c.push(t, t, t);
  }
  g.setAttribute("color", new T.Float32BufferAttribute(c, 3));
  g.computeVertexNormals();
  B.gSemak = g;
  B.mSemak = M("#62a544", 0.95, { vertexColors: true });

  B.mDaun = new T.MeshStandardMaterial({ map: B.daun, alphaTest: 0.38, side: T.DoubleSide, vertexColors: true, roughness: 0.85, color: "#ffffff", emissive: "#16300d", emissiveIntensity: 0.6 });
  B.mDaun.onBeforeCompile = (s) => {
    s.fragmentShader = s.fragmentShader.replace("#include <normal_fragment_begin>", "#include <normal_fragment_begin>\nnormal = normalize(vNormal);");
  };
  B.pohon = [84, 66, 74].map(tajuk);
  B.batang = new T.CylinderGeometry(0.16, 0.34, 4.6, 8).translate(0, 2.3, 0);
  B.mBatang = M("#fff", 1, { map: B.kulit });
}

function tajuk(n) {
  const L = [];
  const N = new T.Vector3();
  for (let i = 0; i < n; i++) {
    const u = acak(-0.55, 1);
    const a = acak(0, Math.PI * 2);
    const r = Math.sqrt(1 - u * u) * acak(0.6, 1);
    const pusat = new T.Vector3(Math.cos(a) * r * 2.4, 4.8 + u * 1.9, Math.sin(a) * r * 2.4);
    const s = acak(1.5, 2.2);
    const putar = new T.Quaternion().setFromEuler(new T.Euler(acak(-1.3, 1.3), acak(0, 6.28), acak(0, 6.28)));
    const g = new T.PlaneGeometry(s, s).applyMatrix4(new T.Matrix4().compose(pusat, putar, new T.Vector3(1, 1, 1)));
    const p = g.attributes.position;
    const c = [];
    for (let j = 0; j < p.count; j++) {
      N.fromBufferAttribute(p, j).sub(new T.Vector3(0, 3.5, 0)).normalize();
      g.attributes.normal.setXYZ(j, N.x, Math.abs(N.y) * 0.8 + 0.2, N.z);
      const t = T.MathUtils.lerp(0.55, 1.12, T.MathUtils.smoothstep(p.getY(j), 2.6, 7));
      c.push(t, t, t);
    }
    g.setAttribute("color", new T.Float32BufferAttribute(c, 3));
    L.push(g);
  }
  return mergeGeometries(L);
}

function sebar(S, g, m, daftar, bayang = true) {
  if (!daftar.length) return;
  const o = new T.InstancedMesh(g, m, daftar.length);
  const q = new T.Object3D();
  const w = new T.Color();
  daftar.forEach(({ x, y = 0, z, s = [1, 1, 1], r = 0, warna }, i) => {
    q.position.set(x, y, z);
    q.rotation.set(0, r, 0);
    q.scale.set(...s);
    q.updateMatrix();
    o.setMatrixAt(i, q.matrix);
    if (warna) o.setColorAt(i, w.set(warna));
  });
  o.castShadow = bayang;
  o.receiveShadow = true;
  S.add(o);
}

export function lingkungan(S, D, kotak) {
  const L = D.lebarKampus;
  const [, gz, gs] = D.gerbang;
  const [, uz, us] = D.tempat.utama;
  const [, fz, fr] = D.mancur;
  const belakang = uz - 13 * us - 9;
  const raya = gz + 9.5;
  // kampus berdiri di pulau: di belakangnya pantai dan laut
  const pesisir = (x) => belakang - 30 + Math.sin(x * 0.035 + 1) * 5 + Math.sin(x * 0.11) * 1.8;

  // medan rumput dengan bekas mesin potong
  const tanah = new T.PlaneGeometry(700, 700, 350, 350).rotateX(-Math.PI / 2);
  const p = tanah.attributes.position;
  const uv = tanah.attributes.uv;
  const c = [];
  const warna = new T.Color();
  for (let i = 0; i < p.count; i++) {
    const [x, z] = [p.getX(i), p.getZ(i)];
    uv.setXY(i, x, z);
    const dalam = Math.abs(x) < L + 1 && z > belakang && z < gz;
    const n = Math.sin(x * 0.19 + 1.3) * Math.cos(z * 0.16) * 0.5 + Math.sin(x * 0.07 - z * 0.05) * 0.5;
    const lajur = Math.floor((x + 350) / 4) % 2 ? 0.05 : -0.04;
    warna.setHSL(0.22 + n * 0.015, dalam ? 0.56 : 0.42, (dalam ? 0.86 + lajur : 0.74) + n * 0.04);
    c.push(warna.r, warna.g, warna.b);
    const d = pesisir(x) - z;
    if (d > 0) p.setY(i, -Math.min(3, d * 0.16));
  }
  tanah.setAttribute("color", new T.Float32BufferAttribute(c, 3));
  tanah.computeVertexNormals();
  taruh(S, tanah, new T.MeshStandardMaterial({ map: B.rumput, vertexColors: true, roughness: 1 })).castShadow = false;
  laut(S, pesisir);

  // jalan kampus
  const tepi = M("#e6dfd3", 0.85);
  const lajur = [];
  const jalan = (x0, x1, z0, z1, lapis = 0) => {
    balok(S, tepi, x1 - x0 + 0.6, 0.12 + lapis, z1 - z0 + 0.6, (x0 + x1) / 2, 0, (z0 + z1) / 2);
    lajur.push([x0, x1, z0, z1]);
  };
  const awalUtama = uz + 6 * us;
  jalan(-3.2, 3.2, awalUtama, gz + 4.8);
  jalan(-8 * us, 8 * us, uz + 4 * us, uz + 7.4 * us);
  for (const [id, [x, z, s]] of Object.entries(D.tempat)) {
    if (id === "utama") continue;
    const pintu = x + ({ musala: -1.5, pos: 1.8 }[id] ?? 0) * s;
    const z0 = z + 1.6 * s;
    jalan(Math.min(pintu - 2 * s, 0), Math.max(pintu + 2 * s, 0), z0, z0 + 3.1, 0.005);
  }
  // paving satu lapis di atas semua kanstin, supaya persimpangan menyatu
  lajur.forEach(([a, b, c0, c1], i) => balok(S, B.mPaving, b - a, 0.16 + i * 0.002, c1 - c0, (a + b) / 2, 0, (c0 + c1) / 2));
  tabung(S, tepi, fr + 2.5, fr + 2.5, 0.2, 0, 0, fz, 72);
  const lantai = new T.CircleGeometry(fr + 2.2, 72).rotateX(-Math.PI / 2);
  const lp = lantai.attributes.position;
  for (let i = 0; i < lp.count; i++) lantai.attributes.uv.setXY(i, lp.getX(i), lp.getZ(i));
  taruh(S, lantai, B.mPaving, 0, 0.215, fz);
  const mancur = new T.Group();
  mancur.userData.penutup = "mancur";
  S.add(mancur);
  airMancur(mancur, fz, fr);

  // jalan raya + trotoar
  balok(S, new T.MeshStandardMaterial({ map: B.aspal, roughness: 0.94 }), 700, 0.1, 9, 0, 0, raya);
  for (const s of [-1, 1]) {
    balok(S, B.mPaving, 700, 0.22, 2, 0, 0, raya + s * 5.6);
    balok(S, tepi, 700, 0.27, 0.3, 0, 0, raya + s * 4.55);
  }
  const marka = M("#f1f1ec", 0.6);
  for (let x = -198; x < 200; x += 5) if (Math.abs(x) > 5) balok(S, marka, 2.6, 0.02, 0.22, x, 0.1, raya);
  for (let i = -3; i <= 3; i++) balok(S, marka, 0.6, 0.025, 8, i * 1.15, 0.1, raya);
  // lalu lintas kiri: menuju kanan (+x) di lajur jauh, menuju kiri di lajur dekat
  const WARNA_MOBIL = ["#b8323a", "#d8dde1", "#2c5d9e", "#f2b632", "#2f3a44"];
  WARNA_MOBIL.forEach((w, i) => (mobil(S, (i - 2) * 9, raya + (i % 2 ? 2.2 : -2.2), w, i % 2 === 1).userData.hidup = { jenis: "mobil", arah: i % 2 ? -1 : 1 }));

  pagar(S, L, belakang, gz, 8 * gs);

  // pohon: tidak boleh menutup gedung, papan nama, atau jalan
  const pohon = [];
  const tanam = (x, z, s) => pohon.push({ x, z, y: -0.05, r: acak(0, 6.28), s: [s * acak(0.9, 1.15), s * acak(0.85, 1.15), s * acak(0.9, 1.15)], warna: new T.Color().setHSL(acak(0.17, 0.3), acak(0.25, 0.55), acak(0.72, 0.95)) });
  const bebas = (x, z, r, depan = 0) =>
    kotak.every((k) => x < k.min.x - r || x > k.max.x + r || z < k.min.z - r || z > k.max.z + r + depan) &&
    lajur.every(([a, b, c0, c1]) => x < a - r || x > b + r || z < c0 - r || z > c1 + r + depan * 0.2) &&
    Math.hypot(x, z - fz) > fr + 2.5 + r;
  for (let x = -L - 2; x <= L + 2; x += 4.6) tanam(x + acak(-1, 1), belakang - acak(2, 4), acak(1.5, 2));
  for (let z = belakang; z < gz - 24; z += 8.5) for (const s of [-1, 1]) tanam(s * (L + acak(3, 5)), z + acak(-1.5, 1.5), acak(1, 1.4));
  for (let i = 0; i < 2600; i++) {
    const x = acak(-190, 190);
    const z = acak(-190, raya + 75);
    if (Math.abs(x) < L + 7 && z > belakang - 4 && z < raya + 16) continue;
    if (z > gz - 18 && z < raya + 16) continue;
    if (z < pesisir(x) + 5) continue;
    if (Math.sin(x * 0.11 + 2) * Math.cos(z * 0.09) < -0.35) continue;
    tanam(x, z, acak(1, 1.7));
  }
  const dalam = [];
  for (let i = 0; i < 700 && dalam.length < 22; i++) {
    const x = acak(-L + 1.5, L - 1.5);
    const z = acak(belakang + 3, gz - 6);
    if (!bebas(x, z, 2.2, 9) || Math.abs(x) < 6 || dalam.some(([a, b]) => Math.hypot(x - a, z - b) < 7)) continue;
    dalam.push([x, z]);
    tanam(x, z, acak(0.6, 0.82));
  }
  for (let k = 0; k < 3; k++) sebar(S, B.pohon[k], B.mDaun, pohon.filter((_, i) => i % 3 === k));
  sebar(S, B.batang, B.mBatang, pohon.map((o) => ({ ...o, warna: undefined })));

  // semak dan bunga
  const semak = [];
  for (const s of [-1, 1])
    for (let z = belakang + 1; z < gz - 1; z += 1.25) semak.push({ x: s * (L - 0.4), z, y: 0.4, r: z, s: [0.85, 0.75, 0.85] });
  for (let x = -L + 1; x < L; x += 1.25) semak.push({ x, z: belakang + 0.8, y: 0.4, r: x, s: [0.85, 0.8, 0.85] });
  for (const s of [-1, 1]) for (let z = awalUtama; z < gz - 2; z += 1.1) if (bebas(s * 4.15, z, 0.45)) semak.push({ x: s * 4.15, z, y: 0.2, r: z, s: [0.55, 0.45, 0.55] });
  sebar(S, B.gSemak, B.mSemak, semak);

  const bunga = [];
  const WARNA = ["#f45b94", "#ffd23f", "#ff854c", "#a87af0", "#f6f1ff", "#e9414e"];
  const petak = (x, z, a, b) => {
    for (let i = 0; i < a * b * 22; i++) {
      const sudut = acak(0, 6.28);
      const r = Math.sqrt(acak());
      const daun = acak() < 0.45;
      const u = acak(0.14, 0.24);
      bunga.push({ x: x + Math.cos(sudut) * a * r, z: z + Math.sin(sudut) * b * r, y: acak(0.12, daun ? 0.25 : 0.42), r: sudut, s: [u, u * 0.8, u], warna: daun ? "#3e7c2c" : WARNA[(i + Math.round(x * 3) + 600) % WARNA.length] });
    }
  };
  for (const s of [-1, 1]) {
    petak(s * 12.5 * us, uz + 3.1 * us, 5.5 * us, 1.1);
    petak(s * (fr + 4.6), fz, 1.5, 2.8);
    petak(s * 11, gz - 1.5, 1.8, 0.8);
    petak(s * (L - 5), gz - 1.5, 3.4, 0.8);
  }
  sebar(S, new T.DodecahedronGeometry(1, 0), M("#fff", 0.8), bunga);
  S.userData.raya = raya;

  // lampu taman + bangku
  for (const s of [-1, 1]) {
    for (let z = fz + fr + 4; z < gz - 3; z += 12.5) if (bebas(s * 5.1, z, 0.3)) lampu(S, s * 5.1, z);
    bangku(S, s * (fr + 3), fz + fr * 0.75, -s * 1.05);
  }
}

function laut(S, pesisir) {
  const pita = (dari, sampai, warna) => {
    const pos = [];
    const uv = [];
    const c = [];
    const k = [new T.Color(warna[0]), new T.Color(warna[1])];
    for (let x = -350; x < 350; x += 4) {
      const [a, b] = [pesisir(x), pesisir(x + 4)];
      const v = [[x, a - sampai, 1], [x, a - dari, 0], [x + 4, b - dari, 0], [x, a - sampai, 1], [x + 4, b - dari, 0], [x + 4, b - sampai, 1]];
      for (const [vx, vz, i] of v) {
        pos.push(vx, 0, vz);
        uv.push(vx, vz);
        c.push(k[i].r, k[i].g, k[i].b);
      }
    }
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
    g.setAttribute("color", new T.Float32BufferAttribute(c, 3));
    g.computeVertexNormals();
    return g;
  };
  const ombak = kanvas(512, 512, (c, w, h) => {
    c.fillStyle = "#e4e4e4";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) {
      const [x, y, a] = [acak(0, w), acak(0, h), acak(5, 22)];
      c.strokeStyle = acak() < 0.5 ? "rgba(255,255,255,.75)" : "rgba(120,120,120,.22)";
      c.lineWidth = acak(1, 3);
      c.beginPath();
      c.moveTo(x - a, y);
      c.quadraticCurveTo(x, y - a / 3, x + a, y);
      c.stroke();
    }
  }, { ulang: [0.04, 0.07] });
  const lapis = (dari, sampai, warna, y, kasar = 0.22) => {
    const o = taruh(S, pita(dari, sampai, warna), new T.MeshStandardMaterial({ map: sampai > 9.2 ? ombak : null, vertexColors: true, roughness: kasar, side: T.DoubleSide, envMapIntensity: 0.55 }), 0, y, 0);
    o.castShadow = false;
  };
  lapis(-4, 8, ["#e9d9ad", "#d8c79b"], 0.06, 0.96);
  lapis(8, 9.2, ["#f4fbf8", "#d9f3ee"], 0.11, 0.6);
  lapis(9.2, 24, ["#8fe0d3", "#2fb0c4"], 0.09);
  lapis(24, 75, ["#2fb0c4", "#12719f"], 0.09);
  lapis(75, 600, ["#12719f", "#0f5f8c"], 0.09);
  // perahu layar dan jejak airnya
  const layar = M("#fffaf0", 0.7, { side: T.DoubleSide });
  for (const [x, jarak, k] of [[-25, 44, 1.5], [21, 64, 1.2], [58, 40, 1.3], [-76, 72, 1.2]]) {
    const g = new T.Group();
    g.position.set(x, 0.15, pesisir(0) - 4 - jarak);
    g.userData.hidup = { jenis: "perahu" };
    g.scale.setScalar(k);
    S.add(g);
    taruh(g, new T.SphereGeometry(1, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), cet("#fd861d"), 0, 0.75, 0).scale.set(2.4, 0.8, 0.8);
    balok(g, cet("#8a5a36"), 0.12, 4.6, 0.12, 0, 0.6, 0);
    const s = new T.Shape([new T.Vector2(0.15, 1.3), new T.Vector2(2.1, 1.3), new T.Vector2(0.15, 5)]);
    taruh(g, new T.ShapeGeometry(s), layar);
    taruh(g, new T.PlaneGeometry(4.5, 0.5).rotateX(-Math.PI / 2), M("#fff", 0.7, { transparent: true, opacity: 0.4 }), -3.2, 0.03, 0);
  }
}

function airMancur(S, z, r) {
  const batu = M("#e3cfac", 0.6);
  taruh(S, new T.TorusGeometry(r, 0.42, 14, 72), batu, 0, 0.62, z).rotation.x = Math.PI / 2;
  const air = new T.MeshPhysicalMaterial({ color: "#1f94c4", roughness: 0.06, metalness: 0.35, clearcoat: 1 });
  taruh(S, new T.CircleGeometry(r - 0.2, 72).rotateX(-Math.PI / 2), air, 0, 0.68, z);
  tabung(S, batu, 0.45, 0.8, 2.4, 0, 0.5, z);
  tabung(S, batu, r * 0.43, 0.5, 0.6, 0, 2.5, z, 48);
  tabung(S, air, r * 0.4, r * 0.4, 0.05, 0, 3.08, z, 48);
  const semprot = M("#effaff", 0.15, { transparent: true, opacity: 0.45, depthWrite: false, emissive: "#9fd8ef", emissiveIntensity: 0.3 });
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    const titik = (q, y) => new T.Vector3(Math.cos(a) * q, y, z + Math.sin(a) * q);
    taruh(S, new T.TubeGeometry(new T.CatmullRomCurve3([titik(0.1, 3.2), titik(r * 0.22, 5.2), titik(r * 0.5, 4.2), titik(r * 0.78, 0.8)]), 20, 0.065, 5), semprot).castShadow = false;
  }
}

function pagar(S, L, belakang, depan, celah) {
  const g = mergeGeometries([new T.BoxGeometry(0.16, 1.5, 0.16).translate(0, 0.75, 0), new T.ConeGeometry(0.14, 0.26, 4).translate(0, 1.63, 0)]);
  const m = M("#fbfaf5", 0.45);
  // pagar depan satu kelompok: jadi penutup bagi orang yang berjalan di belakangnya
  const muka = new T.Group();
  muka.userData.penutup = "pagar";
  S.add(muka);
  const tiangDepan = [];
  const tiangSisi = [];
  for (let x = celah; x <= L; x += 0.85) tiangDepan.push({ x, z: depan }, { x: -x, z: depan });
  for (let z = belakang; z < depan; z += 0.85) tiangSisi.push({ x: L + 0.7, z }, { x: -L - 0.7, z });
  sebar(muka, g, m, tiangDepan);
  sebar(S, g, m, tiangSisi);
  for (const y of [0.4, 1.15])
    for (const s of [-1, 1]) {
      balok(muka, m, L - celah, 0.11, 0.08, (s * (L + celah)) / 2, y, depan);
      balok(S, m, 0.08, 0.11, depan - belakang, s * (L + 0.7), y, (belakang + depan) / 2);
    }
  for (const s of [-1, 1]) for (let i = 0; i <= 4; i++) balok(muka, B.mBata, 0.55, 1.95, 0.55, s * (celah + ((L - celah) * i) / 4), 0, depan);
}

function lampu(S, x, z) {
  const besi = cet("#26343f");
  tabung(S, besi, 0.08, 0.16, 3.9, x, 0, z, 12);
  tabung(S, besi, 0.3, 0.12, 0.2, x, 3.9, z, 12);
  taruh(S, new T.SphereGeometry(0.4, 20, 14), M("#fff6d0", 0.25, { emissive: "#ffe08a", emissiveIntensity: 0.5 }), x, 4.4, z);
}

function bangku(S, x, z, r) {
  const g = new T.Group();
  g.position.set(x, 0.1, z);
  g.rotation.y = r;
  S.add(g);
  for (let i = 0; i < 3; i++) balok(g, B.mKayu, 2.9, 0.1, 0.22, 0, 0.75, i * 0.28 - 0.15);
  for (const y of [1.1, 1.4]) balok(g, B.mKayu, 2.9, 0.2, 0.1, 0, y, -0.4);
  for (const s of [-1.2, 1.2]) balok(g, cet("#26343f"), 0.12, 1.35, 0.16, s, 0, -0.35);
}

export function mobil(S, x, z, warna, balik = false) {
  const g = new T.Group();
  g.position.set(x, 0.1, z);
  g.rotation.y = balik ? Math.PI : 0;
  S.add(g);
  const bentuk = (titik, d) => {
    const s = new T.Shape(titik.map((a) => new T.Vector2(...a)));
    return new T.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.1, bevelSegments: 3 }).translate(0, 0, -d / 2);
  };
  taruh(g, bentuk([[-2.2, 0.35], [2.2, 0.35], [2.3, 0.85], [1.4, 1.1], [-2.1, 1.1]], 1.8), new T.MeshPhysicalMaterial({ color: warna, metalness: 0.5, roughness: 0.25, clearcoat: 1 }));
  taruh(g, bentuk([[-1.7, 1.15], [1.2, 1.15], [0.6, 1.8], [-1.4, 1.8]], 1.55), B.kacaGelap);
  for (const a of [-1.4, 1.4]) for (const b of [-0.95, 0.95]) taruh(g, new T.CylinderGeometry(0.43, 0.43, 0.25, 20), B.hitam, a, 0.43, b).rotation.x = Math.PI / 2;
  return g;
}

/** Orang berjalan. Pakaian dari daftar warna; langkah 0–1 = satu siklus dua langkah. Asal = di antara kaki, menghadap +x. */
export function orang({ baju, celana, kulit, rambut, tinggi = 1.35, tas }) {
  const g = new T.Group();
  const k = tinggi / 1.75;
  const isi = new T.Group();
  isi.scale.setScalar(k);
  g.add(isi);
  const m = (c, r = 0.8) => M(c, r);
  const sendi = (x, y, z) => {
    const s = new T.Group();
    s.position.set(x, y, z);
    isi.add(s);
    return s;
  };
  const kapsul = (p, r, h, warna, y) => taruh(p, new T.CapsuleGeometry(r, h, 4, 12), m(warna), 0, y, 0);
  const kaki = [-0.13, 0.13].map((z) => sendi(0, 0.86, z));
  for (const s of kaki) {
    kapsul(s, 0.095, 0.62, celana, -0.38);
    taruh(s, new T.BoxGeometry(0.26, 0.1, 0.13), m("#2a2f38", 0.5), 0.05, -0.8, 0);
  }
  kapsul(isi, 0.2, 0.42, baju, 1.13);
  const lengan = [-0.27, 0.27].map((z) => sendi(0, 1.42, z));
  for (const s of lengan) {
    kapsul(s, 0.065, 0.46, baju, -0.26);
    taruh(s, new T.SphereGeometry(0.075, 10, 8), m(kulit), 0, -0.55, 0);
  }
  taruh(isi, new T.SphereGeometry(0.17, 18, 14), m(kulit, 0.6), 0, 1.66, 0);
  taruh(isi, new T.SphereGeometry(0.18, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.55), m(rambut, 0.5), -0.015, 1.68, 0);
  if (tas) taruh(isi, new T.BoxGeometry(0.2, 0.36, 0.3), m(tas, 0.6), -0.26, 1.12, 0);
  g.userData.langkah = (t) => {
    const a = Math.sin(t * Math.PI * 2);
    kaki[0].rotation.z = a * 0.5;
    kaki[1].rotation.z = -a * 0.5;
    lengan[0].rotation.z = -a * 0.45;
    lengan[1].rotation.z = a * 0.45;
    isi.position.y = Math.abs(Math.cos(t * Math.PI * 2)) * 0.03 * k;
  };
  g.userData.langkah(0);
  return g;
}
