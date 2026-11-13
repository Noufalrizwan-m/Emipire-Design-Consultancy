<?php
// Contact endpoint for Hostinger / any PHP host.
// Sends through the Resend API (same service as api/contact.js), so delivery,
// bounces and logs are visible in the Resend dashboard instead of disappearing
// into a shared-hosting MTA.
//
// SETUP: copy contact-config.sample.php to contact-config.php, put your Resend
// API key in it, and verify empiredesignae.com as a sending domain at resend.com.
//
// Mirrors api/contact.js exactly: same fields, limits, validation and status
// codes, so src/ContactForm.jsx needs no change — .htaccess maps /api/contact here.
// Written for PHP 7.0+ so it runs on older shared hosting without edits.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function fail($code) {
    http_response_code($code);
    echo json_encode(['ok' => false]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405);
}

$config = __DIR__ . '/contact-config.php';
$settings = is_file($config) ? require $config : [];
$apiKey  = isset($settings['resend_api_key']) ? trim($settings['resend_api_key']) : '';
$to      = isset($settings['to'])      ? $settings['to']      : 'support@empiredesignae.com';
$from    = isset($settings['from'])    ? $settings['from']    : 'Empire Website <support@empiredesignae.com>';
$subject = isset($settings['subject']) ? $settings['subject'] : 'Website project enquiry';

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 65536) fail(400);
$data = json_decode($raw, true);
if (!is_array($data)) fail(400);

// Same field limits as the Node version.
$limits = [
    'firstName' => 320, 'lastName' => 320, 'email' => 254,
    'phone' => 20, 'country' => 2, 'service' => 200, 'message' => 10000,
];

$v = [];
foreach ($limits as $key => $max) {
    $value = isset($data[$key]) ? $data[$key] : '';
    if (!is_string($value)) fail(400);
    $value = trim($value);
    if (mb_strlen($value) > $max || strpos($value, "\0") !== false) fail(400);
    $v[$key] = $value;
}

// Same validation rules as api/contact.js.
$NAME  = '/^[\p{L}\p{M}]+(?:[\s\'\x{2019}.\-][\p{L}\p{M}]+)*$/u';
$EMAIL = '/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/';

if (
    !preg_match($NAME, $v['firstName']) ||
    !preg_match($NAME, $v['lastName']) ||
    !preg_match($EMAIL, $v['email']) ||
    preg_match('/[\r\n]/', $v['email']) ||          // header-injection guard
    !preg_match('/^\+[1-9][0-9]{6,14}$/', $v['phone']) ||
    !preg_match('/^[A-Z]{2}$/', $v['country'])
) fail(422);

// 500 = this server is misconfigured (no key / no cURL), same as the Node version.
if ($apiKey === '' || !function_exists('curl_init')) fail(500);

$text = "Name: {$v['firstName']} {$v['lastName']}\n"
      . "Email: {$v['email']}\n"
      . "Phone: {$v['phone']}\n"
      . "Country: {$v['country']}\n"
      . 'Service: ' . ($v['service'] !== '' ? $v['service'] : 'Not specified') . "\n\n"
      . "Project details:\n"
      . ($v['message'] !== '' ? $v['message'] : 'Not provided') . "\n";

$payload = json_encode([
    'from'     => $from,          // must be on a domain verified in Resend
    'to'       => [$to],
    'reply_to' => $v['email'],    // replying from your inbox reaches the enquirer
    'subject'  => $subject,
    'text'     => $text,
], JSON_UNESCAPED_UNICODE);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
]);
$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

// 502 = Resend rejected it (bad key, unverified domain) or the network failed.
if ($response === false || $status < 200 || $status >= 300) {
    if (!empty($settings['debug_log'])) {
        error_log('[contact] resend status=' . $status . ' err=' . $curlErr . ' body=' . substr((string) $response, 0, 500));
    }
    fail(502);
}

http_response_code(200);
echo json_encode(['ok' => true]);
