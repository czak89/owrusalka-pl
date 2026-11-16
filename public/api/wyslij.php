<?php
/* ============================================================================
   Form endpoint for owrusalka.pl.

   The booking modal, the /rezerwacja wizard and the /kontakt form post here
   (components/send-form.jsx, NEXT_PUBLIC_FORM_ENDPOINT). The script takes a
   JSON POST, mails it to the reception and answers with JSON:
     {"success": true}   or   {"success": false, "message": "..."}

   Where it goes: <web root>/api/wyslij.php. The site build copies this file to
   out/api/wyslij.php, so it travels with the site once the site lives on this
   server. Until then, upload this one file by hand.

   Check after upload: open https://owrusalka.pl/api/wyslij.php in a browser.
   A JSON line saying the endpoint is up means PHP runs it; the same line
   names the transport in use (smtp or mail).

   Sending: through an SMTP mailbox when wyslij-config.php exists (template:
   docs/wyslij-config.example.php), otherwise through the server's own mail().
   The config file is looked for one folder above the web root first, then
   next to this file. No passwords or keys in this file itself.
   Needs PHP 7.4 or newer; SMTP also needs the openssl extension.
============================================================================ */
declare(strict_types=1);

const RECIPIENT = 'recepcja@owrusalka.pl';
/* Sender when mail() is used. Must be an address on this server's own domain,
   or the mail is likely to be rejected as forged. With SMTP the sender is the
   mailbox from wyslij-config.php. The guest's address goes into Reply-To. */
const SENDER = 'recepcja@owrusalka.pl';
const SENDER_NAME = 'Strona owrusalka.pl';

/* Sites allowed to post here. A request from the same host as this file is
   always allowed. */
const ALLOWED_ORIGINS = [
    'https://owrusalka.pl',
    'https://www.owrusalka.pl',
    'https://czak89.github.io',   // GitHub Pages preview
    'http://localhost:3000',      // npm run dev
    'http://localhost:8732',      // npx serve out -l 8732
];

const MAX_BODY_BYTES = 20000;
const RATE_LIMIT = 5;      // messages ...
const RATE_WINDOW = 600;   // ... per this many seconds, per IP address

date_default_timezone_set('Europe/Warsaw');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message = ''): void
{
    http_response_code($status);
    $out = ['success' => $success];
    if ($message !== '') {
        $out['message'] = $message;
    }
    echo json_encode($out, JSON_UNESCAPED_UNICODE);
    exit;
}

/* --- SMTP settings ----------------------------------------------------------
   null: no config file, mail() is used. An array with an 'error' key: the file
   is there but unusable; nothing is sent rather than falling back to mail(). */
function smtp_config(): ?array
{
    $files = [];
    $root = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), '/');
    if ($root !== '') {
        $files[] = dirname($root) . '/wyslij-config.php';
    }
    $files[] = __DIR__ . '/wyslij-config.php';
    foreach ($files as $file) {
        if (!@is_file($file)) {
            continue;
        }
        $config = require $file;
        if (!is_array($config)) {
            return ['error' => 'the file does not return an array'];
        }
        foreach (['host', 'username', 'password'] as $key) {
            if (!isset($config[$key]) || !is_string($config[$key]) || $config[$key] === '') {
                return ['error' => "missing $key"];
            }
        }
        $config['encryption'] = $config['encryption'] ?? 'ssl';
        if (!in_array($config['encryption'], ['ssl', 'tls'], true)) {
            return ['error' => "encryption must be 'ssl' or 'tls'"];
        }
        $config['port'] = (int) ($config['port'] ?? ($config['encryption'] === 'ssl' ? 465 : 587));
        if ($config['port'] < 1 || $config['port'] > 65535) {
            return ['error' => 'invalid port'];
        }
        foreach (['sender' => $config['username'], 'recipient' => RECIPIENT] as $key => $default) {
            $config[$key] = $config[$key] ?? $default;
            if (!is_string($config[$key]) || filter_var($config[$key], FILTER_VALIDATE_EMAIL) === false) {
                return ['error' => "$key is not an e-mail address"];
            }
        }
        return $config;
    }
    return null;
}

$smtp = smtp_config();

/* --- who is asking ---------------------------------------------------------- */
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');

function same_host(string $origin): bool
{
    $parts = parse_url($origin);
    if (!is_array($parts) || empty($parts['host'])) {
        return false;
    }
    $originHost = strtolower($parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : ''));
    return $originHost === strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
}

$originOk = $origin !== '' && (in_array($origin, ALLOWED_ORIGINS, true) || same_host($origin));
if ($originOk) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Max-Age: 86400');
}

if ($method === 'OPTIONS') {
    http_response_code($originOk ? 204 : 403);
    exit;
}
if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, false, 'Form endpoint is up (transport: ' . ($smtp === null ? 'mail' : 'smtp') . '). It accepts POST only.');
}
/* Browsers always send Origin with a POST; most scripted spam does not. */
if (!$originOk) {
    respond(403, false, 'Origin not allowed.');
}

