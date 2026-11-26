// Local WebKit QA. Start npm run dev -- --port 39864, then run this script with --drag.
// Install Playwright/WebKit separately or set PLAYWRIGHT_MODULE to an existing module.
// Reads presenter props for the displayed puzzle; all answers use pointer/touch/keyboard UI.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright-core");

const worktree = process.cwd();
const dest = process.env.RUMILA_QA_OUTPUT ?? "/tmp/rumila-pilot-m31-35-qa";
const origin = "http://127.0.0.1:" + (process.env.RUMILA_QA_PORT ?? "39864");
const options = new Set(process.argv.slice(2));
const devices = [[390, 844, 844, "hp"], [820, 1067, 1180, "ipad-pendek"], [820, 1180, 1180, "ipad"]];
if (options.has("--narrow")) devices.push([320, 568, 568, "hp-sempit"]);
const presets = [
[31,"pilah","sd1-mat-jam-setengah-pagi"],
[31,"pilah","sd1-mat-jam-setengah-siang"],
[32,"urutkan","sd1-mat-urutan-hari"],
[32,"urutkan","sd1-mat-urutan-bulan"],
[33,"navigasi","sd1-kode-perbaiki-ulangi"],
[33,"navigasi","sd1-kode-perbaiki-ulangi-gudang"],
[34,"pilah","sd1-sains-air-atau-daratan-dari-pesawat"],
[34,"pilah","sd1-sains-air-atau-daratan"],
[35,"pilah","sd1-mat-carroll-kuning-bulat"],
[35,"pilah","sd1-mat-carroll-merah-bulat"],
];
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

async function press(page, locator, keyboard) {
  if (keyboard) {
    await locator.focus();
    await page.keyboard.press("Enter");
  } else {
    await tap(page, locator);
  }
}

async function tryVisibleDrag(page, from, to) {
  const point = locator => locator.evaluate(el => {
    const r = el.getBoundingClientRect(), viewport = visualViewport, stage = el.closest("[data-panggung]").getBoundingClientRect();
    const x = (r.left + r.right) / 2, y = (r.top + r.bottom) / 2;
    const visible = x >= stage.left && x <= stage.right && y >= stage.top && y <= stage.bottom && el.contains(document.elementFromPoint(x, y));
    return { x, y, visible };
  });
  const start = await point(from), end = await point(to);
  if (!start.visible || !end.visible) return { worked: false, start, end };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, { steps: 15 });
  await page.mouse.up();
  return { worked: true, start, end };
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
    const below = buttons.filter(b => b.getBoundingClientRect().bottom > frame.bottom + 2).map(b => b.getAttribute("aria-label") ?? b.textContent);
    const bottom = Math.max(frame.top, ...buttons.map(b => b.getBoundingClientRect().bottom));
    const panelOuter = stage.parentElement.getBoundingClientRect();
    const fullBlankBelow = Math.max(0, visualViewport.height - panelOuter.bottom);
    return {
      viewport: [visualViewport.width, visualViewport.height, visualViewport.scale],
      verticalScroll: stage.scrollHeight - stage.clientHeight,
      horizontalScroll: Math.max(stage.scrollWidth - stage.clientWidth, doc.scrollWidth - doc.clientWidth),
      out: offSides, clippedTexts: overflow, below,
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
  const items = (paket.items ?? []).map(i => ({ ...i, label: t(i.altKey ?? i.labelKey) }));
  const patterns = paket.patterns?.map(p => ({ id: p.id, labels: p.unit.map(id => items.find(i => i.id === id).label) }));
  const bins = new Map(paket.bins?.map(b => [b.id, t(b.labelKey)]) ?? []);
  return { items, patterns, bins, unitLen: paket.unitLen };
}

function cardFor(stage, item) {
 const cards = stage.getByRole("button", { name: item.label, exact: true });
 return item.adegan?.varian?.startsWith("jam-waktu-") ? cards.filter({has:stage.page().locator(`[data-jam-waktu="${item.adegan.varian}"]`)}) : item.label === "jam" ? cards.filter({hasText:item.emoji}) : cards;
}

