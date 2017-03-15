Email Service
=============
##Definition of Done
Create a service that accepts the necessary information and sends emails. It
should provide an abstraction between two different email service providers.
If one of the services goes down, your service can quickly failover to
a different provider without affecting your customers.

Example Email Providers:

* [SendGrid](https://sendgrid.com/user/signup) - [Simple Send Documentation](https://sendgrid.com/docs/API_Reference/Web_API/mail.html)
* [Mailgun](http://www.mailgun.com) - [Simple Send Documentation](http://documentation.mailgun.com/quickstart.html#sending-messages)
* [Mandrill](https://mandrillapp.com) - [Simple Send Documentation](https://mandrillapp.com/api/docs/messages.JSON.html#method-send)
* [Amazon SES](http://aws.amazon.com/ses/) - [Simple Send Documentation](http://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html)

All listed services are free to try and are pretty painless to sign up for, so
please register your own test accounts on each.

##Requirements
* *RabbitMQ*
* *MongoDB*

##Project structure
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

##Technologies used in this project
* Docker containers 
* Capistrano
* Node.Js
* RabbitMQ
* MongoDB

## MY PROFILE

I'm Alfonso, i was working for several years like a software developer, using 
PHP as my principal Programing Language, for this project i decide to use Node.js 
like a new challenge for me.


Enjoy this code...