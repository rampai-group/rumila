// Run against a local dev server. PLAYWRIGHT_MODULE and RUMILA_QA_OUTPUT/PORT are configurable.
import assert from "node:assert/strict";
import {readFile,writeFile,mkdir} from "node:fs/promises";
const {webkit}=await import(process.env.PLAYWRIGHT_MODULE??"playwright");
const out=process.env.RUMILA_QA_OUTPUT??"/tmp/rumila-qa-pilot-gap";
const path=process.cwd()+"/content/paket/";
const wanted=process.env.RUMILA_ONLY?.split(",");
const sets=[
 {"mission": 9, "id": "sd1-mat-genap-sepuluh-koin", "m": "dagang", "mode": "lengkapi"},
 {"mission": 9, "id": "sd1-mat-rak-kurang-berapa-sepuluh", "m": "pilah", "mode": "kelompok"},
 {"mission": 10, "id": "sd1-mat-gabung-harta-pantai", "m": "dagang", "mode": "gabung"},
 {"mission": 10, "id": "sd1-mat-gabung-keranjang-20", "m": "dagang", "mode": "gabung"},
 {"mission": 11, "id": "sd1-mat-panen-sisa-kebun", "m": "dagang", "mode": "sisa"},
 {"mission": 11, "id": "sd1-mat-sisa-kelereng-20", "m": "dagang", "mode": "sisa"},
 {"mission": 12, "id": "sd1-mat-dobel-etalase-kue", "m": "pilah", "mode": "pilih"},
 {"mission": 12, "id": "sd1-mat-rak-dobel", "m": "pilah", "mode": "kelompok"},
 {"mission": 18, "id": "sd1-mat-bagi-dua-piknik", "m": "simulasi", "mode": "bagi"},
 {"mission": 18, "id": "sd1-mat-rak-setengah-piring", "m": "pilah", "mode": "kelompok"},
 {"mission": 19, "id": "sd1-kode-ulangi-belok-kota", "m": "navigasi", "mode": "program"},
 {"mission": 19, "id": "sd1-kode-ulangi-dua-bagian", "m": "navigasi", "mode": "program"}
].filter(s=>!wanted||wanted.includes(s.id));
const defaultSeed=Number(process.env.RUMILA_SEED??60);
const evidence=out+"/"+(process.env.RUMILA_RUN??defaultSeed);
await mkdir(evidence,{recursive:true});
const origin="http://127.0.0.1:"+(process.env.RUMILA_QA_PORT??3896);
const b=await webkit.launch();
try{
 const results=[];
 const work=sets.flatMap(s=>[["HP",390,844],["iPad-pendek",820,1067],["iPad",820,1180]].filter(d=>!process.env.RUMILA_DEVICE||d[0]===process.env.RUMILA_DEVICE).map(d=>[d,s]));
 const concurrency=Number(process.env.RUMILA_QA_CONCURRENCY??4);
 for(let i=0;i<work.length;i+=concurrency){
   results.push(...await Promise.allSettled(work.slice(i,i+concurrency).map(([d,s])=>play(d,s))));
   for(const r of results.slice(i)){if(r.status==="fulfilled")console.log(r.value.device,r.value.id,r.value.score);else console.error(r.reason);}
   await writeFile(evidence+"/runs.json",JSON.stringify(results.map(r=>r.status==="fulfilled"?r.value:{error:r.reason.stack}),null,2));
 }
 for(const r of results){if(r.status!=="fulfilled")console.error(r.reason);}
 await writeFile(evidence+"/runs.json",JSON.stringify(results.map(r=>r.status==="fulfilled"?r.value:{error:r.reason.stack}),null,2));
 process.exitCode=+results.some(r=>r.status==="rejected");
}finally{await b.close();}

