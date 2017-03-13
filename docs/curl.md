#####cURL

    curl --request POST \
      --url http://host_to_request/mail \
      --header 'content-type: application/json' \
      --data '{
            "subject" : "subject",
            "content" : "message content",
            "receiver_name" : "receiver name",
            "receiver_email" : "some@email.com"
    }'