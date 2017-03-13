#####Node

    var http = require("http");
    
    var options = {
      "method": "POST",
      "hostname": "host_to_request",
      "port": "port",
      "path": "/mail",
      "headers": {
        "content-type": "application/json"
      }
    };
    
    var req = http.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    
    req.write(JSON.stringify({ subject: 'subject',
      content: 'message content',
      receiver_name: 'receiver name',
      receiver_email: 'some@email.com' }));
    req.end();

