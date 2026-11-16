/* Endpoint check: runs public/api/wyslij.php on PHP's built-in server with a
   fake sendmail that writes each mail to a file, then posts to it.
     node scripts/check-endpoint.cjs
   Needs php on the PATH. Nothing is mailed. Expect "ok": true on every line
   and exit code 0. */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PORT = 8734;
const URL_ = `http://127.0.0.1:${PORT}/api/wyslij.php`;
const ALLOWED = 'https://owrusalka.pl';
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'rusalka-endpoint-'));
const sendmail = path.join(work, 'sendmail.sh');
fs.writeFileSync(sendmail, `#!/bin/sh\ncat > "${work}/mail-$(date +%s%N)-$$.eml"\n`, { mode: 0o755 });

const mails = () => fs.readdirSync(work).filter((f) => f.endsWith('.eml')).sort();
const post = (body, headers = {}) => fetch(URL_, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: ALLOWED, ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});
const valid = (extra = {}) => ({
  subject: 'Zapytanie o rezerwację: Żaneta Źdźbło-Kowalska, 18 lipca 2026 – 25 lipca 2026',
  from_name: 'Strona owrusalka.pl',
  name: 'Żaneta Źdźbło-Kowalska',
  email: 'zaneta@example.com',
  phone: '600 100 200',
  message: 'Imię i nazwisko: Żaneta Źdźbło-Kowalska\nPrzyjazd: Sobota, 18 lipca 2026\nUwagi: łóżeczko, dwie poduszki',
  botcheck: '',
  ...extra,
});

function parseMail(file) {
  const raw = fs.readFileSync(path.join(work, file), 'utf8').replace(/\r\n/g, '\n');
  const split = raw.indexOf('\n\n');
  const head = raw.slice(0, split).replace(/\n[ \t]+/g, ' ');
  const header = (name) => (head.match(new RegExp(`^${name}: (.*)$`, 'mi')) || [])[1] || '';
  const words = [...header('Subject').matchAll(/=\?UTF-8\?B\?([^?]+)\?=/g)].map((m) => Buffer.from(m[1], 'base64'));
  return {
    head,
    to: header('To'),
    from: header('From'),
    replyTo: header('Reply-To'),
    subject: words.length ? Buffer.concat(words).toString('utf8') : header('Subject'),
    body: Buffer.from(raw.slice(split + 2).replace(/\s+/g, ''), 'base64').toString('utf8'),
  };
}

(async () => {
  const php = spawn('php', ['-d', `sendmail_path=${sendmail}`, '-S', `127.0.0.1:${PORT}`, '-t', path.join(__dirname, '..', 'public')],
    { env: { ...process.env, TMPDIR: work }, stdio: 'ignore' });
  let failed = false;
  const report = (name, ok, detail = {}) => { if (!ok) failed = true; console.log(JSON.stringify({ test: name, ok, ...detail })); };
  try {
    for (let i = 0; i < 50; i++) {
      try { await fetch(URL_); break; } catch (e) { await new Promise((r) => setTimeout(r, 100)); }
    }

    let res = await fetch(URL_);
    report('GET is refused with a JSON answer', res.status === 405 && (await res.json()).success === false, { status: res.status });

    res = await fetch(URL_, { method: 'OPTIONS', headers: { Origin: ALLOWED, 'Access-Control-Request-Method': 'POST' } });
    report('preflight from an allowed site', res.status === 204 && res.headers.get('access-control-allow-origin') === ALLOWED, { status: res.status });

    res = await fetch(URL_, { method: 'OPTIONS', headers: { Origin: 'https://evil.example', 'Access-Control-Request-Method': 'POST' } });
    report('preflight from another site', res.status === 403 && !res.headers.get('access-control-allow-origin'), { status: res.status });

    res = await post(valid(), { Origin: 'https://evil.example' });
    report('POST from another site', res.status === 403 && mails().length === 0, { status: res.status });

    res = await fetch(URL_, { method: 'POST', body: JSON.stringify(valid()) });
    report('POST without Origin', res.status === 403 && mails().length === 0, { status: res.status });

    res = await post(valid(), { Origin: `http://127.0.0.1:${PORT}`, 'Content-Type': 'text/plain' });
    report('wrong content type', res.status === 415, { status: res.status });

    res = await post('{not json');
    report('broken JSON', res.status === 400, { status: res.status });

    res = await post(valid({ email: 'not-an-address' }));
    report('invalid e-mail', res.status === 400 && mails().length === 0, { status: res.status });

    res = await post(valid({ message: 'x'.repeat(25000) }));
    report('oversized message', res.status === 413 && mails().length === 0, { status: res.status });

    res = await post(valid({ botcheck: 'on' }));
    report('honeypot: answers success, sends nothing', res.status === 200 && (await res.json()).success === true && mails().length === 0, { status: res.status });

    res = await post(valid(), { Origin: `http://127.0.0.1:${PORT}` });
    const first = mails().length === 1 ? parseMail(mails()[0]) : null;
    report('valid message from the same host is mailed', res.status === 200 && (await res.json()).success === true && !!first
      && first.to === 'recepcja@owrusalka.pl' && /recepcja@owrusalka\.pl/.test(first.from) && first.replyTo === 'zaneta@example.com'
      && first.subject === valid().subject && first.body.includes('Uwagi: łóżeczko, dwie poduszki') && first.body.includes('zaneta@example.com, tel. 600 100 200'),
    { status: res.status, mails: mails().length, subject: first && first.subject });

    res = await post(valid({ name: 'Anna\r\nBcc: spy@example.com', subject: 'Hello\r\nBcc: spy@example.com' }));
    const second = mails().length === 2 ? parseMail(mails()[1]) : null;
    report('header injection is flattened', res.status === 200 && !!second && !/^Bcc:/mi.test(second.head) && second.subject === 'Hello Bcc: spy@example.com',
      { status: res.status, subject: second && second.subject });

    const statuses = [];
    for (let i = 0; i < 4; i++) statuses.push((await post(valid())).status);
    report('rate limit: 5 accepted, then 429', statuses.join(',') === '200,200,200,429' && mails().length === 5, { statuses: statuses.join(','), mails: mails().length });
  } catch (e) {
    report('script error', false, { error: String(e).slice(0, 200) });
  } finally {
    php.kill();
    fs.rmSync(work, { recursive: true, force: true });
  }
  process.exit(failed ? 1 : 0);
})();
