<?php

require("./header.php");
require("./function.php");

$search = "%".validate_input($input["search"])."%";
$resp = [];

if ($search !== "") {
    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('SELECT * FROM palinkak WHERE nev LIKE ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        echo json_encode($resp);
    }

    $stmt->bind_param("s", $search);
    $stmt->execute();
    $result = $stmt->get_result();

    $resp["data"] = [];

    foreach ($result as $item) {
        array_push($resp["data"], $item);
    }

    echo json_encode($resp);
} else {
    $resp["data"] = [];

    $result = $database->query("SELECT * FROM palinkak");

    foreach ($result as $item) {
        array_push($resp["data"], $item);
    }

    echo json_encode($resp);
}
