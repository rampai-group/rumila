import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");

const worktree = process.cwd();
const dest = process.env.RUMILA_QA_OUTPUT ?? "/tmp/rumila-qa-m26-30-evidence";
const origin = "http://127.0.0.1:" + (process.env.RUMILA_QA_PORT ?? "39863");
const options = new Set(process.argv.slice(2));
const devices = [[390, 844, 844, "hp"], [820, 1067, 1180, "ipad-pendek"], [820, 1180, 1180, "ipad"]];
if (options.has("--narrow")) devices.push([320, 568, 568, "hp-sempit"]);
const presets = [
[26,'urutkan','sd1-sains-bunyi-makin-jauh-makin-pelan'],[26,'urutkan','sd1-sains-bunyi-dekat-jauh-jalan'],
[27,'urutkan','sd1-mat-urut-ringan-berat'],[27,'urutkan','sd1-mat-belanja-ringan-berat'],
[28,'urutkan','sd1-mat-urut-isi-wadah'],[28,'urutkan','sd1-mat-wadah-halaman-isi'],
[29,'navigasi','sd1-kode-tebak-petak-ulangi'],[29,'navigasi','sd1-kode-tebak-petak-angkasa'],
[30,'pilah','sd1-sains-butuh-listrik-rumah'],[30,'pilah','sd1-sains-butuh-listrik-sekolah']
];
const seeds = ["3a03bd4e-8dde-4e9d-ad01-000000000000", "3a03bd4e-8dde-4e9d-ad01-000000000913", "3a03bd4e-8dde-4e9d-ad01-000000000914"];
const stageCss = "[data-panggung]";

async function tap(page, locator) {
  await locator.evaluate(el => el.scrollIntoView({block: "nearest", behavior: "instant"}));
  await page.clock.runFor(100);
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
  return { items, patterns, bins, paket, unitLen: paket.unitLen };
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
      const picture = el.querySelector("svg[data-ilustrasi], [data-ilustrasi], img");
      if (!picture) return null;
      const c = el.getBoundingClientRect(), p = picture.getBoundingClientRect();
      return { variant: picture.getAttribute("data-ilustrasi"), bounds: [p.x,p.y,p.right,p.bottom], card: [c.x,c.y,c.right,c.bottom], fits: p.left >= c.left-1 && p.right <= c.right+1 && p.top >= c.top-1 && p.bottom <= c.bottom+1 };
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

async function solveSequence(page,stage,model,i,path) {
 const p=model.paket,t=k=>p.locale.id[k];
 const cards=await stage.locator('button').evaluateAll(bs=>bs.map(b=>b.getAttribute('aria-label')).filter(x=>x&&!x.startsWith('Slot ')));
 const candidates=p.sequences.map(seq=>seq.steps.filter(x=>cards.includes(t(x.altKey??x.labelKey)))).filter(xs=>xs.length===cards.length);
 assert.ok(cards.length>=3 && candidates.length,'Unknown sequence '+JSON.stringify(cards));
 const orders=[...new Set(candidates.map(xs=>JSON.stringify(xs.map(x=>t(x.altKey??x.labelKey)))))];
 assert.equal(orders.length,1,'Ambiguous sequence');
 const labels=JSON.parse(orders[0]);
 for(const [j,label] of labels.entries()) {
  await tap(page,stage.getByRole('button',{name:label,exact:true}));
  if(j===labels.length-1&&path)await page.screenshot({path,animations:'disabled'});
  await tap(page,stage.getByRole('button',{name:'Slot '+(j+1),exact:true}));
 }
 return {itemLabels:labels,itemIds:candidates[0].map(x=>x.id),late:[]};
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
      let solution;
      if (mechanic === 'navigasi') {
      const predictions=[];
      for(let k=0;k<60;k++) {
        const cmdText=await page.getByText(/^Blok berikutnya:/).innerText();
        const state=await page.locator('.akademi-agam').evaluate(el=>{
          const tr=el.style.transform.match(/translate\(([-.\d]+)px, ([-.\d]+)px/);
          const rot=[...el.querySelectorAll('g')].find(g=>g.style.transform.startsWith('rotate(')).style.transform.match(/rotate\(([-.\d]+)deg/);
          return {x:(Number(tr[1])-50)/100,y:(Number(tr[2])-50)/100,angle:((Number(rot[1])%360)+360)%360};
        });
        const dir=[[0,-1],[1,0],[0,1],[-1,0]][Math.round(state.angle/90)%4];
        const forward=cmdText.includes(': maju.');
        const x=state.x+(forward?dir[0]:0),y=state.y+(forward?dir[1]:0);
        predictions.push({cmdText,state,target:{x,y}});
        await tap(page,page.getByRole('button',{name:`Petak ${x+1}, ${y+1}`,exact:true}));
        await tap(page,page.getByRole('button',{name:'Langkah ▶',exact:true}));
        await page.clock.runFor(900);
        const done=await page.evaluate(({slug,i})=>Object.keys(localStorage).filter(k=>k.startsWith('rumila-akademi-events-')).flatMap(k=>JSON.parse(localStorage.getItem(k))).some(e=>e.type==='attempt'&&e.activityId===slug&&e.payload.itemId===slug+'#'+(i-1)),{slug,i});
        if(done)break;
      }
      solution={predictions};
      } else {
      solution = await (mechanic === "urutkan" ? solveSequence : solveSort)(page, stage, model, i, retainLate ? id + "-satu-kartu.png" : undefined, prefix, seen);
      }
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
