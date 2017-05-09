<?php
    $consumerKey = 'VV3X5WyypQkgauic6oJNKHYFH';//consumer key
    $consumerSecret = 'g1dGgFQfIMT7Mum7Sq2ly3pFJsy5xydgMiVrCisYO97e4stsPB';//consumer secret
    $apiBaseURL = 'https://api.twitter.com/1.1';//base url for the API
    $tokenURL = 'https://api.twitter.com/oauth2/token';//url to authorize call
    
    $apiRequestMethod = $_SERVER['REQUEST_METHOD'];//GET or POST
    $apiPath = '/search/tweets.json';//path to api


    
    //build and encode credentials
    $bearerCredentials = $consumerKey . ':' . $consumerSecret;//build credentials
    $bearerEncoded = base64_encode($bearerCredentials);//encode credentials
    
    $httpHeaderArray = array(//build HTTP Header Array
                'Authorization: Basic ' . $bearerEncoded,
                'Content-Type: application/x-www-form-urlencoded;charset=UTF-8'
            );
 
 
    //build request to authorize application
    $tokenRequest = curl_init();
    curl_setopt($tokenRequest, CURLOPT_URL, $tokenURL); 
    curl_setopt($tokenRequest, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($tokenRequest, CURLOPT_POST, true);
    curl_setopt($tokenRequest, CURLOPT_HTTPGET, false);
    curl_setopt($tokenRequest, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($tokenRequest, CURLOPT_POSTFIELDS, http_build_query(array('grant_type' => 'client_credentials')));
    curl_setopt($tokenRequest, CURLOPT_HTTPHEADER, $httpHeaderArray);

    $response = curl_exec($tokenRequest);

    if ($response === FALSE || curl_getinfo($tokenRequest, CURLINFO_HTTP_CODE) != '200') {
        header('HTTP/1.0 401 Unauthorized');
    } 
    else {
        $responseData = json_decode($response);
        $access_token = $responseData->access_token;//access token

        // Call the twitter API with the bearer access token
        $apiRequest = curl_init();
        $apiHeaderArray = array(//add access token to headers
            'Authorization: Bearer ' . $access_token
        );
        if ($_SERVER['CONTENT_TYPE']) {//if content type exists, add to header array
            array_push($apiHeaderArray, 'Content-Type: ' . $_SERVER['CONTENT_TYPE']);
        }

        if($apiRequestMethod == 'GET'){
            $query = $_SERVER['QUERY_STRING'];
            $apiURL = $apiBaseURL . $apiPath . '?' . $query;

            //build GET Request to API
            curl_setopt($apiRequest, CURLOPT_URL, $apiURL); 
            curl_setopt($apiRequest, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($apiRequest, CURLOPT_POST, false);
            curl_setopt($apiRequest, CURLOPT_HTTPGET, true);
            curl_setopt($apiRequest, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($apiRequest, CURLOPT_HTTPHEADER, $apiHeaderArray);
        }
        elseif($apiRequestMethod == 'POST'){
            $parameters = http_build_query($_REQUEST);
            $apiURL = $apiBaseURL . $apiPath;
            
            //build POST Request to API
            curl_setopt($apiRequest, CURLOPT_URL, $apiURL); 
            curl_setopt($apiRequest, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($apiRequest, CURLOPT_POST, true);
            curl_setopt($apiRequest, CURLOPT_HTTPGET, false);
            curl_setopt($apiRequest, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($apiRequest, CURLOPT_HTTPHEADER, $apiHeaderArray);
            curl_setopt($tokenRequest, CURLOPT_POSTFIELDS, $parameters);
        }
        
        $apiResponse = curl_exec($apiRequest);
        $apiCode = curl_getinfo($apiRequest, CURLINFO_HTTP_CODE);
        
        //check Twitter response for errors
        if ($apiResponse === FALSE || $apiCode != 200) {

            header("HTTP/1.1 $apiCode " . curl_error($apiRequest));
            print(curl_error($apiRequest) . $apiResponse);
        } 
        else {
            $contentType = curl_getinfo($apiRequest, CURLINFO_CONTENT_TYPE);
            if ($contentType) {
                header("Content-Type: " . $contentType);
            }
            print($apiResponse);//return Twitter response to Ajax call
        } 
        curl_close($apiRequest);//close connection.
    }
    curl_close($tokenRequest);//close connection.
?>