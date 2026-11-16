/* Endpoint check: runs public/api/wyslij.php on PHP's built-in server and
   posts to it. Nothing leaves the machine:
     - mail() goes to a fake sendmail that writes each mail to a file,
     - SMTP goes to two fake servers started here (implicit TLS and STARTTLS,
       self-signed certificate).
     node scripts/check-endpoint.cjs
   Needs php (with openssl) and the openssl command on the PATH. Expect
   "ok": true on every line and exit code 0. */
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const net = require('net');
const os = require('os');
const path = require('path');
const tls = require('tls');

const PORT = 8734;
const SMTPS_PORT = 8736;     // implicit TLS, offers AUTH LOGIN and PLAIN
const STARTTLS_PORT = 8737;  // STARTTLS, offers AUTH PLAIN only
const URL_ = `http://127.0.0.1:${PORT}/api/wyslij.php`;
const ALLOWED = 'https://owrusalka.pl';
const MAILBOX = { username: 'formularz@owrusalka.pl', password: 'correct horse battery' };

/* Layout mirrors the server: work/site is the web root, the config file is
   looked for in work/ (above the root) and in work/site/api/. */
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'rusalka-endpoint-'));
const apiDir = path.join(work, 'site', 'api');
const tmpDir = path.join(work, 'tmp');
fs.mkdirSync(apiDir, { recursive: true });
fs.mkdirSync(tmpDir);
fs.copyFileSync(path.join(__dirname, '..', 'public', 'api', 'wyslij.php'), path.join(apiDir, 'wyslij.php'));
const sendmail = path.join(work, 'sendmail.sh');
fs.writeFileSync(sendmail, `#!/bin/sh\ncat > "${work}/mail-$(date +%s%N)-$$.eml"\n`, { mode: 0o755 });

const CONFIG_ABOVE = path.join(work, 'wyslij-config.php');
const CONFIG_BESIDE = path.join(apiDir, 'wyslij-config.php');
function setConfig(file, config) {
  for (const f of [CONFIG_ABOVE, CONFIG_BESIDE]) fs.rmSync(f, { force: true });
  if (file) fs.writeFileSync(file, `<?php return json_decode(<<<'JSON'\n${JSON.stringify(config)}\nJSON, true);\n`);
}
const resetRateLimit = () => { for (const f of fs.readdirSync(tmpDir)) fs.rmSync(path.join(tmpDir, f), { force: true }); };

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

function parseMail(text) {
  const raw = text.replace(/\r\n/g, '\n');
  const split = raw.indexOf('\n\n');
  const head = raw.slice(0, split).replace(/\n[ \t]+/g, ' ');
  const header = (name) => (head.match(new RegExp(`^${name}: (.*)$`, 'mi')) || [])[1] || '';
  const words = [...header('Subject').matchAll(/=\?UTF-8\?B\?([^?]+)\?=/g)].map((m) => Buffer.from(m[1], 'base64'));
  return {
    head,
    to: header('To'),
    from: header('From'),
    replyTo: header('Reply-To'),
    date: header('Date'),
    messageId: header('Message-ID'),
    subject: words.length ? Buffer.concat(words).toString('utf8') : header('Subject'),
    body: Buffer.from(raw.slice(split + 2).replace(/\s+/g, ''), 'base64').toString('utf8'),
  };
}
const readMail = (file) => parseMail(fs.readFileSync(path.join(work, file), 'utf8'));

/* --- fake SMTP servers ------------------------------------------------------ */
const deliveries = [];   // one entry per message a fake server accepted

