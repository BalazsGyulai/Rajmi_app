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
        }

        $stmt->bind_param("i", $item);
        $stmt->execute();

        $resp["status"] = "ok";
    } else {
        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare('DELETE FROM cart WHERE id = ?')) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
        }

        $stmt->bind_param("i", $item);
        $stmt->execute();

        $resp["status"] = "ok";
    }

    send_data($resp);
}

if ($do === "getItems"){
    $result = $database->query("SELECT p.id, p.nev, p.kiszereles, p.color, c.db, c.ar FROM cart c LEFT JOIN palinkak p ON c.id = p.id ORDER BY p.kiszereles DESC, p.nev ASC");

    $resp = [];

    foreach ($result as $item){
        array_push($resp, $item);
    }

    send_data($resp);

}


if ($do === "updatedb"){
    $item = validate_input($input["item"]);
    $db = validate_input($input["db"]);
    $resp = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('UPDATE cart SET db = ? WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
    }

    $stmt->bind_param("ii", $db, $item);
    $stmt->execute();

    send_data($db);
}

if ($do === "updatear"){
    $item = validate_input($input["item"]);
    $ar = validate_input($input["ar"]);
    $resp = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare('UPDATE cart SET ar = ? WHERE id = ?')) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
    }

    $stmt->bind_param("ii", $ar, $item);
    $stmt->execute();

    send_data($ar);
}

if ($do === "updatevegosszeg") {
    $resp = "";
    $result = $database->query("SELECT sum(db * ar) as vegosszeg FROM cart");
    
    $num = $result->num_rows;

    if ($num > 0){
        $resp = $result->fetch_assoc();
    } else {
        $resp = "-";
    }

    send_data($resp);
}