// Local browser QA: PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs npx tsx scripts/qa-pilot-26-31.mjs
// Start next dev on port 3876 first. Output, device, mission, slug, seed and resume are configurable with RUMILA_QA_* env vars.
import {buatRonde,buatRondeUnik,kunciRonde,knobDefaults,geserKnob,jalankan} from "../packages/mechanics/src/index.ts";
const navStates=new Map();
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0;}
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");

const worktree = process.cwd();
const dest = process.env.RUMILA_QA_OUTPUT ?? "/tmp/rumila-qa-26-31";
const origin = "http://127.0.0.1:" + (process.env.RUMILA_QA_PORT ?? "3876");
const options = new Set(process.argv.slice(2));
const devices = [[390, 844, 844, "hp"], [820, 1067, 1180, "ipad-pendek"], [820, 1180, 1180, "ipad"]];
if (options.has("--narrow")) devices.push([320, 568, 568, "hp-sempit"]);
const presets = [[26, "urutkan", "sd1-sains-bunyi-makin-jauh-makin-pelan"], [26, "urutkan", "sd1-sains-bunyi-dekat-jauh-jalan"], [27, "urutkan", "sd1-mat-urut-ringan-berat"], [27, "urutkan", "sd1-mat-belanja-ringan-berat"], [28, "urutkan", "sd1-mat-urut-isi-wadah"], [28, "urutkan", "sd1-mat-wadah-halaman-isi"], [29, "navigasi", "sd1-kode-tebak-petak-angkasa"], [29, "navigasi", "sd1-kode-tebak-petak-ulangi"], [30, "pilah", "sd1-sains-butuh-listrik-sekolah"], [30, "pilah", "sd1-sains-butuh-listrik-rumah"], [31, "pilah", "sd1-mat-jam-setengah-pagi"], [31, "pilah", "sd1-mat-jam-setengah-siang"]];
const seeds = ["3a03bd4e-8dde-4e9d-ad01-000000000000", "3a03bd4e-8dde-4e9d-ad01-000000000913", "3a03bd4e-8dde-4e9d-ad01-000000000914"];
const stageCss = "[data-panggung]";

async function tap(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  const point = await locator.evaluate(el => {
    const r = el.getBoundingClientRect(), v = visualViewport;
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const hit = document.elementFromPoint(x, y);
    return { x: (x - v.offsetLeft) * v.scale, y: (y - v.offsetTop) * v.scale, scale: v.scale, hit: el.contains(hit), label: el.getAttribute("aria-label"), intercepted: hit?.getAttribute("aria-label") };
  });
  assert.ok(point.hit, "Touch target obstructed: " + JSON.stringify(point));
  await page.touchscreen.tap(point.x, point.y);
}

