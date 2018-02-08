<?php

    require(__DIR__ . "/../includes/config.php");
    
    $sw_lat = -41.529198;
    $ne_lat = -41.345170;
    $sw_lng = 147.026721;
    $ne_lng = 147.233744;

    $rows = query("SELECT LATITUDE, LONGITUDE, SEVERITY_RANK FROM crash_data WHERE ? <=
                 latitude AND latitude <= ? AND (? <= longitude AND longitude <= ?) AND 
                 SEVERITY_RANK >= ?", $sw_lat, $ne_lat, $sw_lng, $ne_lng, 10);
    
    // output places as JSON (pretty-printed for debugging convenience)
    header("Content-type: application/json");
    print(json_encode($rows, JSON_PRETTY_PRINT));
    
?>

