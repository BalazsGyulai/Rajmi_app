<?php

require("./header.php");
require("./function.php");

$name = validate_input($input["search"]);
$kiszereles = validate_input(str_replace("l", "", $input["filter"]));

$resp = [];

$stmt = $database->stmt_init();
if (!$stmt = $database->prepare('INSERT INTO palinkak(nev, kiszereles) VALUES(?,?)')) {
    $resp["status"] = "error";
    $resp["code"] = "10404";

    echo json_encode($resp);
    exit;
}

$stmt->bind_param("sd", $name, $kiszereles);
$stmt->execute();

$resp["status"] = "ok";
$resp["filter"] = $kiszereles;

send_data($resp);
