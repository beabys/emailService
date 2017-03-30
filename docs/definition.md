Email Service
=============

## Requirements
* *RabbitMQ*
* *MongoDB*

## Project structure
    Email Service
    ├── .env.example
    ├── README.md
    ├── app.js
    ├── bin
    │   ├── consumer
    │   └── www
    ├── docs
    │   ├── curl.md
    │   ├── definition.md
    │   ├── go.md
    │   ├── javascript.md
    │   ├── node.md
    │   ├── php.md
    │   └── ruby.md
    ├── models
    │   ├── mongo
    │   │   ├── mail.js
    │   │   ├── mailHistory.js
    │   │   └── mongoDB.js
    │   └── rabbitMQ
    │       ├── consumer.js
    │       ├── producer.js
    │       └── rabbitMQ.js
    ├── package.json
    ├── public
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    │       ├── bootstrap.min.css
    │       ├── bootstrap-theme.min.css
    │       └── style.css
    ├── routes
    │   ├── index.js
    │   └── mail.js
    ├── services
    │   └── mail
    │       ├── adapter.js
    │       ├── mailgunAdapter.js
    │       ├── mailjetAdapter.js
    │       ├── mandrillAdapter.js
    │       ├── sendgridAdapter.js
    │       └── test.js
    ├── test
    │   ├── index.js
    │   ├── mail.js
    │   └── mailServices.js
    └── views
        ├── error.pug
        ├── index.pug
        └── layout.pug


## Modules used
Some of non standard modules used:
* [express](https://www.npmjs.com/package/express)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express-validator](https://www.npmjs.com/package/express-validator)
* [mailgun-js](https://www.npmjs.com/package/mailgun-js)
* [mandrill-api](https://www.npmjs.com/package/mandrill-api)
* [mongodb](https://www.npmjs.com/package/mongodb)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [node-mailjet](https://www.npmjs.com/package/node-mailjet)
* [sendgrid](https://www.npmjs.com/package/sendgrid)
* [uuid](https://www.npmjs.com/package/uuid)
* [amqplib](https://www.npmjs.com/package/amqplib)


## Service EndPoint

    http://<yourhost>:3000/mail/api/v1

Enjoy this code...