import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const { webkit } = await import(process.env.RUMILA_PLAYWRIGHT_MODULE ?? "playwright-core");

const worktree = fileURLToPath(new URL("../../", import.meta.url));
const dest = process.env.RUMILA_QA_OUTPUT ?? "/tmp/rumila-pilot-m37-42-qa";
const origin = "http://localhost:" + (process.env.RUMILA_QA_PORT ?? "3878");
const options = new Set(process.argv.slice(2));
const devices = [[390, 844, 844, "hp"], [820, 1067, 1180, "ipad-pendek"], [820, 1180, 1180, "ipad"]];
if (options.has("--narrow")) devices.push([320, 568, 568, "hp-sempit"]);
// Nomor diverifikasi melalui petaJenjang(SD1, [MAT, KODE, SAINS]), total 42.
const map=[
  {
    "nomor": 37,
    "id": "SAINS.SD1.MATAHARI.01",
    "packs": [
      {
        "id": "sd1-sains-cepat-atau-lambat-hangat",
        "mechanic": "pilah"
      },
      {
        "id": "sd1-sains-tebak-panas-matahari",
        "mechanic": "pilah"
      }
    ]
  },
  {
    "nomor": 38,
    "id": "MAT.SD1.POLA.01",
    "packs": [
      {
        "id": "sd1-mat-pola-besar-kecil-arah",
        "mechanic": "pola"
      },
      {
        "id": "sd1-mat-pola-tangan-bintang",
        "mechanic": "pola"
      }
    ]
  },
  {
    "nomor": 39,
    "id": "KODE.SD1.PERANGKAT.01",
    "packs": [
      {
        "id": "sd1-kode-kabel-tanpa-kabel",
        "mechanic": "pilah"
      },
      {
        "id": "sd1-kode-sambungan-perangkat",
        "mechanic": "pilah"
      }
    ]
  },
  {
    "nomor": 40,
    "id": "KODE.SD1.PERANGKAT.02",
    "packs": [
      {
        "id": "sd1-kode-cari-robot-pabrik",
        "mechanic": "pilah"
      },
      {
        "id": "sd1-kode-robot-atau-bukan",
        "mechanic": "pilah"
      }
    ]
  },
  {
    "nomor": 41,
    "id": "SAINS.SD1.PENGAMATAN.01",
    "packs": [
      {
        "id": "sd1-sains-ukur-jengkal-temuan-kebun",
        "mechanic": "simulasi"
      },
      {
        "id": "sd1-sains-ukur-kubus-temuan-kebun",
        "mechanic": "simulasi"
      }
    ]
  },
  {
    "nomor": 42,
    "id": "SAINS.SD1.PENGAMATAN.02",
    "packs": [
      {
        "id": "sd1-sains-turus-pengunjung-kebun",
        "mechanic": "simulasi"
      },
      {
        "id": "sd1-sains-turus-pengunjung-kolam",
        "mechanic": "simulasi"
      }
    ]
  }
];
const presets = map.flatMap(m=>m.packs.map(p=>[m.nomor,p.mechanic,p.id]));
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
    return { x: (x - viewport.offsetLeft) * viewport.scale, y: (y - viewport.offsetTop) * viewport.scale, visible };
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
      .filter(e => e.clientWidth > 0 && e.clientHeight > 0 && e.getAttribute("aria-hidden") !== "true" && !e.classList.contains("sr-only"))
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
  const items = paket.items.map(i => ({ ...i, label: t(i.altKey ?? i.labelKey) }));
  const patterns = paket.patterns?.map(p => ({ id: p.id, labels: p.unit.map(id => items.find(i => i.id === id).label) }));
  const bins = new Map(paket.bins?.map(b => [b.id, t(b.labelKey)]) ?? []);
  return { ...paket, items, patterns, bins, unitLen: paket.unitLen };
}

