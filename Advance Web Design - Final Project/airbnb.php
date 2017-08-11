<?php

        $apiRequest = curl_init();

            $query = $_SERVER['QUERY_STRING'];
            $apiURL = 'https://api.airbnb.com/v2/search_results?' . $query;

            //build GET Request to API
            curl_setopt($apiRequest, CURLOPT_URL, $apiURL); 
            curl_setopt($apiRequest, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($apiRequest, CURLOPT_POST, false);
            curl_setopt($apiRequest, CURLOPT_HTTPGET, true);
            
            $apiResponse = curl_exec($apiRequest);
            
            print($apiResponse);

?>