/* --- read the message ------------------------------------------------------- */
if (stripos((string) ($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json') !== 0) {
    respond(415, false, 'Expected application/json.');
}
$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, false, 'Message too long.');
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, false, 'Invalid JSON.');
}

/* Honeypot: people never see this field. A bot gets the normal answer and
   nothing is sent. */
if (!empty($data['botcheck'])) {
    respond(200, true);
}

/* A text field: valid UTF-8, no control characters, at most $max bytes.
   Single-line fields also lose their line breaks, which keeps them safe to
   use in mail headers. */
function text_field(array $data, string $key, int $max, bool $multiline = false): string
{
    $value = $data[$key] ?? '';
    if (!is_string($value) || preg_match('//u', $value) !== 1) {
        respond(400, false, "Invalid field: $key.");
    }
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = (string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    if (!$multiline) {
        $value = (string) preg_replace('/\s+/u', ' ', $value);
    }
    $value = trim($value);
    if (strlen($value) > $max) {
        respond(400, false, "Field too long: $key.");
    }
    return $value;
}

$name = text_field($data, 'name', 120);
$email = text_field($data, 'email', 254);
$phone = text_field($data, 'phone', 40);
$subject = text_field($data, 'subject', 200);
$message = text_field($data, 'message', 6000, true);

if (strlen($name) < 2) {
    respond(400, false, 'Name is required.');
}
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(400, false, 'A valid e-mail address is required.');
}
if ($message === '') {
    respond(400, false, 'Message is required.');
}
if ($subject === '') {
    $subject = 'Wiadomość ze strony owrusalka.pl';
}

/* --- rate limit -------------------------------------------------------------
   Time stamps of recent messages per IP address, in the system temp folder.
   The address itself is not stored, only its hash in the file name. If the
   folder cannot be written, the limit is skipped rather than blocking guests. */
function rate_limited(string $ip): bool
{
    $dir = sys_get_temp_dir();
    $now = time();
    if (random_int(1, 50) === 1) {
        foreach (glob($dir . '/owrusalka-form-*.txt') ?: [] as $old) {
            if (@filemtime($old) < $now - 86400) {
                @unlink($old);
            }
        }
    }
    $handle = @fopen($dir . '/owrusalka-form-' . hash('sha256', $ip) . '.txt', 'c+');
    if ($handle === false) {
        return false;
    }
    flock($handle, LOCK_EX);
    $times = [];
    foreach (explode("\n", (string) stream_get_contents($handle)) as $line) {
        if ((int) $line > $now - RATE_WINDOW) {
            $times[] = (int) $line;
        }
    }
    $limited = count($times) >= RATE_LIMIT;
    if (!$limited) {
        $times[] = $now;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, implode("\n", $times));
    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited;
}

if (rate_limited((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'))) {
    header('Retry-After: ' . RATE_WINDOW);
    respond(429, false, 'Too many messages. Try again later.');
}

/* --- send ------------------------------------------------------------------- */
/* RFC 2047 encoded words, 45 bytes of text each, so no word exceeds 75 chars. */
function encode_header(string $text): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $text) === 1) {
        return $text;
    }
    $chunks = [];
    $current = '';
    foreach (preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $char) {
        if (strlen($current . $char) > 45) {
            $chunks[] = $current;
            $current = '';
        }
        $current .= $char;
    }
    if ($current !== '') {
        $chunks[] = $current;
    }
    $words = [];
    foreach ($chunks as $chunk) {
        $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
    }
    return implode(' ', $words);
}

$sender = $smtp['sender'] ?? SENDER;
$recipient = $smtp['recipient'] ?? RECIPIENT;

$body = $message . "\n\n-- \n"
    . 'Wysłano z formularza na stronie ' . (parse_url($origin, PHP_URL_HOST) ?: 'owrusalka.pl')
    . ', ' . date('d.m.Y, H:i') . ".\n"
    . 'Odpowiedź na tę wiadomość trafi do: ' . $email . ($phone !== '' ? ', tel. ' . $phone : '') . ".\n";

$headers = [
    'From' => '"' . SENDER_NAME . '" <' . $sender . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => 'base64',
];
$encodedSubject = encode_header($subject);
$encodedBody = chunk_split(base64_encode(str_replace("\n", "\r\n", $body)));

/* A failed SMTP step: which one, and what the server answered. */
class SmtpFailure extends RuntimeException
{
    public string $stage;

    public function __construct(string $stage, string $detail)
    {
        parent::__construct($detail);
        $this->stage = $stage;
    }
}

