Email Service
=============
##Description of the project
* [description.md](./docs/definition.md)

##Requirements
* *Node.js*
* *RabbitMQ*
* *MongoDB*

##Mail Service Providers
* [mandrill](https://mandrillapp.com/)
* [mailgun](https://www.mailgun.com/)
* [mailjet](https://www.mailjet.com/)
* [sendgrid](https://sendgrid.com/)

#Usage
####Install Dependencies
copy the .env.example to .env and fill the variables required for configuration

    cp .env.example .env
####Install Dependencies

    npm install
    
####Start Service

    npm start
    
####Start Consumer

    node bin/consumer
    
#Request
Endpoint for Requests:
 
    http://www.beabys.xyz/mail

Methods available for Request : 
* POST
* GET


###Request Method GET

    http://www.beabys.xyz/mail/<uuid>
    
| Parameter | Description |
| --- | --- |
| UUID | ID of the mail |

###Response Method Get

| Response Codes | Definition | Description |
| --- | --- | --- |
| 200 | OK | return Response status of mail |
| 400 | Bad Request | Invalid Request |

####GET METHOD
#####SUCCESS 

    {
      "SUCCESS": true,
      "message_id": "UUID of message",
      "status": "status of the message Initial"
    }
    
#####ERROR 

    {
      SUCCESS: false,
      status: "error",
      errors: {
        message: "invalid request",
        code: 400
      }
    }

###Request Method Post
| Parameter | Type | Description |
| --- | --- | --- |
| subject | String | Subject in the mail |
| content | String | Content of the mail |
| receiver_name | String | Name of the receiver |
| receiver_email | String | Email |
| content_type | String | (optional) Content  typeof the mail <br \>default text/plain |
 
###Response Method POST

| Parameter | Type  | Description |
| --- | --- | --- |
| SUCCESS | Boolean | Status of the mail<br/>false : not delivered.<br/>true : delivered. |
| message_id | String  | (optional) UUID of the message. |
| status | String  | (optional)` Status of the message. |
| error | Object  | Status of the message (optional) <br /> `message` : Message or the error. <br />`code` : code of the error |

###Response Codes

| Response Codes | Definition | Description |
| --- | --- | --- |
| 202 | Accepted | The request has been accepted for processing |
| 400 | Bad Request | Invalid Request |
| 500 | Internal Server Error | Internal Server Error |
 
####Example Response
#####SUCCESS 

    {
      "SUCCESS": true,
      "message_id": "UUID of message",
      "status": "status of the message Initial"
    }

#####ERROR 
######WRONG MESSAGE
    
    {
      "SUCCESS": false,
      "status": "error",
      "errors": {
        "message": {
          "receiver_email": {
            "param": "receiver_email",
            "msg": "is not a valid email",
            "value": "invalid@mail"
          }
        },
        "code": 400
      }
    }
    
######INTERNAL ERROR
    {
      "SUCCESS": false,
      "status": "error",
      "errors": {
        "message": "service unavailable",
        "code": 500
      }
    }
    
####GET METHOD
#####SUCCESS 

    {
      SUCCESS: false,
      status: "initial",
      last_status_update: "2028-08-18T08:08:08.088Z"
    }
#####ERROR 
######WRONG MESSAGE
    {
      SUCCESS: false,
      status: "error",
      errors: {
        message: "invalid request",
        code: 400
      }
    }
    
######INTERNAL ERROR
    {
      SUCCESS: false,
      status: "error",
      errors: {
        message: "service unavailable"",
        code: 500
      }
    }

###Integration
####Examples
* [cURL](./docs/curl.md)
* [Go](./docs/go.md)
* [Javascript](./docs/javascript.md)
* [Node.js](./docs/node.md)
* [Php](./docs/php.md)
* [Ruby](./docs/ruby.md)

## Author

This Email Service was created by Alfonso Rodriguez ([@beabys](http://twitter.com/beabys)).
 