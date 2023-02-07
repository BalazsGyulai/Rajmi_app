<?php
require("./header.php");
require("./function.php");

$id = validate_input($input["id"]);
$do = validate_input($input["do"]);

$resp = [];

if ($do === "add") {

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('SELECT darab FROM palinkak WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $darab = intval($row["darab"]);
    $darab += 1;

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('UPDATE palinkak SET darab = ? WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("ii", $darab, $id);
    $stmt->execute();

    $resp["status"] = $darab;
    send_data($resp);
}


if ($do === "minus") {
    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('SELECT darab FROM palinkak WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $darab = intval($row["darab"]);
    $darab -= 1;

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('UPDATE palinkak SET darab = ? WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("ii", $darab, $id);
    $stmt->execute();

    $resp["status"] = $darab;
    send_data($resp);
}

if ($do === "delete") {

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('DELETE FROM palinkak WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $resp["status"] = "ok";
    send_data($resp);
}
