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
   A JSON line saying the endpoint is up means PHP runs it.

   No passwords or keys in this file: mail goes out through the server's own
   mail(). Needs PHP 7.4 or newer.
============================================================================ */
declare(strict_types=1);

const RECIPIENT = 'recepcja@owrusalka.pl';
/* Must be an address on this server's own domain, or the mail is likely to be
   rejected as forged. The guest's address goes into Reply-To. */
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
    respond(405, false, 'Form endpoint is up. It accepts POST only.');
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

$body = $message . "\n\n-- \n"
    . 'Wysłano z formularza na stronie ' . (parse_url($origin, PHP_URL_HOST) ?: 'owrusalka.pl')
    . ', ' . date('d.m.Y, H:i') . ".\n"
    . 'Odpowiedź na tę wiadomość trafi do: ' . $email . ($phone !== '' ? ', tel. ' . $phone : '') . ".\n";

$headers = [
    'From' => '"' . SENDER_NAME . '" <' . SENDER . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => 'base64',
];
$encodedSubject = encode_header($subject);
$encodedBody = chunk_split(base64_encode(str_replace("\n", "\r\n", $body)));

$sent = @mail(RECIPIENT, $encodedSubject, $encodedBody, $headers, '-f' . SENDER);
if (!$sent) {
    /* Some hosts refuse the envelope-sender parameter. */
    $sent = @mail(RECIPIENT, $encodedSubject, $encodedBody, $headers);
}
if (!$sent) {
    error_log('owrusalka form endpoint: mail() failed');
    respond(500, false, 'The message could not be sent.');
}
respond(200, true);