async function solveSort(page, stage, model, i, path, prefix, seen) {
  const rack = stage.locator("[data-wadah-kelompok]");
  const rackLabels = await rack.getByRole("button").evaluateAll(buttons => buttons.map(b => b.getAttribute("aria-label")));
  const found = [];
  for (const item of model.items) {
    if (await cardFor(stage, item).count() === 1) found.push(item);
  }
  const visibleCards = await stage.getByRole("button").evaluateAll(buttons => buttons.filter(b => !b.closest("[data-wadah-kelompok]")).map(b => b.getAttribute("aria-label")));
  assert.equal(found.length, visibleCards.length, "Unexpected unsorted card labels: " + visibleCards.join(", "));
  assert.ok(found.length >= 4);
  const late = [], assets = [], drag = [];
  const testDrag = options.has("--drag") && i >= 3;
  if (testDrag) {
    const bin = [...rackLabels].reverse().find(label => found.some(item => model.bins.get(item.bin) === label));
    const where = found.findIndex(item => model.bins.get(item.bin) === bin);
    assert.ok(where >= 0, "No object matching the last visible target");
    found.unshift(...found.splice(where, 1));
  }
  for (const item of found) {
    const card = cardFor(stage, item);
    const art = await card.evaluate(el => {
      const picture = el.querySelector("svg[data-ilustrasi], [data-ilustrasi], img");
      if (!picture) return null;
      const c = el.getBoundingClientRect(), p = picture.getBoundingClientRect();
      return { variant: picture.getAttribute("data-ilustrasi"), bounds: [p.x,p.y,p.right,p.bottom], card: [c.x,c.y,c.right,c.bottom], fits: p.left >= c.left-1 && p.right <= c.right+1 && p.top >= c.top-1 && p.bottom <= c.bottom+1 };
    });
    if (item.adegan?.jenis === "ilustrasi") {
      assert.equal(art?.variant, item.adegan.varian, item.label);
      assert.ok(art.fits, JSON.stringify({item:item.id,art}));
    }
    assets.push({ id:item.id, label:item.label, bin:item.bin, art, emoji:item.emoji });
    if (!seen.has(item.id) && !options.has("--no-art")) {
      seen.add(item.id);
      await card.screenshot({ path: prefix + "-benda-" + item.id + ".png", animations: "disabled" });
    }
  }
  await stage.evaluate(el => { el.scrollTop = 0; });
  for (const [k, item] of found.entries()) {
    const binName = model.bins.get(item.bin);
    assert.ok(rackLabels.includes(binName), "Visible item with no open rack: " + item.label);
    if (k === found.length - 1) {
      await stage.evaluate(el => { el.scrollTop = 0; });
      await stable(page);
      const lateMeasurement = await geometry(page);
      late.push(lateMeasurement);
      if (path) await page.screenshot({ path, animations: "disabled" });
      if (path && lateMeasurement.verticalScroll > 12) {
        await stage.evaluate(el => { el.scrollTop = el.scrollHeight; });
        await stable(page);
        await page.screenshot({ path: path.replace(/\.png$/, "-bawah.png"), animations: "disabled" });
      }
    }
    const source = cardFor(stage, item);
    const target = rack.getByRole("button", { name: binName, exact: true });
    if (testDrag && !drag.some(d => d.binName === binName)) {
      const outcome = await tryVisibleDrag(page, source, target);
      assert.ok(outcome.worked, JSON.stringify({ item: item.label, binName, ...outcome }));
      drag.push({ item: item.label, binName, ...outcome });
      if(k < found.length-1) await rack.getByRole("button", { name: "Ambil " + item.label + " dari " + binName, exact: true }).waitFor({ timeout: 5000 });
    } else {
      await press(page, source, (k + i) % 2 === 0);
      await press(page, target, (k + i) % 2 !== 0);
    }
  }
  return { itemIds: found.map(x => x.id), itemLabels: found.map(x => x.label), bins: rackLabels, late, assets, drag };
}


