<?php

    require(__DIR__ . "/../includes/config.php");

    // numerically indexed array of places
    $places = [];

    // TODO: search database for places matching $_GET["geo"]
    
    // $temp = "Beverly, 90210";
    
    // see if it contains any commas or not, if so explode on comma and replace
    // state code if it exists
    if(strpos($_GET["geo"], ',') !== FALSE)
    {
        $words = explode(",", $_GET["geo"]);
        $num_words = count($words);
        for($i = 0; $i < $num_words; $i++)
        {
            if(substr($words[$i], 0 , 1) === ' ')
            {
                $words[$i] = substr($words[$i], 1);
            }
            if(strlen($words[$i]) === 2)
            {
                $rows = query("SELECT admin_name1 FROM states WHERE admin_code1
                LIKE ?", $words[$i]);
                $words[$i] = $rows[0]['admin_name1'];
            }

        }
        // rebuild
        $_GET["geo"] = implode(",", $words);
    }
    
    // see if it contains any spaces or not, if so explode on space and
    // replace state code if it exists
    if(strpos($_GET["geo"], ' ') !== FALSE)
    {
        $words = explode(" ", $_GET["geo"]);
        $num_words = count($words);
        for($i = 0; $i < $num_words; $i++)
        {
            if(strlen($words[$i]) === 2)
            {
                $rows = query("SELECT admin_name1 FROM states WHERE admin_code1
                LIKE ?", $words[$i]);
                $words[$i] = $rows[0]['admin_name1'];
            }

        }
        // rebuild
        $_GET["geo"] = implode(" ", $words);
    }
    
    $places = query("SELECT * FROM places WHERE MATCH (postal_code, place_name,
                    admin_name1) AGAINST (?)", $_GET["geo"]);
    
    // output places as JSON (pretty-printed for debugging convenience)
    header("Content-type: application/json");
    print(json_encode($places, JSON_PRETTY_PRINT));
    
?>