async function solvePattern(page, stage, model, i, path) {
  const slots = await stage.getByRole("button", { name: /^Slot (?:kosong )?\d+/ }).evaluateAll(buttons => buttons.map(b => b.getAttribute("aria-label")));
  const shown = slots.filter(s => !s.startsWith("Slot kosong")).map(s => s.replace(/^Slot \d+: /, ""));
  const pattern = model.patterns.find(p => p.labels.every((value, j) => value === shown[j]));
  assert.ok(pattern, "Missing authored pattern: " + JSON.stringify(shown));
  assert.ok(shown.every((value, j) => value === pattern.labels[j % pattern.labels.length]), "Visible unit sequence changes within round");
  const empty = slots.map((slot, j) => ({ slot, j })).filter(x => x.slot.startsWith("Slot kosong"));
  assert.ok(empty.length > 0 && empty.length <= 3);
  for (const [k, {j}] of empty.entries()) {
    const label = pattern.labels[j % pattern.labels.length];
    if (k % 2 === 0) await press(page, stage.getByRole("button", { name: "Slot kosong " + (j + 1), exact: true }), i % 2 === 0);
    if (k === empty.length - 1 && path) {
      await stable(page);
      await page.screenshot({ path, animations: "disabled" });
    }
    await press(page, stage.getByRole("button", { name: label, exact: true }), i % 2 !== 0);
  }
  return { patternId: pattern.id, shown: shown.length, answers: empty.map(({j}) => pattern.labels[j % pattern.labels.length]) };
}


