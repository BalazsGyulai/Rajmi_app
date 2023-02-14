<?php

define("DB_HOST", "localhost");
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'rajmi_app');

// define("DB_HOST", "localhost");
// define('DB_USER', '1126_rajmi');
// define('DB_PASSWORD', 'Gyu0531Ba');
// define('DB_NAME', '1126_rajmi');

@$database = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if (mysqli_connect_errno()) {
    echo json_encode("failed to connect to database");
    exit;
}