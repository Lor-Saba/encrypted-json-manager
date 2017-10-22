<?php 

    ob_start();

    $fileName = "../data/data.js";
    $content  = "var json = \"". $_POST["json"] ."\";";

    // clone backup
    copy($fileName, $fileName .".". date("Y-m-d_H-i-s"));

    // overwrite
    $result = file_put_contents($fileName, $content);

    ob_clean();

    // echo response
    if ($result)
        echo "OK";
    else
        echo "KO";