Email Service
=============
## Description of the project

* [definition.md](./docs/definition.md)

## Prerequisites
* [Node.js](https://nodejs.org)
* [RabbitMQ](https://www.rabbitmq.com/)
* [MongoDB](https://www.mongodb.com/)

## Mail Service Providers
* [mandrill](https://mandrillapp.com/)
* [mailgun](https://www.mailgun.com/)
* [mailjet](https://www.mailjet.com/)
* [sendgrid](https://sendgrid.com/)

# Installing
### Set configurations

copy the .env.example to .env and fill the variables required for configuration

    cp .env.example .env

### Install Dependencies

    npm install

### Start Service

    npm start

### Start Consumer

    node bin/consumer

## Running the test

    npm test

# Request

Endpoint for Requests:

    http://yourhost:port/mail/api/v1


Methods available for Request : 

* POST
* GET


## Request Method GET

    http://yourhost:port/mail/api/v1/<uuid>

| Parameter | Description |
| --- | --- |
| UUID | ID of the mail |


## Response Method Get


| Response Codes | Definition | Description |
| --- | --- | --- |
| 200 | OK | Return Response status of mail |
| 400 | Bad Request | Invalid Request |

## GET METHOD
###### SUCCESS

    {
      "SUCCESS": true,
      "message_id": "UUID of message",
      "status": "status of the message Initial"
    }

###### ERROR

    {
      SUCCESS: false,
      status: "error",
      errors: {
        message: "invalid request",
        code: 400
      }
    }

###### INTERNAL ERROR
    {
      SUCCESS: false,
      status: "error",
      errors: {
        message: "service unavailable"",
        code: 500
      }
    }

## Request Method Post

| Parameter | Type | Description |
| --- | --- | --- |
| subject | String | Subject in the mail |
| content | String | Content of the mail |
| receiver_name | String | Name of the receiver |
| receiver_email | String | Email |
| content_type | String | (optional) Content  typeof the mail <br \>default text/plain |


## Response Method POST

| Parameter | Type  | Description |
| --- | --- | --- |
| SUCCESS | Boolean | Status of the mail<br/>false : not delivered.<br/>true : delivered. |
| message_id | String  | (optional) UUID of the message. |
| status | String  | (optional)` Status of the message. |
| error | Object  | Status of the message (optional) <br /> `message` : Message or the error. <br />`code` : code of the error |

## Response Codes

| Response Codes | Definition | Description |
| --- | --- | --- |
| 202 | Accepted | The request has been accepted for processing |
| 400 | Bad Request | Invalid Request |
| 500 | Internal Server Error | Internal Server Error |

## Example Response
###### SUCCESS 

    {
      "SUCCESS": true,
      "message_id": "UUID of message",
      "status": "status of the message Initial"
    }

#### ERROR 
###### WRONG MESSAGE

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
    
###### INTERNAL ERROR
    {
      "SUCCESS": false,
      "status": "error",
      "errors": {
        "message": "service unavailable",
        "code": 500
      }
    }

### Integration
#### Examples
* [cURL](./docs/curl.md)
* [Go](./docs/go.md)
* [Javascript](./docs/javascript.md)
* [Node.js](./docs/node.md)
* [Php](./docs/php.md)
* [Ruby](./docs/ruby.md)

you can test the service leaving a message in this url

    http://www.alfonsorodriguez.xyz/contact

## Author

This Email Service was created by Alfonso Rodriguez ([@beabys](http://twitter.com/beabys)).
