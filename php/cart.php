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