async function readRound(stage) {
 return stage.evaluate(el => {
  const visit = f => { if (!f) return null; if(f.memoizedProps?.ronde && f.memoizedProps?.paket) return f.memoizedProps.ronde; return visit(f.child) ?? visit(f.sibling); };
  const key=Object.keys(el).find(k=>k.startsWith('__reactFiber'));
  return visit(el[key]);
 });
}
function simulate(g,p) {
 let {x,y,dir}=g.start; let d=['N','E','S','W'].indexOf(dir);
 const flat = p.flatMap(b=>b.cmd==='ulangi'?Array.from({length:b.n},()=>b.body).flat():[b]);
 for(const [i,b] of flat.entries()) {
  if(b.cmd==='maju') {x += [0,1,0,-1][d];y += [-1,0,1,0][d];}
  else d=(d+(b.cmd==='kanan'?1:3))%4;
  if(x<0||x>=g.w||y<0||y>=g.h||g.walls.some(w=>w.x===x&&w.y===y))return false;
  if(x===g.goal.x&&y===g.goal.y)return i===flat.length-1;
 }
 return false;
}
function repair(r) {
 const initial=r.program;
 for(let i=0;i<initial.length;i++) {
  const b=initial[i];
  if(b.cmd==='ulangi') {
   for(let n=2;n<=6;n++) {const p=structuredClone(initial);p[i].n=n;if(simulate(r.grids[0],p))return {p,i,n};}
   for(let j=0;j<b.body.length;j++)for(const cmd of ['maju','kiri','kanan']) {const p=structuredClone(initial);p[i].body[j]={cmd};if(simulate(r.grids[0],p))return {p,i,j,cmd};}
  } else for(const cmd of ['maju','kiri','kanan']) {const p=structuredClone(initial);p[i]={cmd};if(simulate(r.grids[0],p))return {p,i,cmd};}
 }
 throw Error('No single edit solution '+r.grids[0].id);
}
async function solveOther(page,stage,mechanic,path) {
 const r=await readRound(stage); assert.ok(r);
 if(mechanic==='urutkan') {
  // Derive the answer from the calendar cycle, independently of the stored key.
  const cycle=r.shown.some(x=>x.id==='januari'||x.id==='februari'||x.id==='desember')?
  ['januari','februari','maret','april','mei','juni','juli','agustus','september','oktober','november','desember']:
  (r.shown.some(x=>['senin','selasa','rabu','kamis','jumat','sabtu','minggu'].includes(x.id))?['senin','selasa','rabu','kamis','jumat','sabtu','minggu']:['januari','februari','maret','april','mei','juni','juli','agustus','september','oktober','november','desember']);
  const start=cycle.indexOf(r.correct[0]);
  const ordered=Array.from({length:r.shown.length},(_,i)=>cycle[(start+i)%cycle.length]);
  assert.deepEqual(r.correct,ordered);
  for(const [i,id] of ordered.entries()) {
   if(i===ordered.length-1)await page.screenshot({path:path+'-satu-kartu.png',animations:'disabled'});
   const label=id[0].toUpperCase()+id.slice(1);
   const from=stage.getByRole('button',{name:label,exact:true}), to=stage.getByRole('button',{name:'Slot '+(i+1),exact:true});
   if(options.has('--drag')) { const d=await tryVisibleDrag(page,from,to);assert.ok(d.worked,JSON.stringify(d));if(i < ordered.length-1)await stage.getByRole('button',{name:'Slot '+(i+1)+': '+label,exact:true}).waitFor({timeout:5000}); }
   else {await tap(page,from);await tap(page,to);}
  }
  return {ordered};
 }
 const fix=repair(r);
 if(fix.n!==undefined) {
  let n=r.program[fix.i].n;
  while(n!==fix.n) {
   const group=stage.locator(`[aria-label="Blok ${fix.i+1}: ulangi ${n} kali"]`);
   await tap(page,group.getByRole('button',{name:`Ulangi ${n} kali, ketuk untuk mengubah`,exact:true}));
   n=n>=6?2:n+1;
  }
 } else if(fix.j!==undefined) {
  const group=stage.locator(`[aria-label="Blok ${fix.i+1}: ulangi ${r.program[fix.i].n} kali"]`);
  await tap(page,group.getByRole('button',{name:'Isi blok ulangi',exact:true}));
  // Remove the body and rebuild in its original order, changing only the erroneous command.
  for(let j=r.program[fix.i].body.length-1;j>=0;j--)await tap(page,group.getByRole('button',{name:/ketuk untuk menghapus/}).nth(j));
  for(const b of fix.p[fix.i].body)await tap(page,stage.getByRole('button',{name:b.cmd,exact:true}));
 } else {
  await tap(page,stage.getByRole('button',{name:new RegExp('^Blok '+(fix.i+1)+': ')}));
  await tap(page,stage.getByRole('button',{name:fix.cmd,exact:true}));
 }
 await page.screenshot({path:path+'-diperbaiki.png',animations:'disabled'});
 await tap(page,page.getByRole('button',{name:/^Jalan/}));
 for(let i=0;i<30;i++) {
  await page.clock.runFor(400);
  if(await page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('rumila-akademi-events-')).flatMap(k=>JSON.parse(localStorage.getItem(k))).filter(e=>e.type==='attempt').length) >= Number(path.match(/-(\d+)$/)?.[1]))break;
 }
 return {grid:r.grids[0].id,initial:r.program,repaired:fix.p};
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
  const model = assetModel(JSON.parse(await readFile(worktree + "/content/paket/" + mechanic + "/" + slug + ".json", "utf-8")));
  const ctx = await browser.newContext({ viewport: { width, height }, screen: { width, height: screenHeight }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await ctx.route("**/*", route => {
    const uri = new URL(route.request().url());
    return uri.origin === origin || ["fonts.gstatic.com", "fonts.googleapis.com"].includes(uri.hostname) ? route.continue() : route.abort();
  });
  const page = await ctx.newPage();
  const prefix = dest + "/" + name + "-m" + mission + "-" + slug;
  const rounds = [], errors = [], seen = new Set();
  page.on("pageerror", e => errors.push(e.message));
  await page.addInitScript(id => {
    sessionStorage.setItem("rinoya-intro", "1");
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
      const retainLate = i === 1 || i === 5 || i === 9 || i === limit;
      const solution = mechanic === "pilah" ? await solveSort(page, stage, model, i, retainLate ? id + "-satu-kartu.png" : undefined, prefix, seen) : await solveOther(page, stage, mechanic, id);
      const attempted = await event(page, slug + "#" + (i - 1), slug);
      assert.equal(attempted.payload.correct, true, JSON.stringify(attempted.payload.detail));
      assert.equal(attempted.payload.hintUsed, false);
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
