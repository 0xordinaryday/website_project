<?php

    // configuration
    require("../includes/config.php");

    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        // render form
        render("../templates/naplan_form.php", ["title" => "Naplan"]);
    }

    // else if user reached page via POST (as by submitting a form via POST)
    else 
    {
        apologize("An error occurred, please go back.");
        // redirect to index
        redirect("./index.php");
    }

?>
