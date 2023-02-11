<?php

require("./header.php");
require("./function.php");

$do = validate_input($input["do"]);
if ($do === "getYearStat") {
    $years = validate_input($input["years"]);

    $resp["ev"] = [];
    $resp["fizetve"] = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT sum(eladott_db) as eladott, sum(eladott_db * eladasi_ar) as fizetve, year(idopont) as ev FROM sell GROUP BY ev ORDER BY ev DESC LIMIT ?")) {
        $resp["status"] = "error";
        $resp["code"] = "10404";

        send_data($resp);
    }

    $stmt->bind_param("i", $years);
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $item) {
        array_push($resp["ev"], $item["ev"]);
        array_push($resp["fizetve"], intval($item["fizetve"]));
    }

    $resp["ev"] = array_reverse($resp["ev"]);
    $resp["fizetve"] = array_reverse($resp["fizetve"]);

    send_data($resp);
}

// SELECT palinkak.nev, palinkak.kiszereles, palinkak.color, sum(sell.eladott_db) as eladva FROM sell LEFT JOIN palinkak ON sell.palinka_id = palinkak.id WHERE year(idopont) = "2023" GROUP BY palinkak.kiszereles ORDER BY eladva DESC, kiszereles DESC, nev;

if ($do === "getPalinkakdb") {

    $resp = [];
    $year = validate_input($input["year"]);

    $names = $database->query("SELECT id, nev FROM palinkak GROUP BY nev");

    foreach ($names as $name) {

        $group["nev"] = "";
        $group["color"] = [];
        $group["eladva"] = [];
        $group["kiszereles"] = [];

        $stmt = $database->stmt_init();
        if (!$stmt = $database->prepare("SELECT palinkak.nev, palinkak.kiszereles, palinkak.color, sum(sell.eladott_db) as eladva FROM sell LEFT JOIN palinkak ON sell.palinka_id = palinkak.id WHERE year(idopont) = ? AND nev = ? GROUP BY palinkak.kiszereles ORDER BY nev, eladva ASC, kiszereles ASC;")) {
            $resp["status"] = "error";
            $resp["code"] = "10404";

            send_data($resp);
        }

        $stmt->bind_param("ss", $year, $name["nev"]);
        $stmt->execute();
        $results = $stmt->get_result();

        foreach ($results as $item) {
            $group["nev"] = $item["nev"];
            array_push($group["kiszereles"], $item["kiszereles"]);

            $split_hex = str_split($item["color"], 2);
            $red = hexdec($split_hex[0]);
            $green = hexdec($split_hex[1]);
            $blue = hexdec($split_hex[2]);

            array_push($group["color"], "$red, $green, $blue, ");
            array_push($group["eladva"], intval($item["eladva"]));
        }



        array_push($resp, $group);
    }
    send_data($resp);
}
