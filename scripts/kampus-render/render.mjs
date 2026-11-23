// Render ulang gambar kampus + koordinat ketuknya:
//   PLAYWRIGHT=<folder modul playwright> CHROME=<chrome-headless-shell> node scripts/kampus-render/render.mjs
//   pratinjau cepat: ... render.mjs --draf=<folder> [--hanya=tinggi,lab]
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { once } from "node:events";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const di = path.dirname(fileURLToPath(import.meta.url));
const akar = path.resolve(di, "../..");
const butuh = createRequire(import.meta.url);
const esbuild = butuh("esbuild");
const sharp = butuh("sharp");
const { chromium } = butuh(process.env.PLAYWRIGHT ?? "playwright");

const opsi = (n) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const draf = opsi("draf");
const hanya = opsi("hanya")?.split(",");
const keluar = draf ?? path.join(akar, "public/kampus");
const [sampel, skala] = [Number(opsi("sampel") ?? (draf ? 10 : 56)), draf ? 0.8 : 1];
fs.mkdirSync(keluar, { recursive: true });

const paket = await esbuild.build({ entryPoints: [path.join(di, "adegan.js")], bundle: true, write: false, format: "iife", logLevel: "error" });
const folder = { "/publik/": path.join(akar, "public"), "/font/": path.join(akar, "src/fonts/app") };
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split("?")[0]);
  if (u === "/") return r.writeHead(200, { "content-type": "text/html" }).end('<!doctype html><meta charset="utf-8"><body><script src="/app.js"></script>');
  if (u === "/app.js") return r.writeHead(200, { "content-type": "text/javascript" }).end(paket.outputFiles[0].text);
  for (const [awal, d] of Object.entries(folder)) {
    if (!u.startsWith(awal) || u.includes("..")) continue;
    const f = path.join(d, u.slice(awal.length));
    if (fs.existsSync(f)) return r.writeHead(200, { "content-type": f.endsWith("webp") ? "image/webp" : "font/woff2" }).end(fs.readFileSync(f));
  }
  r.writeHead(404).end();
});
srv.listen(0, "127.0.0.1");
await once(srv, "listening");

const browser = await chromium.launch({ executablePath: process.env.CHROME, args: ["--use-angle=metal"] });
const DENAH = ["tinggi", "sedang", "lebar"];
const GEDUNG = ["lab", "komputer", "taman", "musala"];
const peta = {};
try {
  const hal = await browser.newPage();
  hal.setDefaultTimeout(0);
  hal.on("pageerror", (e) => console.error("halaman:", e.message));
  hal.on("console", (e) => e.type() === "error" && console.error("konsol:", e.text()));
  await hal.goto(`http://127.0.0.1:${srv.address().port}/`);
  await hal.evaluate(() => window.siapkan());
  const tulis = async (nama, url, mutu) => {
    const f = path.join(keluar, `${nama}.webp`);
    const i = await sharp(Buffer.from(url.split(",")[1], "base64")).removeAlpha().webp({ quality: mutu, effort: 6, smartSubsample: true }).toFile(f);
    console.log(nama, `${i.width}x${i.height}`, `${Math.round(i.size / 1024)} KB`);
  };
  /** Semua sprite satu denah dalam satu lembar WebP transparan. */
  const lembar = async (n, latar, gambar) => {
    const bg = sharp(Buffer.from(latar.split(",")[1], "base64")).removeAlpha();
    const isi = [];
    for (const g of gambar) {
      const kecil = await sharp(Buffer.from(g.url.split(",")[1], "base64")).resize(g.w, g.h, { kernel: "lanczos3" }).ensureAlpha();
      if (g.potong) {
        // topeng: alfa dari siluet, warna dari latar sendiri
        const alfa = await kecil.clone().extractChannel(3).raw().toBuffer();
        const p = g.potong;
        // sharp menjalankan joinChannel sebelum extract dalam satu pipa, jadi dipotong dulu
        const potongan = await bg.clone().extract({ left: p.x, top: p.y, width: p.w, height: p.h }).raw().toBuffer();
        isi.push({ ...g, buf: await sharp(potongan, { raw: { width: p.w, height: p.h, channels: 3 } }).joinChannel(alfa, { raw: { width: p.w, height: p.h, channels: 1 } }).png().toBuffer() });
      } else isi.push({ ...g, buf: await kecil.png().toBuffer() });
    }
    const LEBAR = Math.max(1024, ...isi.map((g) => g.w));
    const bingkai = {};
    let [x, y, baris] = [0, 0, 0];
    for (const g of [...isi].sort((a, b) => b.h - a.h)) {
      if (x + g.w > LEBAR) [x, y, baris] = [0, y + baris + 1, 0];
      bingkai[g.nama] = [x, y, g.w, g.h];
      g.left = x;
      g.top = y;
      x += g.w + 1;
      baris = Math.max(baris, g.h);
    }
    const tinggi = y + baris;
    const f = path.join(keluar, `hidup-${n}.webp`);
    const i = await sharp({ create: { width: LEBAR, height: tinggi, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite(isi.map((g) => ({ input: g.buf, left: g.left, top: g.top })))
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(f);
    console.log(`hidup-${n}`, `${i.width}x${i.height}`, `${Math.round(i.size / 1024)} KB`, Object.keys(bingkai).length, "bingkai");
    return { lembar: [LEBAR, tinggi], bingkai };
  };
  for (const n of DENAH.filter((x) => !hanya || hanya.includes(x))) {
    const t = Date.now();
    const { url, gambar, halangan, hidup, ...info } = await hal.evaluate(([a, b, c]) => window.denah(a, b, c), [n, sampel, skala]);
    await tulis(n, url, 70);
    peta[n] = { ...info, hidup: { ...hidup, ...(await lembar(n, url, gambar)) } };
    if (halangan.length) console.log(`  ${halangan.length} titik jalur tertutup benda:\n   ` + halangan.slice(0, 40).join("\n   "));
    console.log("  detik", (Date.now() - t) / 1000, "rasio aman", ((info.aman[2] * info.w) / (info.aman[3] * info.h)).toFixed(3));
  }
  for (const id of GEDUNG.filter((x) => !hanya || hanya.includes(x))) await tulis(`gedung-${id}`, await hal.evaluate(([a, b, c]) => window.satuGedung(a, b, c), [id, sampel, skala]), 78);
  if (draf) fs.writeFileSync(path.join(keluar, "peta.json"), JSON.stringify(peta));
  if (!draf && !hanya)
    fs.writeFileSync(
      path.join(akar, "src/components/kampus-peta.generated.ts"),
      `// DIBUAT OLEH scripts/kampus-render/render.mjs. Jangan diedit tangan.\n// Semua angka = bagian 0–1 dari gambar; kotak = [kiri, atas, lebar, tinggi].\n` +
        `export const PETA_KAMPUS = {\n${DENAH.map((n) => `  ${n}: ${JSON.stringify(peta[n])},`).join("\n")}\n};\n`,
    );
} finally {
  await browser.close();
  srv.close();
}
