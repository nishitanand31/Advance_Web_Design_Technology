<?php

    $startDate = $_REQUEST['startdate'];
    $endDate = $_REQUEST['enddate'];
    $favorites = $_REQUEST['favorites'];
    $title = $_REQUEST['title'];
    $limit = $_REQUEST['limit'];
    $body = $_REQUEST['body'];
    $sort = $_REQUEST['sort'];
    $sort_descending = $_REQUEST['sort_descending'];
    
    $response = file_get_contents(
        'http://000.vlcnetworks.net/api/indirect/getposts.json.php?startdate=' . $startDate . '&enddate=' . $endDate .
        '&favorites=' . $favorites .
        '&title=' . $title .
        '&limit=' . $limit .
        '&body=' . $body .
        '&sort=' . $sort .
        '&sort_descending=' . $sort_descending
    );
    
    print($response);

?>