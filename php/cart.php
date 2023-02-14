<?php
require("./header.php");
require("./function.php");

$do = validate_input($input["do"]);

if ($do === "cart") {
    $item = validate_input($input["item"]);
    $resp = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('SELECT * FROM cart WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("i", $item);
    $stmt->execute();
    $result_num = $stmt->get_result()->num_rows;

    if ($result_num === 0) {
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('INSERT INTO cart(id) VALUES(?)')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
            exit;
        }

        $stmt->bind_param("i", $item);
        $stmt->execute();

    } else {
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('DELETE FROM cart WHERE id = ?')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
            exit;
        }

        $stmt->bind_param("i", $item);
        $stmt->execute();

    }
    
    $resp["status"] = "ok";
    send_data($resp);

    $stmt->close();
    $database->close();
}

if ($do === "getItems") {
    $result = $database->query("SELECT p.id, p.nev, p.kiszereles, p.color, c.db, c.ar FROM cart c LEFT JOIN palinkak p ON c.id = p.id ORDER BY p.kiszereles DESC, p.nev ASC");

    $resp = [];
    $resp["data"] = [];

    foreach ($result as $item) {
        array_push($resp["data"], $item);
    }

    $resp["status"] = "ok";
    send_data($resp);

    $database->close();
}


if ($do === "updatedb") {
    $item = validate_input($input["item"]);
    $db = validate_input($input["db"]);
    $resp = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('UPDATE cart SET db = ? WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("ii", $db, $item);
    $stmt->execute();

    $resp["db"] = $db;
    $resp["status"] = "ok";
    send_data($resp);

    $stmt->close();
    $database->close();
}

if ($do === "updatear") {
    $item = validate_input($input["item"]);
    $ar = validate_input($input["ar"]);
    $resp = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('UPDATE cart SET ar = ? WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
        exit;
    }

    $stmt->bind_param("ii", $ar, $item);
    $stmt->execute();

    $resp["ar"] = $ar;
    $resp["status"] = "ok";
    send_data($resp);

    $stmt->close();
    $database->close();
}

if ($do === "updatevegosszeg") {
    $resp = [];
    $result = $database->query("SELECT sum(db * ar) as vegosszeg FROM cart");

    $resp["data"] = $result->fetch_assoc();

    $resp["status"] = "ok";
    send_data($resp);

    $database->close();
}

if ($do === "sellItems") {
    $result = $database->query("SELECT p.id, p.darab as raktar_db, c.db as eladott_db, c.ar FROM cart c
    LEFT JOIN palinkak p ON c.id = p.id");
    $date = date("Y.m.d. G:i");
    $resp = [];

    foreach ($result as $palinka) {

        // add to sell
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('INSERT INTO sell(palinka_id, eladott_db, eladasi_ar, idopont) VALUES(?,?,?,?)')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
            exit;
        }

        $stmt->bind_param("iiis", $palinka["id"], $palinka["eladott_db"], $palinka["ar"], $date);
        $stmt->execute();

        // minus palinka
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('UPDATE palinkak SET darab = ? WHERE id = ?')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
            exit;
        }

        $modified_db = intval($palinka["raktar_db"]);
        $modified_db -= intval($palinka["eladott_db"]);

        $stmt->bind_param("ii", $modified_db, $palinka["id"]);
        $stmt->execute();

        // delete cart
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('DELETE FROM cart WHERE id = ?')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
            exit;
        }

        $stmt->bind_param("i", $palinka["id"]);
        $stmt->execute();

    }

    
    $resp["status"] = "ok";
    send_data($resp);

    $stmt->close();
    $database->close();
}
