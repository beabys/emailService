#####PHP

    <?php
    
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_PORT => "port",
      CURLOPT_URL => "http://host_to_request/mail",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => "{\n        \"subject\" : \"subject\",\n        \"content\" : \"message content\",\n        \"receiver_name\" : \"receiver name\",\n        \"receiver_email\" : \"some@email.com\"\n}",
      CURLOPT_HTTPHEADER => array(
        "content-type: application/json"
      ),
    ));
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
    
    if ($err) {
      echo "cURL Error #:" . $err;
    } else {
      echo $response;
    }