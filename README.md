Email Service
=============

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
copy the .env.example to .env anf fill the variables required for configuration

    cp /route_of_your_project/.env.example /route_of_your_project/.env
####Install Dependencies

    npm install
    
####Start Service

    npm start
    
####Start Consumer

    node bin/consumer
    
#Request
Methods available for Request : 
* POST
* GET

###Parameters
 | Parameter |  Type  | Description |
 |-----------|--------|-------------|
 | `subject` | String | Subject in the mail |
 | `content` | String | Content of the mail |
 | `receiver_name` | String | Name of the receiver |
 | `receiver_email` | String | Email |
 
#Response
###Parameters

 | Parameter | Type | Description |
 |-----------|------|-------------|
 | `SUCCESS` | Boolean | Status of the mail<br/>false : not delivered.<br/>true : delivered. |
 | `message_id` | String |  `(optional)` UUID of the message. |
 | `status` | String |  `(optional)` Status of the message. |
 | `error` | Object | Status of the message (optional) <br /> `message` : Message or the error. <br />`code` : code of the error |

###Response Codes

| Response Codes | Definition | Description |
|----------------|------------|-------------|
| 200 | OK | return Response of status ID |
| 202 | Accepted | The request has been accepted for processing |
| 400 | Bad Request | Invalid Request |
| 500 | Internal Server Error | Ups!, my fault |
 
###Example Response
####POST METHODS
#####SUCCESS 

    {
      "SUCCESS": true,
      "message_id": "UUID of message",
      "status": "status of the message Initial"
    }

#####ERROR 
######WRONG MESSAGE
    
    `{
      "SUCCESS": false,
      "status": "error",
      "errors": {
        "message": {
          "receiver_email": {
            "param": "receiver_email",
            "msg": "is not a email valid",
            "value": "beabys@gmai"
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
 