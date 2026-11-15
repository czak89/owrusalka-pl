/* Page check: loads every route in a headless browser and reports console
   errors, failed requests, horizontal overflow, icons that did not resolve and
   text under 12px. Optionally saves full-page screenshots.

   Needs Playwright (npx playwright install chromium) and the built site served:
     npm run build && npx serve out -l 8732
     node scripts/check-pages.cjs http://localhost:8732/ ",pokoje/,cennik/,atrakcje/,galeria/,lato/,kontakt/,rezerwacja/" ./shots light 1280
   Args: base URL, comma-separated routes, screenshot dir ("" to skip), theme (light|dark), viewport width. */
const { chromium } = require('playwright');
(async()=>{
 const base=process.argv[2], pages=process.argv[3].split(','), out=process.argv[4], theme=process.argv[5]||'light', vw=+(process.argv[6]||1280);
 const b=await chromium.launch(); 
 for(const u of pages){
  const ctx=await b.newContext({viewport:{width:vw,height:900}}); 
  await ctx.addInitScript(t=>{try{localStorage.setItem('rusalka-theme',t)}catch(e){}},theme);
  const p=await ctx.newPage(); const errs=[];
  p.on('pageerror',e=>errs.push('PAGEERR '+String(e).slice(0,160))); p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text().slice(0,160))});
  p.on('requestfailed',r=>errs.push('REQFAIL '+r.url().slice(-60)));
  await p.goto(base+u,{waitUntil:'networkidle',timeout:60000}).catch(e=>errs.push('NAV '+e.message.slice(0,80)));
  await p.waitForTimeout(800);
  const info=await p.evaluate(()=>({th:document.documentElement.dataset.theme,len:document.body.innerText.length,h:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,emptyIcons:[...document.querySelectorAll('span[aria-hidden]')].filter(s=>s.style.width&&!s.querySelector('svg')).length,small:[...document.querySelectorAll('body *')].filter(e=>e.childNodes.length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(e).fontSize)<12).length,fonts:[...new Set([...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family))].join('/')}));
  console.log(u||'/',JSON.stringify(info),errs.slice(0,3).join(' | '));
  if(out) await p.screenshot({path:out+'/'+theme+'-'+vw+'-'+(u.replace(/\//g,'')||'index')+'.png',fullPage:true});
  await ctx.close();
 }
 await b.close();
})();
