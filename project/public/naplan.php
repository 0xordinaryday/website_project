<?php

    require(__DIR__ . "/../includes/config.php");

    if($_GET["grade"] === "naplan_year3") // if($_POST["grade"] === "naplan_year3")
    {
        $rows = query("SELECT t1.*, t2.icsea FROM naplan_year3 AS t1 
             LEFT OUTER JOIN naplan_icsea AS t2 ON t1.school_name = t2.school_name 
             WHERE t1.year = ? AND t2.year = ?
             ORDER BY t2.icsea DESC", $_GET["year"], $_GET["year"]); 
    }
    else if($_GET["grade"] === "naplan_year5") //else if($_POST["grade"] === "naplan_year5")
    {
        $rows = query("SELECT t1.*, t2.icsea FROM naplan_year5 AS t1 
             LEFT OUTER JOIN naplan_icsea AS t2 ON t1.school_name = t2.school_name 
             WHERE t1.year = ? AND t2.year = ?
             ORDER BY t2.icsea DESC", $_GET["year"], $_GET["year"]);
    }
    
    // output places as JSON (pretty-printed for debugging convenience)
    header("Content-type: application/json");
    print(json_encode($rows, JSON_PRETTY_PRINT));
  
?>