async function stable(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.allSettled(document.getAnimations().filter(a => a.animationName === "akademi-fade").map(a => a.finished));
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function geometry(page) {
  return page.evaluate(() => {
    const stage = document.querySelector("[data-panggung]");
    const frame = stage.getBoundingClientRect();
    const doc = document.documentElement;
    const buttons = [...stage.querySelectorAll("button"), ...document.querySelectorAll("[data-aksi-bawah] button")];
    const allElements = [...stage.querySelectorAll("button, img, span"), ...document.querySelectorAll("[data-aksi-bawah] button")];
    const rect = (b) => {
      const r = b.getBoundingClientRect();
      return [r.left, r.top, r.right, r.bottom].map(n => Math.round(n * 10) / 10);
    };
    const overflow = allElements
      .filter(e => e.clientWidth > 0 && e.clientHeight > 0 && e.getAttribute("aria-hidden") !== "true")
      .filter(e => e.scrollWidth > e.clientWidth + 3 && ["hidden", "clip"].includes(getComputedStyle(e).overflowX))
      .map(e => [e.getAttribute("aria-label") ?? e.textContent, e.clientWidth, e.scrollWidth]);
    const offSides = buttons.filter(b => {
      const r = b.getBoundingClientRect();
      return r.width && (r.left < frame.left - 2 || r.right > frame.right + 2);
    }).map(b => [b.getAttribute("aria-label") ?? b.textContent, rect(b)]);
    const below = buttons.filter(b => stage.contains(b) && b.getBoundingClientRect().bottom > frame.bottom + 2).map(b => b.getAttribute("aria-label") ?? b.textContent);
    const bottom = Math.max(frame.top, ...buttons.map(b => b.getBoundingClientRect().bottom));
    const panelOuter = stage.parentElement.getBoundingClientRect();
    const fullBlankBelow = Math.max(0, visualViewport.height - panelOuter.bottom);
    return {
      viewport: [visualViewport.width, visualViewport.height, visualViewport.scale],
      verticalScroll: stage.scrollHeight - stage.clientHeight,
      horizontalScroll: Math.max(stage.scrollWidth - stage.clientWidth, doc.scrollWidth - doc.clientWidth),
      out: offSides, clippedTexts: overflow, below,
      outsideViewport: buttons.filter(b=>{ const r=b.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth+1 || r.top < -1 || r.bottom > innerHeight+1); }).map(b=>b.getAttribute("aria-label")??b.textContent),
      artOut: [...stage.querySelectorAll("button")].flatMap(b=>{const r=b.getBoundingClientRect();return [...b.querySelectorAll("svg[data-adegan],svg[data-ilustrasi],img")].filter(a=>{const q=a.getBoundingClientRect();return q.left<r.left-1||q.right>r.right+1||q.top<r.top-1||q.bottom>r.bottom+1;}).map(()=>b.getAttribute("aria-label"));}),
      blankBelowCss: Math.round(Math.max(0, frame.bottom - bottom)),
      blankBelowRatio: Math.round(1000 * Math.max(0, frame.bottom - bottom) / frame.height) / 1000,
      fullViewportBlankBelowRatio: Math.round(1000 * fullBlankBelow / visualViewport.height) / 1000,
      fullViewportBlankBelowPx: Math.round(fullBlankBelow * visualViewport.scale),
      outerPanel: rect(stage.parentElement),
      canScroll: !!document.querySelector("[data-gulir-lagi]"),
      stage: rect(stage),
      textButtons: buttons.map(b => [b.getAttribute("aria-label") ?? b.textContent, rect(b)]),
    };
  });
}

function assetModel(paket) {
  const t = k => paket.locale.id[k];
  const items = paket.items.map(i => ({ ...i, label: t(i.altKey ?? i.labelKey) }));
  const patterns = paket.patterns?.map(p => ({ id: p.id, labels: p.unit.map(id => items.find(i => i.id === id).label) }));
  const bins = new Map(paket.bins?.map(b => [b.id, t(b.labelKey)]) ?? []);
  return { items, patterns, bins, unitLen: paket.unitLen };
}

