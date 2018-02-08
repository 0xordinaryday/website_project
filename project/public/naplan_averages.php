<?php

    require(__DIR__ . "/../includes/config.php");

    if($_GET["grade"] === "naplan_year3") // if($_POST["grade"] === "naplan_year3")
    {
        $rows = query("SELECT * FROM naplan_year3 WHERE year = ? 
                      AND school_name = ?", $_GET["year"], 'National Averages'); 
    }    
    else if($_GET["grade"] === "naplan_year5") //else if($_POST["grade"] === "naplan_year5")
    {
        $rows = query("SELECT * FROM naplan_year5 WHERE year = ?
                      AND school_name = ?", $_GET["year"], 'National Averages'); 
    }
    
    // output places as JSON (pretty-printed for debugging convenience)
    header("Content-type: application/json");
    print(json_encode($rows, JSON_PRETTY_PRINT));
  
?>
