<?php
/**
 * Nafureanu — contact intake endpoint.
 *
 * The public site is static (Vite build on Hostinger). This file is the
 * only server-side piece: it receives the project brief as JSON, validates
 * it, applies light abuse protection and hands it to the mail transport.
 *
 * The recipient never reaches the browser. It is read, in this order, from:
 *   1. the environment variables CONTACT_TO / CONTACT_FROM, or
 *   2. `nafureanu-contact.config.php` placed ONE LEVEL ABOVE the web root
 *      (i.e. next to `public_html`, not inside it), returning
 *      ['to' => 'inbox@example.com', 'from' => 'no-reply@yourdomain.com'].
 * Without either, the endpoint answers 503 and nothing is sent.
 *
 * Nothing from the message is logged.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MAX_BODY = 16384;
const RATE_WINDOW = 3600;
const RATE_MAX = 5;
const MIN_ELAPSED_MS = 2500;

/** @return never */
function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Recipient and sender, server-side only. */
function contact_config(): ?array
{
    $to = getenv('CONTACT_TO');
    if (is_string($to) && $to !== '') {
        $from = getenv('CONTACT_FROM');
        return ['to' => $to, 'from' => is_string($from) && $from !== '' ? $from : null];
    }
    $path = dirname(__DIR__, 2) . '/nafureanu-contact.config.php';
    if (is_file($path)) {
        $cfg = include $path;
        if (is_array($cfg) && !empty($cfg['to'])) {
            return ['to' => (string) $cfg['to'], 'from' => isset($cfg['from']) ? (string) $cfg['from'] : null];
        }
    }
    return null;
}

/** Trim, normalise line breaks and drop control characters (keeps \n and \t). */
function clean(string $value): string
{
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[^\P{C}\n\t]+/u', '', $value) ?? '';
    return trim($value);
}

/** One line, no header injection possible. */
function header_safe(string $value): string
{
    return trim(preg_replace('/[\r\n\t"<>]+/', ' ', $value) ?? '');
}

/** Sliding-window limit per client address, kept in the system temp dir. */
function rate_limited(string $ip): bool
{
    $dir = sys_get_temp_dir() . '/nafureanu-contact';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false; // no store available: do not block legitimate mail
    }
    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $fh = @fopen($file, 'c+');
    if ($fh === false) {
        return false;
    }
    $limited = false;
    if (flock($fh, LOCK_EX)) {
        $now = time();
        $raw = stream_get_contents($fh);
        $times = is_string($raw) && $raw !== '' ? (json_decode($raw, true) ?: []) : [];
        $times = array_values(array_filter($times, static fn($t) => is_int($t) && $t > $now - RATE_WINDOW));
        if (count($times) >= RATE_MAX) {
            $limited = true;
        } else {
            $times[] = $now;
            ftruncate($fh, 0);
            rewind($fh);
            fwrite($fh, json_encode($times));
        }
        flock($fh, LOCK_UN);
    }
    fclose($fh);
    return $limited;
}

// ---- request shape ---------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    respond(415, ['ok' => false, 'error' => 'content_type']);
}

// same-origin only: the form lives on this site
$fetchSite = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
if ($fetchSite !== '' && !in_array($fetchSite, ['same-origin', 'none'], true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $host = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
    if (!is_string($originHost) || strcasecmp($originHost, (string) $host) !== 0) {
        respond(403, ['ok' => false, 'error' => 'origin']);
    }
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY + 1);
if (!is_string($raw) || $raw === '') {
    respond(400, ['ok' => false, 'error' => 'payload']);
}
if (strlen($raw) > MAX_BODY) {
    respond(413, ['ok' => false, 'error' => 'too_large']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'payload']);
}

$allowed = ['name', 'company', 'email', 'need', 'problem', 'result', 'lang', 'website', 'elapsed'];
foreach (array_keys($data) as $key) {
    if (!in_array($key, $allowed, true)) {
        respond(400, ['ok' => false, 'error' => 'payload']);
    }
}
foreach (['name', 'company', 'email', 'need', 'problem', 'result', 'lang', 'website'] as $key) {
    if (isset($data[$key]) && !is_string($data[$key])) {
        respond(400, ['ok' => false, 'error' => 'payload']);
    }
}

// ---- abuse: honeypot and fill time (silent) --------------------------------

