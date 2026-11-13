<?php
// Copy this file to contact-config.php on the server, then fill it in.
// contact-config.php is gitignored and blocked from the web by .htaccess,
// so the API key never reaches GitHub or a browser.

return [
    // From resend.com > API Keys. Sending permission is enough.
    'resend_api_key' => 're_xxxxxxxxxxxxxxxxxxxxxxxx',

    // Where enquiries land.
    'to' => 'support@empiredesignae.com',

    // Must be on a domain VERIFIED in Resend (Domains > Add Domain, then add
    // the DNS records at your registrar). An unverified domain gives a 502.
    'from' => 'Empire Website <support@empiredesignae.com>',

    'subject' => 'Website project enquiry',

    // Set true temporarily to write Resend's rejection reason to the PHP
    // error log. Leave false in normal operation.
    'debug_log' => false,
];