async function play([device,w,h],stub){
 const seed=(process.env.RUMILA_SEEDS ? JSON.parse(process.env.RUMILA_SEEDS)[stub.id] : undefined)??defaultSeed;
 const pack=JSON.parse(await readFile(path+stub.m+"/"+stub.id+".json"));
 const t=k=>pack.locale.id[k];
 const total=pack.rounds;
 const c=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:true,reducedMotion:"reduce",timezoneId:"Asia/Jakarta"});
 await c.route("**/*",r=>[origin,"https://fonts.googleapis.com","https://fonts.gstatic.com"].includes(new URL(r.request().url()).origin)?r.continue():r.abort());
 await c.addInitScript(seed=>{sessionStorage.setItem("rinoya-intro","1");crypto.randomUUID=()=>"00000000-0000-4000-8000-"+String(seed).padStart(12,"0");},seed);
 const p=await c.newPage();
 const stage=p.locator("[data-panggung]");
 const box=stage.locator("[data-wadah-kelompok]");
 const shot=tag=>p.screenshot({path:`${evidence}/${device}-${pack.id}-${tag}.png`,animations:"disabled"});
 const seen=new Set(), measures=[], errors=[];
 const name=s=>({name:s,exact:typeof s==="string"});
 const button=(s,el=p)=>el.getByRole("button",name(s));
 const src=()=>stage.locator('button[aria-pressed][aria-label]').evaluateAll(es=>es.map(e=>e.getAttribute("aria-label")).filter(s=>!/^(Ambil|Remove) /.test(s)));
 const deal=async()=>await button(/^Dengar pesanan:/,stage).first().getAttribute("aria-label");
 const tap=async locator=>{
  try {
   
   await locator.waitFor({state:"visible",timeout:12000});
   const handle=await locator.elementHandle();
   await p.waitForFunction(el=>!el.disabled&&getComputedStyle(el).pointerEvents!=="none",handle,{timeout:10000});
   const pt=await locator.evaluate(el=>{
    el.scrollIntoView({block:"nearest",inline:"nearest"});
    const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
    return {x:(x-visualViewport.offsetLeft)*visualViewport.scale,y:(y-visualViewport.offsetTop)*visualViewport.scale,hit:el.contains(document.elementFromPoint(x,y)),xCss:x,yCss:y};
   });
   assert.ok(pt.hit,JSON.stringify(pt));
   await p.touchscreen.tap(pt.x,pt.y);
   await p.waitForTimeout(80);
  } catch(e){throw Error(`${device} ${pack.id} ${await locator.getAttribute("aria-label").catch(()=>null)}: ${e.message}`);}
 };
 const metrics=async label=>{const m={label,...await geometry(p)};
  if(m.out.length||m.below.length||m.outsideViewport.length||m.artOut.length||m.clippedTexts.length||m.horizontalScroll>2) await shot("batas-"+label);
  return m;
 };
 const math=word=>{
  const d=word.match(/^dobel (\d+)(?: ([+−]) (\d+))?$/i);
  if(d)return 2*Number(d[1])+(d[2]==="−"?-1:1)*Number(d[3]??0);
  const ns=word.match(/\d+/g).map(Number);
  return ns.reduce((a,b)=>a+b,0);
 };
 p.on("pageerror",e=>errors.push(e.message));
 const hint=false;
 try {
  await p.goto(origin+"/dev/akademi?paket="+pack.id,{timeout:90000,waitUntil:"domcontentloaded"});
  for(let i=1;i<=total;i++){
   await p.getByRole("progressbar",{name:`Ronde ${i} dari ${total}`,exact:true}).waitFor({timeout:40000});
   await p.waitForTimeout(150);
   measures.push(await metrics(`awal-${i}`));
   await shot(`ronde-${i}`);
   if(i===1)await shot("awal");
   if(stub.mode==="lengkapi"){
    const have=await button(/^Koin pembeli(?: \(tersembunyi\))?$/,stage).count();
    assert.ok(have>=1&&have<=9);
    const add=button("Ambil satu koin",stage);
    assert.equal(await add.innerText(),"1 koin");
    for(let j=0;j<10-have;j++)await tap(add);
    if(i===1||have===1)await shot(have===1?"sembilan-koin":"jawab");
    measures.push(await metrics("lengkapi-"+have));
    seen.add(have);
    await tap(button("Cukup!"));
   } else if(stub.mode==="gabung"){
    const match=(await deal()).match(/^Dengar pesanan: (\d+) (.*?) dan (\d+) (.*?) digabung/);
    assert.ok(match);
    const a=Number(match[1]),b=Number(match[3]);
    assert.equal(match[2],match[4]);
    const choose=button("Angka "+(a+b),stage);
    const joined=stage.getByLabel(`${a+b} ${match[2]}`,{exact:true});
    await joined.waitFor();
    assert.equal(await joined.locator(":scope > span").count(),a+b);
    if(a===b)await shot("sama-"+a);
    if(a+b>=18)await shot("hasil-besar");
    measures.push(await metrics("gabung-"+a+"+"+b));
    seen.add(`${a},${b}|${match[2]}`);
    await tap(choose);
   } else if(stub.mode==="sisa"){
    const cue=await deal();
    const match=cue.match(/^Dengar pesanan: Ada (\d+) (.*?)\. (\d+) (.*?) (?:dipetik|diambil)\./);
    assert.ok(match,cue);
    const [awal,diambil]=[Number(match[1]),Number(match[3])],hasil=awal-diambil;
    assert.equal(match[2],match[4]);
    const add=button(/^Ambil satu /,stage);
    const covered=stage.getByLabel(pack.world==="kebun"?"Bedeng ditutup daun":"Kotak ditutup",{exact:true});
    await covered.waitFor();
    const balon=await button(/^Dengar pesanan:/,stage).first().innerText();
    assert.ok(!/✋|🧺/.test(balon),balon);
    assert.ok(await covered.evaluate(el=>{const cover=el.lastElementChild;return !cover.style.background.includes("rgba(")&&cover.style.opacity==="1"}));
    if(awal>=14||i===1)await shot("tertutup-"+awal);
    for(let j=0;j<hasil;j++)await tap(add);
    if(hasil>=10||i===1)await shot("tersisa-"+hasil);
    if(i===1||hasil>=14){
       const undo=button(/^Kurangi satu /,stage);
       assert.equal(await undo.locator(":scope > span[aria-hidden] > span").count(),hasil);
       await tap(undo);
       await tap(add);
       assert.equal(await undo.locator(":scope > span[aria-hidden] > span").count(),hasil);
    }
    measures.push(await metrics(`sisa-${awal}-${diambil}`));
    seen.add(`${awal},${diambil}|${match[2]}`);
    await tap(button(/Selesai$/));
   } else if(stub.mode==="pilih"){
    const soal=await button("Dengarkan soal",stage).innerText();
    const q=pack.pilihan.find(x=>t(x.promptKey)===soal);assert.ok(q,soal);
    const [a,b]=soal.match(/\d+/g).slice(0,2).map(Number);
    const images=await stage.getByRole("img",{name:/potong kue/}).evaluateAll(es=>es.map(e=>[[...e.querySelectorAll("span span")].length,Number(e.getAttribute("aria-label").match(/^\d+/)[0])]));
    assert.deepEqual(images,[[a,a],[b,b]]);
    const choices=q.choices.map(id=>t(pack.items.find(x=>x.id===id).labelKey));
    const matches=choices.filter(ch=>math(ch)===a+b);
    assert.equal(matches.length,1);
    assert.equal(matches[0],t(pack.items.find(x=>x.id===q.correct).labelKey));
    measures.push(await metrics(q.id));
    seen.add(q.id);
    await shot(q.id);
    await tap(button(matches[0],stage));
   } else if(stub.mode==="program"){
    const r=await stage.evaluate(el=>{ const visit=f=>{if(!f)return null;if(f.memoizedProps?.ronde&&f.memoizedProps?.paket)return f.memoizedProps.ronde;return visit(f.child)??visit(f.sibling);};return visit(el[Object.keys(el).find(k=>k.startsWith('__reactFiber'))]); });
    const g=r.grids[0]; let solution;
    for(let a=2;a<=6;a++)for(let b=2;b<=6;b++)for(const turn of ['kiri','kanan']){
      let {x,y,dir}=g.start,d=['N','E','S','W'].indexOf(dir),ok=true;
      const commands=[...Array(a).fill('maju'),turn,...Array(b).fill('maju')];
      for(const [j,cmd] of commands.entries()){
        if(cmd==='maju'){x+=[0,1,0,-1][d];y+=[-1,0,1,0][d];}else d=(d+(cmd==='kanan'?1:3))%4;
        if(x<0||y<0||x>=g.w||y>=g.h||g.walls.some(w=>w.x===x&&w.y===y)||(x===g.goal.x&&y===g.goal.y&&j<commands.length-1))ok=false;
      }
      if(ok&&x===g.goal.x&&y===g.goal.y)solution={a,b,turn};
    }
    assert.ok(solution,JSON.stringify(g));
    for(const [part,n] of [solution.a,solution.b].entries()){
      if(part)await tap(button(solution.turn,stage));
      await tap(button('ulangi',stage));
      await tap(button('maju',stage));
      for(let k=2;k<n;k++)await tap(button(new RegExp('^Ulangi '+k+' kali, ketuk untuk mengubah$'),stage).last());
      measures.push(await metrics(`program-${i}-${part}-terbuka`));
      await tap(button('Selesai isi Ulangi',stage));
    }
    measures.push(await metrics(`program-${i}-penuh`));
    if(i===1||g.w>=6||g.h>=6)await shot('program-'+i);
    seen.add(JSON.stringify({grid:g.id,...solution}));
    await tap(button('Jalan ▶'));
   } else if(stub.mode==="bagi"){
    const source=button(/^Ambil .* dari keranjang$/,stage);
    const count=await source.count(); assert.ok(count>0&&count%2===0);
    for(const side of ["kiri","kanan"]){
      await tap(button(new RegExp("^Pilih tikar "+side),stage));
      for(let j=0;j<count/2;j++) { await tap(source.first()); measures.push(await metrics(`bagi-${i}-${side}-${j}`)); }
    }
    if(i===1||count>=10)await shot("bagi-"+i);
    seen.add(count); await tap(button(/Sudah adil/));
   } else {
    const items=await src();
    const done=new Set();
    for(const item of items){
     assert.ok(!done.has(item),item);
     const amount=math(item);
     const group=pack.id.includes("kurang")?`kurang ${10-amount}`:String(pack.id.includes("setengah")?amount/2:amount);
     const data=pack.items.find(x=>t(x.altKey??x.labelKey)===item);
     assert.equal(t(pack.bins.find(b=>b.id===data.bin).labelKey),group);
     if(done.size===items.length-1 && (i===1||i===total))await shot("satu-"+i);
     measures.push(await metrics(`rak-${i}-${done.size}`));
     await tap(button(item,stage));
     await tap(button(group,box));
     done.add(item);
     seen.add(data.id);
    }
    measures.push(await metrics("rak-"+i));
   }
  }
  const score=await p.getByText(new RegExp(`^${total} dari ${total} benar`)).textContent({timeout:30000});
  assert.deepEqual(errors,[]);
  await shot("hasil");
  for(const m of measures){
   for(const k of ['out','below','outsideViewport','artOut','clippedTexts'])assert.deepEqual(m[k],[],`${device} ${pack.id} ${m.label}: ${k}`);
   assert.ok(m.horizontalScroll<=2,`${device} ${pack.id} ${m.label}: horizontal overflow`);
  }
  return {device,id:pack.id,rounds:total,seed,score,covered:[...seen],hint,measures};
 } catch(e){await shot("error").catch(()=>{}); throw Error(`${device} ${pack.id}: ${e.stack} / ${errors.join(" | ")} / ${(await p.locator("body").innerText({timeout:1000}).catch(()=>"")).slice(0,300)}`);}
 finally{await c.close();}
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
      .filter(e => e.clientWidth > 0 && e.clientHeight > 0 && e.getAttribute("aria-hidden") !== "true" && !e.closest(".sr-only"))
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

