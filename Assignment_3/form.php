<?php
    //$name = 1;
    
    //print 
    #print
    //echo 'Hello ' . $name. "<br/>";
    //print ('Hello' . $name);

    $first =$_REQUEST['first'];
    print("$first <br/>");
    $last = $_REQUEST['last'];
    
    $state = $_REQUEST['state'];
    
    $zip = $_REQUEST['zip'];
    $state = $_REQUEST['state'];
    //echo $first;
    print('<pre>');
    print_r($_REQUEST);
    print('</pre>');

?>


<?php
        $email;$comment;$captcha;
        if(isset($_POST['firstName'])){
          $firstName=$_POST['firstName'];
        }
        if(isset($_POST['lastName'])){
          $email=$_POST['lastName'];
        }
        if(isset($_POST['inputEmail'])){
          $email=$_POST['inputEmail'];
        }if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
        }
        if(isset($_POST['inputTelephone'])){
          $email=$_POST['inputTelephone'];
        }
        if(isset($_POST['inputCity'])){
          $email=$_POST['inputCity'];
        }
        if(isset($_POST['state'])){
          $email=$_POST['state'];
        }
        if(isset($_POST['inputZipCode'])){
          $email=$_POST['inputZipCode'];
        }
        if(!$captcha){
          echo '<h2>Please check the the captcha form.</h2>';
          exit;
        }
        $secretKey = "Put your secret key here";
        $ip = $_SERVER['REMOTE_ADDR'];
        $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
        $responseKeys = json_decode($response,true);
        if(intval($responseKeys["success"]) !== 1) {
          echo '<h2>You are spammer ! Get the @$%K out</h2>';
        } else {
          echo '<h2>Thanks for posting comment.</h2>';
        }
?>


 
