<?php

require("./header.php");
require("./function.php");

$search = "%" . validate_input($input["search"]) . "%";
$filter = validate_input(str_replace("l", "", $input["filter"]));

$resp = [];

if ($search !== "") {
    if ($filter != "Összes") {

        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('SELECT * FROM palinkak WHERE nev LIKE ? AND kiszereles = ?')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            echo json_encode($resp);
        }

        $stmt->bind_param("sd", $search, $filter);
        $stmt->execute();
        $result = $stmt->get_result();

        $resp["data"] = [];
        
        foreach ($result as $item) {
            array_push($resp["data"], $item);
        }

        send_data($resp);
        
    } else {
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('SELECT * FROM palinkak WHERE nev LIKE ? ')) {
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

        send_data($resp);
    }
} else {
    $resp["data"] = [];

    $result = $database->query("SELECT * FROM palinkak");

    foreach ($result as $item) {
        array_push($resp["data"], $item);
    }

    send_data($resp);
}
