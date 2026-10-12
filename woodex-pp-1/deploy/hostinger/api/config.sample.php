<?php
/**
 * Woodex PP-1 API — server config TEMPLATE.
 *
 * Copy this file to config.php ON THE SERVER (hPanel File Manager), fill in
 * the values, set permissions 600. The real config.php must NEVER be
 * committed to git — api/.htaccess denies serving it.
 */
return [
    // MySQL (hPanel → Databases)
    'db' => [
        'host' => 'localhost',
        'name' => 'u123456789_woodex',
        'user' => 'u123456789_woodex',
        'pass' => 'CHANGE-ME',
    ],
    // Absolute paths on the Hostinger account
    'root_dir'    => '/home/u123456789/domains/YOUR-DOMAIN.example/public_html',
    'private_dir' => '/home/u123456789/domains/YOUR-DOMAIN.example/private',
    // Admin origin allowed by CORS (kept in sync with api/.htaccess)
    'admin_origin' => 'https://YOUR-DOMAIN.example',
];