$website = (string) ($data['website'] ?? '');
$elapsed = $data['elapsed'] ?? null;
if ($website !== '' || !is_numeric($elapsed) || (float) $elapsed < MIN_ELAPSED_MS) {
    respond(200, ['ok' => true]);
}

// ---- validation ------------------------------------------------------------

$name = clean((string) ($data['name'] ?? ''));
$company = clean((string) ($data['company'] ?? ''));
$email = clean((string) ($data['email'] ?? ''));
$need = clean((string) ($data['need'] ?? ''));
$problem = clean((string) ($data['problem'] ?? ''));
$result = clean((string) ($data['result'] ?? ''));
$lang = ($data['lang'] ?? 'es') === 'en' ? 'en' : 'es';

$fields = [];
$len = static fn(string $s): int => mb_strlen($s, 'UTF-8');

if ($len($name) < 2) {
    $fields['name'] = 'required';
} elseif ($len($name) > 120) {
    $fields['name'] = 'too_long';
}
if ($email === '') {
    $fields['email'] = 'required';
} elseif ($len($email) > 200 || filter_var($email, FILTER_VALIDATE_EMAIL) === false || str_contains($email, "\n")) {
    $fields['email'] = 'invalid';
}
if ($len($need) < 10) {
    $fields['need'] = 'required';
} elseif ($len($need) > 4000) {
    $fields['need'] = 'too_long';
}
if ($len($company) > 160) {
    $fields['company'] = 'too_long';
}
if ($len($problem) > 4000) {
    $fields['problem'] = 'too_long';
}
if ($len($result) > 4000) {
    $fields['result'] = 'too_long';
}
if ($fields !== []) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $fields]);
}

// ---- rate limit ------------------------------------------------------------

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (rate_limited($ip)) {
    respond(429, ['ok' => false, 'error' => 'rate_limited']);
}

// ---- transport -------------------------------------------------------------

$config = contact_config();
if ($config === null || filter_var($config['to'], FILTER_VALIDATE_EMAIL) === false) {
    respond(503, ['ok' => false, 'error' => 'not_configured']);
}
$to = $config['to'];
$from = $config['from'];
if (!is_string($from) || filter_var($from, FILTER_VALIDATE_EMAIL) === false) {
    $host = strtolower(preg_replace('/^www\./i', '', preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? 'localhost') ?? ''));
    $from = 'no-reply@' . $host;
}

$labels = $lang === 'en'
    ? ['subject' => 'New project', 'name' => 'Name', 'company' => 'Company', 'email' => 'Contact email', 'need' => 'What they need to build', 'problem' => 'Problem they want to solve', 'result' => 'Expected result', 'lang' => 'Sent from', 'time' => 'Received', 'none' => '—', 'langName' => 'English (/en/contact)']
    : ['subject' => 'Nuevo proyecto', 'name' => 'Nombre', 'company' => 'Empresa', 'email' => 'Email de contacto', 'need' => 'Qué necesita construir', 'problem' => 'Problema que quiere resolver', 'result' => 'Resultado esperado', 'lang' => 'Enviado desde', 'time' => 'Recibido', 'none' => '—', 'langName' => 'Español (/contact)'];

$subject = $labels['subject'] . ' · ' . header_safe($name);
$received = gmdate('Y-m-d H:i') . ' UTC';

$lines = [
    $labels['name'] . ': ' . $name,
    $labels['company'] . ': ' . ($company !== '' ? $company : $labels['none']),
    $labels['email'] . ': ' . $email,
    '',
    $labels['need'] . ':',
    $need,
    '',
    $labels['problem'] . ':',
    $problem !== '' ? $problem : $labels['none'],
    '',
    $labels['result'] . ':',
    $result !== '' ? $result : $labels['none'],
    '',
    '—',
    $labels['lang'] . ': ' . $labels['langName'],
    $labels['time'] . ': ' . $received,
];
$body = implode("\n", $lines) . "\n";

$replyName = header_safe($name);
$replyTo = (preg_match('/^[\x20-\x7E]*$/', $replyName) ? '"' . $replyName . '"' : mb_encode_mimeheader($replyName, 'UTF-8', 'B'))
    . ' <' . $email . '>';

$headers = implode("\r\n", [
    'From: Nafureanu <' . $from . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$encodedSubject = mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n");
$sent = @mail($to, $encodedSubject, $body, $headers, '-f' . $from);

if ($sent !== true) {
    respond(502, ['ok' => false, 'error' => 'send_failed']);
}
respond(200, ['ok' => true]);
