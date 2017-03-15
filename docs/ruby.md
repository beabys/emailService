##### Ruby

    require 'uri'
    require 'net/http'
    
    url = URI("http://host_to_request/mail")
    
    http = Net::HTTP.new(url.host, url.port)
    
    request = Net::HTTP::Post.new(url)
    request["authorization"] = 'Basic <user:password base64 encode>'
    request["content-type"] = 'application/json'
    request.body = "{\n        \"subject\" : \"subject\",\n        \"content\" : \"message content\",\n        \"receiver_name\" : \"receiver name\",\n        \"receiver_email\" : \"some@email.com\"\n}"
    
    response = http.request(request)
    puts response.read_body
   