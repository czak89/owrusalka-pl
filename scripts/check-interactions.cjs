/* Interaction check: theme toggle and its persistence, booking modal,
   navigation, keyboard focus ring, date selection in the booking wizard.
     node scripts/check-interactions.cjs http://localhost:8732/
   Expect: t1 = dark, t2 = dark (kept after reload), modal "modal-bg open",
   focus outline solid 2px, rez.sel >= 1, errs empty. */
const { chromium } = require('playwright');
const BASE=process.argv[2]||'http://localhost:8732/';
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:900}}); const errs=[];
 p.on('pageerror',e=>errs.push(String(e).slice(0,150))); p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,150))});
 await p.goto(BASE,{waitUntil:'networkidle'});
 const t0=await p.evaluate(()=>document.documentElement.dataset.theme);
 await p.click('.mode-toggle'); await p.waitForTimeout(300);
 const t1=await p.evaluate(()=>[document.documentElement.dataset.theme,localStorage.getItem('rusalka-theme'),getComputedStyle(document.body).backgroundColor]);
 await p.reload({waitUntil:'networkidle'}); const t2=await p.evaluate(()=>document.documentElement.dataset.theme);
 await p.click('.mode-toggle'); await p.waitForTimeout(200);
 await p.click('.nav .btn-cta'); await p.waitForTimeout(400);
 const modal=await p.evaluate(()=>{const m=document.querySelector('.modal-bg'); return m?m.className:null});
 await p.keyboard.press('Escape'); await p.evaluate(()=>{const c=document.querySelector('.modal .close'); if(c) c.click()}); await p.waitForTimeout(300);
 await p.click('.nav-links a[href$="/pokoje/"]'); await p.waitForLoadState('networkidle');
 const u=p.url(); const h1=await p.evaluate(()=>document.querySelector('h1').innerText);
 await p.keyboard.press('Tab'); await p.keyboard.press('Tab');
 const focus=await p.evaluate(()=>{const e=document.activeElement; const cs=getComputedStyle(e); return [e.tagName,cs.outlineStyle,cs.outlineWidth,cs.outlineColor]});
 await p.goto(BASE+'rezerwacja/',{waitUntil:'networkidle'}); await p.waitForTimeout(600);
 const days=await p.$$('.day:not(.is-disabled):not(.is-out)'); let clicked=0; for(const d of days.slice(0,40)){ try{ await d.click({timeout:300}); clicked++; if(clicked>=6) break;}catch(e){} }
 const rez=await p.evaluate(()=>({sel:document.querySelectorAll('.day.is-arrival,.day.is-departure').length,err:(document.querySelector('.cal-error')||{}).innerText}));
 console.log(JSON.stringify({t0,t1,t2,modal,u,h1,focus,rez,errs}));
 await b.close(); })();
