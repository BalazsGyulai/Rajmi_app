<?php

require("./header.php");
require("./function.php");

$search = "%" . validate_input($input["search"]) . "%";
$filter = validate_input(str_replace("l", "", $input["filter"]));

$resp = [];

if ($search !== "") {
    if ($filter != "Összes") {

        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('SELECT * FROM palinkak LEFT JOIN (SELECT id as in_cart from cart) a ON palinkak.id = a.in_cart WHERE palinkak.nev LIKE ? AND palinkak.kiszereles = ? ORDER BY palinkak.darab DESC, palinkak.nev ASC, palinkak.kiszereles DESC')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
        }
        // if (!$stmt = $database->prepare('SELECT * FROM palinkak WHERE nev LIKE ? AND kiszereles = ? ORDER BY darab DESC, nev ASC, kiszereles DESC')) {
        //     $resp["status"] = "error";
        //     $resp["code"] = "10404";

        //     send_data($resp);
        // }

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
        if (!$stmt = $database->prepare('SELECT * FROM palinkak LEFT JOIN (SELECT id as in_cart from cart) a ON palinkak.id = a.in_cart WHERE palinkak.nev LIKE ? ORDER BY palinkak.darab DESC, palinkak.nev ASC, palinkak.kiszereles DESC')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
        }
        // if (!$stmt = $database->prepare('SELECT * FROM palinkak WHERE nev LIKE ? ORDER BY darab DESC, nev ASC, kiszereles DESC ')) {
        //     $resp["status"] = "error";
        //     $resp["code"] = "10404";

        //     send_data($resp);
        // }

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

    $result = $database->query("SELECT * FROM palinkak LEFT JOIN (SELECT id as in_cart from cart) a ON palinkak.id = a.in_cart ORDER BY palinkak.darab DESC, palinkak.nev ASC, palinkak.kiszereles DESC");

    foreach ($result as $item) {
        array_push($resp["data"], $item);
    }

    send_data($resp);
}
