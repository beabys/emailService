##### Javascript

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://host_to_request/mail",
      "method": "POST",
      "headers": {
        "authorization": "Basic <user:password base64 encode>"
        "content-type": "application/json"
      },
      "processData": false,
      "data": "{\n        \"subject\" : \"subject\",\n        \"content\" : \"message content\",\n        \"receiver_name\" : \"receiver name\",\n        \"receiver_email\" : \"some@email.com\"\n}"
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
 