/* One SMTP reply, which may span several lines ("250-..." ... "250 ..."). */
function smtp_reply($socket, array $expected, string $stage): string
{
    $reply = '';
    while (($line = fgets($socket, 2048)) !== false) {
        $reply .= $line;
        if (strlen($line) < 4 || $line[3] !== '-') {
            break;
        }
    }
    if (!in_array((int) substr($reply, 0, 3), $expected, true)) {
        throw new SmtpFailure($stage, trim($reply) === '' ? 'no answer' : trim($reply));
    }
    return $reply;
}

function smtp_command($socket, string $command, array $expected, string $stage): string
{
    fwrite($socket, $command . "\r\n");
    return smtp_reply($socket, $expected, $stage);
}

/* Minimal SMTP client: implicit TLS ('ssl') or STARTTLS ('tls'), AUTH LOGIN or
   PLAIN, one recipient. The server certificate is verified unless the config
   sets verify_tls to false. */
function send_via_smtp(array $config, string $recipient, string $data): void
{
    $verify = ($config['verify_tls'] ?? true) !== false;
    $context = stream_context_create(['ssl' => ['verify_peer' => $verify, 'verify_peer_name' => $verify]]);
    $address = ($config['encryption'] === 'ssl' ? 'ssl://' : 'tcp://') . $config['host'] . ':' . $config['port'];
    $socket = @stream_socket_client($address, $errno, $error, 15, STREAM_CLIENT_CONNECT, $context);
    if ($socket === false) {
        throw new SmtpFailure('connect', $error !== '' ? $error : 'connection failed');
    }
    try {
        stream_set_timeout($socket, 15);
        $hello = 'EHLO ' . (preg_replace('/[^a-z0-9.-]/', '', strtolower(explode(':', (string) ($_SERVER['HTTP_HOST'] ?? ''))[0])) ?: 'localhost');
        smtp_reply($socket, [220], 'greeting');
        $features = smtp_command($socket, $hello, [250], 'hello');
        if ($config['encryption'] === 'tls') {
            smtp_command($socket, 'STARTTLS', [220], 'tls');
            if (@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) {
                throw new SmtpFailure('tls', 'TLS handshake failed');
            }
            $features = smtp_command($socket, $hello, [250], 'hello');
        }
        if (preg_match('/^250[ -]AUTH\b.*\bLOGIN\b/mi', $features) === 1 || preg_match('/^250[ -]AUTH\b.*\bPLAIN\b/mi', $features) !== 1) {
            smtp_command($socket, 'AUTH LOGIN', [334], 'auth');
            smtp_command($socket, base64_encode($config['username']), [334], 'auth');
            smtp_command($socket, base64_encode($config['password']), [235], 'auth');
        } else {
            smtp_command($socket, 'AUTH PLAIN ' . base64_encode("\0" . $config['username'] . "\0" . $config['password']), [235], 'auth');
        }
        smtp_command($socket, 'MAIL FROM:<' . $config['sender'] . '>', [250], 'sender');
        smtp_command($socket, 'RCPT TO:<' . $recipient . '>', [250, 251], 'recipient');
        smtp_command($socket, 'DATA', [354], 'data');
        /* a line that starts with a dot gets a second one (RFC 5321, 4.5.2) */
        fwrite($socket, preg_replace('/^\./m', '..', $data) . "\r\n.\r\n");
        smtp_reply($socket, [250], 'data');
        fwrite($socket, "QUIT\r\n");
    } finally {
        fclose($socket);
    }
}

if ($smtp !== null) {
    if (isset($smtp['error'])) {
        error_log('owrusalka form endpoint: wyslij-config.php: ' . $smtp['error']);
        respond(500, false, 'The message could not be sent (config).');
    }
    $lines = [
        'Date: ' . date('r'),
        'From: ' . $headers['From'],
        'To: <' . $recipient . '>',
        'Subject: ' . $encodedSubject,
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . substr((string) strrchr($sender, '@'), 1) . '>',
    ];
    foreach (array_slice($headers, 1) as $name => $value) {
        $lines[] = $name . ': ' . $value;
    }
    try {
        send_via_smtp($smtp, $recipient, implode("\r\n", $lines) . "\r\n\r\n" . rtrim($encodedBody));
    } catch (SmtpFailure $failure) {
        /* the server's answer goes to the log, never the password */
        error_log('owrusalka form endpoint: smtp ' . $failure->stage . ': ' . substr($failure->getMessage(), 0, 200));
        respond(500, false, 'The message could not be sent (smtp: ' . $failure->stage . ').');
    }
    respond(200, true);
}

$sent = @mail($recipient, $encodedSubject, $encodedBody, $headers, '-f' . $sender);
if (!$sent) {
    /* Some hosts refuse the envelope-sender parameter. */
    $sent = @mail($recipient, $encodedSubject, $encodedBody, $headers);
}
if (!$sent) {
    error_log('owrusalka form endpoint: mail() failed');
    respond(500, false, 'The message could not be sent (mail).');
}
respond(200, true);
