/* Form check: walks the booking modal and the /rezerwacja wizard to the end.
     node scripts/check-forms.cjs http://localhost:8732/ demo
     node scripts/check-forms.cjs http://localhost:8733/ live
   demo  a build without NEXT_PUBLIC_FORM_ENDPOINT: nothing may be posted and
         the confirmation must carry the demo note.
   live  a build with NEXT_PUBLIC_FORM_ENDPOINT set to any https URL; the
         request is intercepted here, so nothing reaches a real service. The
         first attempt is answered with an error (alert + retry expected), the
         second with success.
   Expect "ok": true on both lines and errs empty. Needs Playwright. */
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:8732/';
const MODE = process.argv[3] === 'live' ? 'live' : 'demo';

async function watch(page) {
  const posts = [];
  let fail = MODE === 'live';
  await page.route((url) => !url.href.startsWith(BASE), async (route) => {
    const req = route.request();
    if (req.method() !== 'POST') return route.continue();
    posts.push(JSON.parse(req.postData() || '{}'));
    await new Promise((resolve) => setTimeout(resolve, 400)); // keep the busy state observable
    if (fail) { fail = false; return route.fulfill({ status: 500, contentType: 'application/json', body: '{"success":false}' }); }
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  return posts;
}

/* Clicks send, checks the busy state, the error round (live) and the result. */
async function send(page, button, consent, doneSel, r) {
  r.blockedWithoutConsent = await page.locator(button).isDisabled();
  await page.locator(consent).check();
  await page.waitForTimeout(3100); // the spam guard ignores forms sent within 3 s
  await page.locator(button).click();
  r.busyLabel = await page.locator(button).innerText().catch(() => '');
  if (MODE === 'live') {
    await page.waitForSelector('.send-error', { timeout: 5000 });
    r.alert = await page.locator('.send-error').getAttribute('role');
    r.retryLabel = await page.locator(button).innerText();
    await page.locator(button).click();
  }
  await page.waitForSelector(doneSel, { timeout: 5000 });
  r.demoNote = await page.locator('.send-demo').count();
}

function verdict(r, posts) {
  const sent = MODE === 'live'
    ? posts.length === 2 && r.alert === 'alert' && /ponownie/i.test(r.retryLabel) && r.demoNote === 0
      && posts[1].email === 'anna@example.com' && /Przyjazd: /.test(posts[1].message) && posts[1].botcheck === ''
    : posts.length === 0 && r.demoNote === 1;
  return r.blockedWithoutConsent && /Wysyłam/.test(r.busyLabel) && sent;
}

(async () => {
  const browser = await chromium.launch();
  const errs = [];

  /* 1. booking modal on the home page */
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', (e) => errs.push(String(e).slice(0, 150)));
    page.on('console', (m) => { if (m.type() === 'error' && !/500/.test(m.text())) errs.push(m.text().slice(0, 150)); });
    const posts = await watch(page);
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.click('.nav .btn-cta');
    await page.click('.modal .actions .btn-cta');
    await page.fill('.modal input[type="text"]', 'Anna Kowalska');
    await page.fill('.modal input[type="email"]', 'anna@example.com');
    await page.fill('.modal input[type="tel"]', '600 100 200');
    await page.click('.modal .actions .btn-cta');
    const r = {};
    await send(page, '.modal .actions .btn-cta', '#modal-consent', '.modal .confirm-msg', r);
    console.log(JSON.stringify({ form: 'modal', mode: MODE, ok: verdict(r, posts), ...r, posts: posts.length }));
    await page.close();
  }

  /* 2. wizard on /rezerwacja/ */
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', (e) => errs.push(String(e).slice(0, 150)));
    page.on('console', (m) => { if (m.type() === 'error' && !/500/.test(m.text())) errs.push(m.text().slice(0, 150)); });
    const posts = await watch(page);
    await page.goto(BASE + 'rezerwacja/', { waitUntil: 'networkidle' });
    await page.waitForSelector('button.day');
    const next = '.bk-nav .rbtn-cta';
    for (let i = 0; i < 80 && await page.locator(next).isDisabled(); i++) {
      const day = page.locator('button.day:not(.is-disabled):not(.is-arrival)').nth(i === 0 ? 0 : i - 1);
      await day.click({ timeout: 500 }).catch(() => {});
    }
    await page.click(next);
    const inputs = page.locator('.step-body .inp');
    await inputs.nth(0).fill('Anna Kowalska');
    await inputs.nth(1).fill('600 100 200');
    await inputs.nth(2).fill('anna@example.com');
    await page.click(next); await page.click(next); await page.click(next);
    const r = {};
    await send(page, next, '#rez-consent', '.confirm-title', r);
    console.log(JSON.stringify({ form: 'wizard', mode: MODE, ok: verdict(r, posts), ...r, posts: posts.length }));
    if (MODE === 'live') console.log('payload', JSON.stringify(posts[1]));
    await page.close();
  }

  /* 3. contact form on /kontakt/ */
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', (e) => errs.push(String(e).slice(0, 150)));
    page.on('console', (m) => { if (m.type() === 'error' && !/500/.test(m.text())) errs.push(m.text().slice(0, 150)); });
    const posts = await watch(page);
    await page.goto(BASE + 'kontakt/', { waitUntil: 'networkidle' });
    const r = {};
    const submit = '#napisz button[type="submit"]';
    await page.click(submit); // empty form: nothing may be sent, errors must show
    r.errorsShown = await page.locator('#napisz .cf-error').count();
    await page.fill('#cf-name', 'Anna Kowalska');
    await page.fill('#cf-email', 'anna@example.com');
    await page.fill('#cf-message', 'Czy przyjmujecie zwierzęta w pokojach parterowych?');
    await page.click(submit); // valid but no consent
    r.consentRequired = (await page.locator('#napisz .cf-error').allInnerTexts()).some((t) => /zgoda/i.test(t));
    await page.locator('#cf-consent').check();
    await page.waitForTimeout(3100);
    await page.click(submit);
    r.busyLabel = await page.locator(submit).innerText().catch(() => '');
    if (MODE === 'live') {
      await page.waitForSelector('#napisz .send-error', { timeout: 5000 });
      r.retryLabel = await page.locator(submit).innerText();
      await page.click(submit);
    }
    await page.waitForSelector('#napisz .cf-done', { timeout: 5000 });
    r.demoNote = await page.locator('#napisz .send-demo').count();
    const sent = MODE === 'live'
      ? posts.length === 2 && /ponownie/i.test(r.retryLabel) && r.demoNote === 0 && /Wiadomość: Czy przyjmujecie/.test(posts[1].message)
      : posts.length === 0 && r.demoNote === 1;
    r.ok = r.errorsShown >= 3 && r.consentRequired && /Wysyłam/.test(r.busyLabel) && sent;
    console.log(JSON.stringify({ form: 'contact', mode: MODE, ...r, posts: posts.length }));
    await page.close();
  }

  console.log(JSON.stringify({ errs }));
  await browser.close();
})();
