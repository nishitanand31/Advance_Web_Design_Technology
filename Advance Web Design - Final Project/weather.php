<?php

    $clientid = $_REQUEST['Cname'];
    $Code = $_REQUEST['key'];
    //$localLan = $_REQUEST['cnt'];
    //$currency = $_REQUEST['Currency'];
    //$title = $_REQUEST['title'];
    //$limit = $_REQUEST['limit'];
    //$body = $_REQUEST['body'];
    //$sort = $_REQUEST['sort'];
    //$sort_descending = $_REQUEST['sort_descending'];
    
    /*$response = file_get_contents(
        'https://api.airbnb.com/v2/search_results?client_id=' . $clientid . '&locale=' . $locallan .
        '&currency=' . $currency .
        '&limit=' . $limit 
    );*/
    $response = file_get_contents('http://api.openweathermap.org/data/2.5/forecast/daily?q=' . $clientid . '&appid=' .  $Code);
    
    
    print($response);

?>