function smtpSession(socket, options, greet = true) {
  const state = { user: null, from: null, to: [], encrypted: socket.encrypted === true };
  let buffer = '';
  let mode = 'command';   // command | login-user | login-pass | data
  let loginUser = '';
  const send = (line) => socket.write(line + '\r\n');
  const authenticate = (user, pass) => {
    if (user === MAILBOX.username && pass === MAILBOX.password) { state.user = user; send('235 Authentication succeeded'); }
    else send('535 Incorrect authentication data');
  };
  const onData = (chunk) => {
    buffer += chunk.toString('latin1');
    for (;;) {
      if (mode === 'data') {
        const end = buffer.indexOf('\r\n.\r\n');
        if (end < 0) return;
        const raw = buffer.slice(0, end).replace(/^\.\./gm, '.');
        buffer = buffer.slice(end + 5);
        mode = 'command';
        deliveries.push({ ...state, to: [...state.to], raw: Buffer.from(raw, 'latin1').toString('utf8') });
        send('250 OK queued');
        continue;
      }
      const eol = buffer.indexOf('\r\n');
      if (eol < 0) return;
      const line = buffer.slice(0, eol);
      buffer = buffer.slice(eol + 2);
      if (mode === 'login-user') { loginUser = Buffer.from(line, 'base64').toString('utf8'); mode = 'login-pass'; send('334 UGFzc3dvcmQ6'); continue; }
      if (mode === 'login-pass') { mode = 'command'; authenticate(loginUser, Buffer.from(line, 'base64').toString('utf8')); continue; }
      const verb = line.split(' ')[0].toUpperCase();
      if (verb === 'EHLO') {
        const offer = [];
        if (options.starttls && !state.encrypted) offer.push('STARTTLS');
        else offer.push('AUTH ' + options.auth);
        send(['fake.smtp', ...offer, 'SIZE 1000000'].map((f, i, all) => `250${i === all.length - 1 ? ' ' : '-'}${f}`).join('\r\n'));
      } else if (verb === 'STARTTLS' && options.starttls && !state.encrypted) {
        send('220 Go ahead');
        socket.removeListener('data', onData);
        const secure = new tls.TLSSocket(socket, { isServer: true, secureContext: options.secureContext });
        secure.on('error', () => {});
        smtpSession(secure, options, false);
        return;
      } else if (verb === 'AUTH' && !state.encrypted) {
        send('538 Encryption required for requested authentication mechanism');
      } else if (/^AUTH LOGIN$/i.test(line) && /LOGIN/.test(options.auth)) {
        mode = 'login-user'; send('334 VXNlcm5hbWU6');
      } else if (/^AUTH PLAIN /i.test(line) && /PLAIN/.test(options.auth)) {
        const [, user, pass] = Buffer.from(line.slice(11), 'base64').toString('utf8').split('\0');
        authenticate(user, pass);
      } else if (verb === 'AUTH') {
        send('504 Unrecognized authentication type');
      } else if (/^MAIL FROM:/i.test(line)) {
        if (!state.user) { send('530 Authentication required'); continue; }
        state.from = (line.match(/<([^>]*)>/) || [])[1]; send('250 OK');
      } else if (/^RCPT TO:/i.test(line)) {
        state.to.push((line.match(/<([^>]*)>/) || [])[1]); send('250 Accepted');
      } else if (verb === 'DATA') {
        mode = 'data'; send('354 Enter message, ending with "." on a line by itself');
      } else if (verb === 'QUIT') {
        send('221 Bye'); socket.end(); return;
      } else {
        send('500 Unrecognized command');
      }
    }
  };
  socket.on('data', onData);
  socket.on('error', () => {});
  if (greet) send('220 fake.smtp ESMTP');
}