async function solveOrder(page, stage, pack) {
  const labels = await stage.locator('button[aria-pressed]').evaluateAll(es=>es.map(e=>e.getAttribute('aria-label')));
  const t=k=>pack.locale.id[k];
  const sequences=pack.sequences.filter(s=>labels.every(l=>s.steps.some(x=>t(x.labelKey)===l)));
  assert.ok(sequences.length, labels.join(','));
  const ordered=sequences[0].steps.filter(x=>labels.includes(t(x.labelKey)));
  const phases=[];
  for(const [i,item] of ordered.entries()) {
    await tap(page,stage.getByRole('button',{name:t(item.labelKey),exact:true}));
    await tap(page,stage.getByRole('button',{name:'Slot '+(i+1),exact:true}));
    if(i<ordered.length-1){await stable(page);phases.push(await geometry(page));if(i===ordered.length-2)await page.screenshot({path:page.qaPrefix+'-satu-kartu.png',animations:'disabled'});}
  }
  return {labels, ordered:ordered.map(x=>x.id), phases};
}
async function solvePilah(page,stage,model) {
 const stock=stage.locator('button[aria-pressed]:not([aria-label^="Ambil "])');
 const cards=await stock.evaluateAll(es=>es.map(e=>({label:e.getAttribute('aria-label'),text:e.textContent})));
 const phases=[];
 for(const [index,card] of cards.entries()){
   const item=model.items.find(x=>x.label===card.label && (!x.emoji || card.text.includes(x.emoji) || model.items.filter(y=>y.label===x.label).length===1));
   assert.ok(item,JSON.stringify(card));
   const candidates=stock.filter({hasText:card.text});
   await tap(page,candidates.first());
   await tap(page,stage.locator('[data-wadah-kelompok]').getByRole('button',{name:model.bins.get(item.bin),exact:true}));
   if(index<cards.length-1){await stable(page);await stage.evaluate(el=>{el.scrollTop=0;});phases.push(await geometry(page));if(index===cards.length-2)await page.screenshot({path:page.qaPrefix+'-satu-kartu.png',animations:'disabled'});}
 }
 return {cards,phases};
}
async function solveNav(page,stage,pack,round,seed){
 const key=seed+pack.id; let state=navStates.get(key);
 if(!state){state={knobs:knobDefaults(pack),history:[]};navStates.set(key,state);}
 const h=hash(`m1|${pack.id}|${round-1}|${seed}`);
 const r=round===1?buatRonde(pack,state.knobs,h):buatRondeUnik(pack,state.knobs,h,state.history);
 state.history.push(kunciRonde(r));
 if(round%2===0)state.knobs=geserKnob(pack,state.knobs,1);
 const run=jalankan(r.ronde.grids[0],r.ronde.program);
 assert.equal(run.outcome,'bintang');
 for(const step of run.steps){
   await tap(page,stage.getByRole('button',{name:`Petak ${step.after.x+1}, ${step.after.y+1}`,exact:true}));
   await tap(page,page.getByRole('button',{name:'Langkah ▶',exact:true}));
   await page.clock.runFor(1200);
 }
 return {grid:r.ronde.grids[0],steps:run.steps};
}

async function event(page, id, slug, kind = "attempt") {
  const saved = await page.waitForFunction(({ id, slug, kind }) => Object.keys(localStorage)
    .filter(k => k.startsWith("rumila-akademi-events-"))
    .flatMap(k => JSON.parse(localStorage.getItem(k)))
    .find(e => e.type === kind && e.activityId === slug && (id === null || e.payload.itemId === id)), { id, slug, kind }, { timeout: 8000 });
  return saved.jsonValue();
}