async function solveSort(page, stage, model, i, path, prefix, seen) {
  const rack = stage.locator("[data-wadah-kelompok]");
  const rackLabels = await rack.getByRole("button").evaluateAll(buttons => buttons.map(b => b.getAttribute("aria-label")));
  const found = [];
  for (const item of model.items) {
    if (await stage.getByRole("button", { name: item.label, exact: true }).count() === 1) found.push(item);
  }
  const visibleCards = await stage.getByRole("button").evaluateAll(buttons => buttons.filter(b => !b.closest("[data-wadah-kelompok]")).map(b => b.getAttribute("aria-label")));
  assert.equal(found.length, visibleCards.length, "Unexpected unsorted card labels: " + visibleCards.join(", "));
  assert.ok(found.length >= 4);
  const late = [], assets = [], drag = [];
  const testDrag = options.has("--drag") && i === 10 && page.viewportSize().width === 390;
  if (testDrag) {
    const bin = rackLabels.at(-1);
    const where = found.findIndex(item => model.bins.get(item.bin) === bin);
    assert.ok(where >= 0, "No object matching the last visible target");
    found.unshift(...found.splice(where, 1));
  }
  for (const item of found) {
    const card = stage.getByRole("button", { name: item.label, exact: true });
    const art = await card.evaluate(el => {
      const picture = el.querySelector("svg[data-varian], svg[data-ilustrasi], [data-ilustrasi], img");
      if (!picture) return null;
      const c = el.getBoundingClientRect(), p = picture.getBoundingClientRect();
      return { variant: picture.getAttribute("data-varian") ?? picture.getAttribute("data-ilustrasi"), bounds: [p.x,p.y,p.right,p.bottom], card: [c.x,c.y,c.right,c.bottom], fits: p.left >= c.left-1 && p.right <= c.right+1 && p.top >= c.top-1 && p.bottom <= c.bottom+1 };
    });
    if (item.adegan?.varian) {
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
    const source = stage.getByRole("button", { name: item.label, exact: true });
    const target = rack.getByRole("button", { name: binName, exact: true });
    if (testDrag && k === 0) {
      const outcome = await tryVisibleDrag(page, source, target);
      assert.ok(outcome.worked, JSON.stringify({ item: item.label, binName, ...outcome }));
      drag.push({ item: item.label, binName, ...outcome });
      await rack.getByRole("button", { name: "Ambil " + item.label + " dari " + binName, exact: true }).waitFor({ timeout: 1500 });
    } else {
      await press(page, source, (k + i) % 2 === 0);
      await press(page, target, (k + i) % 2 !== 0);
    }
  }
  return { itemIds: found.map(x => x.id), itemLabels: found.map(x => x.label), bins: rackLabels, late, assets, drag };
}

async function solve(page, stage, model, i, path, prefix, seen) {
  if(model.mechanic==='pola') return solvePattern(page,stage,model,i,path);
  if(model.mode==='kelompok') return solveSort(page,stage,model,i,path,prefix,seen);
  if(model.mode==='pilih') {
    const body=await stage.innerText();
    const q=model.pilihan.find(q=>body.includes(model.locale.id[q.promptKey]));
    assert.ok(q,body);
    await tap(page,stage.getByRole('button',{name:model.items.find(x=>x.id===q.correct).label,exact:true}));
    return {question:q};
  }
  if(model.mode==='jengkal') {
    const item=stage.locator('[aria-label*="sepanjang"]');
    const target=Number((await item.getAttribute('aria-label')).match(/(\d+) jengkal/)[1]);
    for(let j=0;j<target;j++) await tap(page,stage.getByRole('button',{name:/Tambah jengkal/}));
    if(path) await page.screenshot({path,animations:'disabled'});
    await page.evaluate(()=>document.getAnimations().filter(a=>a.effect?.getComputedTiming().iterations!==Infinity).forEach(a=>a.finish()));
    const edges=await stage.getByRole('button',{name:/^Jengkal ke-/}).evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right};}));
    for(let j=1;j<edges.length;j++) assert.ok(Math.abs(edges[j].left-edges[j-1].right)<1,JSON.stringify(edges));
    const marks=await stage.evaluate(el=>['awal','akhir'].map(k=>{const r=el.querySelector('[data-jengkal-'+k+']').getBoundingClientRect();return r.left+r.width/2;}));
    assert.ok(Math.abs(marks[0]-edges[0].left)<1 && Math.abs(marks[1]-edges.at(-1).right)<1,JSON.stringify({marks,edges}));
    if(path) {
      await item.evaluate(el=>{el.parentElement.parentElement.scrollLeft=el.parentElement.parentElement.scrollWidth;});
      await page.screenshot({path:path.replace('.png','-ujung-kanan.png'),animations:'disabled'});
    }
    await tap(page,stage.getByRole('button',{name:"Angka "+target,exact:true}));
    return {target,edges};
  }
  if(model.mode==='kubus') {
    const measure=await stage.evaluate(el=>{const span=el.querySelector('[data-ukur-bentang]').getBoundingClientRect();const cubes=[...el.querySelectorAll('[data-ukur-kubus]')].map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right};});return {left:span.left,right:span.right,cubes};});
    const start=measure.cubes.findIndex(c=>Math.abs(c.left-measure.left)<1);
    const end=measure.cubes.findIndex(c=>Math.abs(c.right-measure.right)<1);
    assert.ok(start>=0&&end>=start,JSON.stringify(measure));
    await tap(page,stage.getByRole('button',{name:"Angka "+(end-start+1),exact:true}));
    return {measure,target:end-start+1};
  }
  if(model.mode==='turus') {
    const status=stage.locator('[role=status][aria-atomic=true]');
    const ready=stage.getByRole('button',{name:'Mulai hitung',exact:true});
    await ready.waitFor();
    await page.clock.fastForward(6000);
    assert.equal(await status.textContent(),'');
    const rows=stage.getByRole('group',{name:'Tabel turus'});
    assert.ok(await rows.getByRole('button',{name:/0 turus, ketuk/}).first().isDisabled());
    await tap(page,ready);
    const sequence=[], counts={};
    while(await status.textContent()!=='Semua sudah lewat. Tekan Selesai.') {
      const cue=await status.textContent();const m=/^(\d+) dari (\d+)\. (.+) lewat\.$/.exec(cue);assert.ok(m,cue);
      const n=m[3],old=counts[n]??0;
      await tap(page,rows.getByRole('button',{name:`${n}: ${old} turus, ketuk untuk menambah`,exact:true}));counts[n]=old+1;sequence.push(n);
      const layout=await geometry(page);assert.equal(layout.verticalScroll,0,JSON.stringify(layout));assert.deepEqual(layout.below,[]);
      if(path&&sequence.length===2) {
        await page.waitForFunction(()=>{const lane=document.querySelector('[role=status][aria-atomic=true]').parentElement;const art=lane.querySelector(':scope > div[aria-hidden=true]');return art && art.getBoundingClientRect().right<lane.getBoundingClientRect().right;});
        await page.screenshot({path});
      }
      // Advance only until the next visible visitor, so consecutive identical animals each receive a tap.
      while(await status.textContent()===cue) await page.clock.fastForward(100);
    }
    await tap(page,stage.getByRole('button',{name:'Selesai',exact:true}));
    return {sequence,counts,consecutive:sequence.some((x,i)=>i&&x===sequence[i-1])};
  }
  throw Error('Unknown mode '+model.mode);
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
      assert.ok(before.verticalScroll <= 4, JSON.stringify(before));
      assert.deepEqual(before.out, []);
      assert.deepEqual(before.clippedTexts, []);
      const id = prefix + "-" + String(i).padStart(2, "0");
      await page.screenshot({ path: id + "-awal.png", animations: "disabled" });
      const retainLate = model.mode === "jengkal" || i === 1 || i === 5 || i === 9 || i === limit;
      const solution = await solve(page, stage, model, i, retainLate ? id + "-satu-kartu.png" : undefined, prefix, seen);
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