(async () => {
  /* self-signed certificate for the fake servers */
  const key = path.join(work, 'key.pem');
  const cert = path.join(work, 'cert.pem');
  execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-keyout', key, '-out', cert, '-days', '2',
    '-subj', '/CN=127.0.0.1', '-addext', 'subjectAltName=IP:127.0.0.1'], { stdio: 'ignore' });
  const secureContext = tls.createSecureContext({ key: fs.readFileSync(key), cert: fs.readFileSync(cert) });
  const smtps = tls.createServer({ key: fs.readFileSync(key), cert: fs.readFileSync(cert) }, (s) => smtpSession(s, { auth: 'LOGIN PLAIN' }));
  smtps.on('tlsClientError', () => {});
  const submission = net.createServer((s) => smtpSession(s, { auth: 'PLAIN', starttls: true, secureContext }));
  await new Promise((resolve) => smtps.listen(SMTPS_PORT, '127.0.0.1', resolve));
  await new Promise((resolve) => submission.listen(STARTTLS_PORT, '127.0.0.1', resolve));

  const php = spawn('php', ['-d', `sendmail_path=${sendmail}`, '-S', `127.0.0.1:${PORT}`, '-t', path.join(work, 'site')],
    { env: { ...process.env, TMPDIR: tmpDir }, stdio: 'ignore' });
  let failed = false;
  const report = (name, ok, detail = {}) => { if (!ok) failed = true; console.log(JSON.stringify({ test: name, ok, ...detail })); };
  try {
    for (let i = 0; i < 50; i++) {
      try { await fetch(URL_); break; } catch (e) { await new Promise((r) => setTimeout(r, 100)); }
    }

    /* --- requests the endpoint must refuse -------------------------------- */
    let res = await fetch(URL_);
    let json = await res.json();
    report('GET is refused with a JSON answer', res.status === 405 && json.success === false && /transport: mail/.test(json.message), { status: res.status });

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

    /* --- mail() (no config file) ------------------------------------------- */
    res = await post(valid(), { Origin: `http://127.0.0.1:${PORT}` });
    const first = mails().length === 1 ? readMail(mails()[0]) : null;
    report('mail(): valid message from the same host is mailed', res.status === 200 && (await res.json()).success === true && !!first
      && first.to === 'recepcja@owrusalka.pl' && /recepcja@owrusalka\.pl/.test(first.from) && first.replyTo === 'zaneta@example.com'
      && first.subject === valid().subject && first.body.includes('Uwagi: łóżeczko, dwie poduszki') && first.body.includes('zaneta@example.com, tel. 600 100 200'),
    { status: res.status, mails: mails().length, subject: first && first.subject });

    res = await post(valid({ name: 'Anna\r\nBcc: spy@example.com', subject: 'Hello\r\nBcc: spy@example.com' }));
    const second = mails().length === 2 ? readMail(mails()[1]) : null;
    report('mail(): header injection is flattened', res.status === 200 && !!second && !/^Bcc:/mi.test(second.head) && second.subject === 'Hello Bcc: spy@example.com',
      { status: res.status, subject: second && second.subject });

    const statuses = [];
    for (let i = 0; i < 4; i++) statuses.push((await post(valid())).status);
    report('rate limit: 5 accepted, then 429', statuses.join(',') === '200,200,200,429' && mails().length === 5, { statuses: statuses.join(','), mails: mails().length });

    /* --- SMTP (config file present) ---------------------------------------- */
    const mailsBefore = mails().length;
    const smtpConfig = (extra = {}) => ({ host: '127.0.0.1', port: SMTPS_PORT, encryption: 'ssl', ...MAILBOX, verify_tls: false, ...extra });

    resetRateLimit();
    setConfig(CONFIG_ABOVE, smtpConfig());
    json = await (await fetch(URL_)).json();
    res = await post(valid({ message: 'Pierwsza linia\n.linia zaczynająca się kropką\n..i dwiema\nUwagi: łóżeczko' }));
    /* envelope: what the server was told (login, MAIL FROM, RCPT TO); letter: the message itself */
    let envelope = deliveries.length === 1 ? deliveries[0] : null;
    let letter = envelope ? parseMail(envelope.raw) : null;
    report('SMTP over implicit TLS, AUTH LOGIN, config above the web root', /transport: smtp/.test(json.message) && res.status === 200 && (await res.json()).success === true && !!envelope
      && envelope.encrypted && envelope.user === MAILBOX.username && envelope.from === MAILBOX.username && envelope.to.join() === 'recepcja@owrusalka.pl'
      && letter.from === `"Strona owrusalka.pl" <${MAILBOX.username}>` && letter.to === '<recepcja@owrusalka.pl>'
      && letter.replyTo === 'zaneta@example.com' && letter.subject === valid().subject && letter.date !== '' && /@owrusalka\.pl>$/.test(letter.messageId)
      && letter.body.includes('Pierwsza linia\r\n.linia zaczynająca się kropką\r\n..i dwiema\r\nUwagi: łóżeczko'),
    { status: res.status, delivered: deliveries.length, subject: letter && letter.subject });

    setConfig(CONFIG_BESIDE, smtpConfig({ port: STARTTLS_PORT, encryption: 'tls', sender: 'strona@owrusalka.pl', recipient: 'biuro@owrusalka.pl' }));
    res = await post(valid());
    envelope = deliveries.length === 2 ? deliveries[1] : null;
    letter = envelope ? parseMail(envelope.raw) : null;
    report('SMTP with STARTTLS, AUTH PLAIN, config next to the script, own sender and recipient', res.status === 200 && !!envelope
      && envelope.encrypted && envelope.user === MAILBOX.username && envelope.from === 'strona@owrusalka.pl' && envelope.to.join() === 'biuro@owrusalka.pl'
      && /<strona@owrusalka\.pl>/.test(letter.from) && letter.to === '<biuro@owrusalka.pl>' && letter.body.includes('Uwagi: łóżeczko, dwie poduszki'),
    { status: res.status, delivered: deliveries.length });

    res = await fetch(`http://127.0.0.1:${PORT}/api/wyslij-config.php`);
    const leaked = await res.text();
    report('the config file next to the script shows nothing when opened from the web', leaked === '' && !leaked.includes(MAILBOX.password), { status: res.status, bytes: leaked.length });

    resetRateLimit();   // the refusals below still count as attempts

    setConfig(CONFIG_ABOVE, smtpConfig({ verify_tls: undefined }));
    res = await post(valid());
    json = await res.json();
    report('SMTP: an untrusted certificate is refused by default', res.status === 500 && /smtp: connect/.test(json.message) && deliveries.length === 2, { status: res.status, message: json.message });

    setConfig(CONFIG_ABOVE, smtpConfig({ port: STARTTLS_PORT, encryption: 'tls', verify_tls: undefined }));
    res = await post(valid());
    json = await res.json();
    report('SMTP with STARTTLS: an untrusted certificate is refused by default', res.status === 500 && /smtp: tls/.test(json.message) && deliveries.length === 2, { status: res.status, message: json.message });

    setConfig(CONFIG_ABOVE, smtpConfig({ password: 'wrong' }));
    res = await post(valid());
    json = await res.json();
    report('SMTP: a wrong password is reported, nothing is sent', res.status === 500 && /smtp: auth/.test(json.message) && deliveries.length === 2, { status: res.status, message: json.message });

    setConfig(CONFIG_ABOVE, { host: '127.0.0.1', username: MAILBOX.username });
    res = await post(valid());
    json = await res.json();
    report('a broken config file stops sending', res.status === 500 && /config/.test(json.message) && deliveries.length === 2, { status: res.status, message: json.message });

    report('with a config file, mail() is never used as a fallback', mails().length === mailsBefore, { mails: mails().length });
  } catch (e) {
    report('script error', false, { error: String(e && e.stack || e).slice(0, 300) });
  } finally {
    php.kill();
    smtps.close();
    submission.close();
    fs.rmSync(work, { recursive: true, force: true });
  }
  process.exit(failed ? 1 : 0);
})();