async function run(browser, device, preset) {
  const [width, height, screenHeight, name] = device, [mission, mechanic, slug] = preset;
  const seedIndex = options.has("--fixed-seed") ? 0 : devices.indexOf(device);
  const seed = process.env.RUMILA_QA_SEED ?? seeds[seedIndex % seeds.length];
  const pack = JSON.parse(await readFile(worktree + "/content/paket/" + mechanic + "/" + slug + ".json", "utf-8"));
  const model = mechanic === "pilah" ? assetModel(pack) : pack;
  const ctx = await browser.newContext({ viewport: { width, height }, screen: { width, height: screenHeight }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await ctx.route("**/*", route => {
    const uri = new URL(route.request().url());
    return uri.origin === origin || ["fonts.gstatic.com", "fonts.googleapis.com"].includes(uri.hostname) ? route.continue() : route.abort();
  });
  const page = await ctx.newPage();
  const prefix = dest + "/" + name + "-m" + mission + "-" + slug;
  const rounds = [], errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.addInitScript(id => {
    window.__name = (fn) => fn; sessionStorage.setItem("rinoya-intro", "1");
    crypto.randomUUID = () => id;
  }, seed);
  await page.clock.install();
  try {
    const result = await page.goto(origin + "/dev/akademi?paket=" + slug, { timeout: 90000, waitUntil: "domcontentloaded" });
    assert.equal(result.status(), 200);
    const limit = options.has("--one") ? 1 : 10;
    for (let i = 1; i <= limit; i++) {
      const progress = page.getByRole("progressbar", { name: new RegExp("^Ronde " + i + " dari ") });
      await progress.waitFor({ timeout: 90000 });
      await stable(page);
      const stage = page.locator(stageCss);
      const before = await geometry(page);
      const id = prefix + "-" + String(i).padStart(2, "0");
      await page.screenshot({ path: id + "-awal.png", animations: "disabled" });
      page.qaPrefix=id;
      const solution = mechanic === "urutkan" ? await solveOrder(page, stage, pack) : mechanic === "navigasi" ? await solveNav(page, stage, pack, i, seed) : await solvePilah(page, stage, model);
      const attempted = await event(page, slug + "#" + (i - 1), slug);
      assert.equal(attempted.payload.correct, true, JSON.stringify(attempted.payload.detail));
      assert.equal(attempted.payload.hintUsed, false);
      if(mechanic==="navigasi")assert.equal(attempted.payload.detail.prediksiBenar,attempted.payload.detail.prediksiTotal);
      rounds.push({ i, before, ...solution, score: attempted.payload.detail, knobs: attempted.payload.knobs });
      await page.clock.fastForward(1500);
      const finish = page.getByRole("button", { name: "Main lagi" });
      if (await finish.isVisible()) break;
    }
    let final = null;
    if (!options.has("--one")) {
      await page.getByRole("button", { name: "Main lagi" }).waitFor({ timeout: 9000 });
      const scored = await event(page, null, slug, "activity_end");
      final = scored.payload;
      assert.equal(final.successCount, rounds.length);
      assert.equal(final.failCount, 0);
      assert.equal(final.hintCount, 0);
      assert.ok(await page.getByText(new RegExp(rounds.length + " dari " + rounds.length + " benar")).isVisible());
      await page.screenshot({ path: prefix + "-hasil.png", animations: "disabled" });
    }
    for(const round of rounds) for(const layout of [round.before, ...(round.phases ?? [])]) {
      assert.deepEqual(layout.out, [], "Card outside panel sides");
      assert.deepEqual(layout.below, [], "Card below panel");
      assert.deepEqual(layout.artOut, [], "Picture outside card");
      assert.deepEqual(layout.outsideViewport, [], "Control outside viewport");
      assert.deepEqual(layout.clippedTexts, [], "Clipped label");
      assert.ok(layout.horizontalScroll <= 1, "Horizontal overflow");
    }
    const report = { device: name, mechanic, slug, seed, rounds, final, errors };
    await writeFile(prefix + ".json", JSON.stringify(report, null, 2));
    assert.deepEqual(errors, [], "Browser page errors");
    console.log([name, slug, rounds.length + " rounded", final ? "clear" : "smoke"].join(" "));
  } catch (error) {
    await page.screenshot({ path: prefix + "-error.png", animations: "disabled" }).catch(() => {});
    await writeFile(prefix + "-error.json", JSON.stringify({ device: name, mechanic, slug, seed, rounds, errors, error: String(error), body: await page.locator("body").ariaSnapshot().catch(() => "") }, null, 2));
    throw error;
  } finally {
    await ctx.close();
  }
}

await mkdir(dest, { recursive: true });
const browser = await webkit.launch();
try {
  const chosen = devices.filter(d => !process.env.RUMILA_QA_DEVICE || d[3] === process.env.RUMILA_QA_DEVICE);
  const packages = presets.filter(p => (!process.env.RUMILA_QA_SLUG || p[2] === process.env.RUMILA_QA_SLUG) && (!process.env.RUMILA_QA_MISSION || p[0] === Number(process.env.RUMILA_QA_MISSION)));
  assert.ok(chosen.length && packages.length);
  let errors = 0;
  await Promise.all(chosen.map(async d => {
    for (const p of packages) {
      try {
        if(process.env.RUMILA_QA_RESUME){try {const done=JSON.parse(await readFile(dest+"/"+d[3]+"-m"+p[0]+"-"+p[2]+".json","utf8"));if(done.final){console.log(d[3],p[2],"previously completed");continue;}}catch{}}
        await run(browser, d, p);
      } catch (error) {
        console.error(d[3], p[2], error);
        errors++;
      }
    }
  }));
  assert.equal(errors, 0);
} finally {
  await browser.close();
}
