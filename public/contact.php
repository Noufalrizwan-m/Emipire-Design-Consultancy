<?php
// Deploy this file on a PHP-enabled host with outbound mail configured.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, bool $ok): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false);
}
if (($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000) respond(413, false);
$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) respond(400, false);

function field(array $data, string $key, int $max): string {
    $value = $data[$key] ?? '';
    if (!is_string($value)) respond(400, false);
    $value = trim($value);
    if (strlen($value) > $max || str_contains($value, "\0")) respond(400, false);
    return $value;
}
$first = field($data, 'firstName', 320);
$last = field($data, 'lastName', 320);
$email = field($data, 'email', 254);
$phone = field($data, 'phone', 20);
$country = field($data, 'country', 2);
$service = field($data, 'service', 200);
$message = field($data, 'message', 10000);
if (!preg_match('/^[\p{L}\p{M}]+(?:[\s\x{27}\x{2019}.\-][\p{L}\p{M}]+)*$/u', $first) ||
    !preg_match('/^[\p{L}\p{M}]+(?:[\s\x{27}\x{2019}.\-][\p{L}\p{M}]+)*$/u', $last) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email) ||
    !preg_match('/^\+[1-9][0-9]{6,14}$/', $phone) || !preg_match('/^[A-Z]{2}$/', $country)) {
    respond(422, false);
}
$body = "Name: $first $last\nEmail: $email\nPhone: $phone\nCountry: $country\nService: " . ($service ?: 'Not specified') . "\n\nProject details:\n" . ($message ?: 'Not provided');
$headers = [
    'From' => 'Empire Website <support@empiredesignae.com>',
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
];
if (!mail('support@empiredesignae.com', 'Website project enquiry', $body, $headers)) respond(500, false);
respond(200, true);
