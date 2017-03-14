var router = require('express').Router();
var uuidV4 = require("uuid/v4");
var mail = require('../models/mongo/mail');
var rabbit = require("../models/rabbitMQ/rabbitMQ");
var producer = require("../models/rabbitMQ/producer");

/**
 * GET mail listing
 */
router.get('/', function(req, res, next) {
    res.removeHeader("X-Powered-By");
    res.status(400);
    res.json({
        SUCCESS: false,
        status: "error",
        errors: {message : "invalid request", code : 400}
    });
});

/**
 * GET mail status listing
 */
router.get('/:id', function(req, res, next) {
    res.removeHeader("X-Powered-By");
    mail.getMailbyId(req.params.id, function (err, mailEntry) {
        if (err) {
            res.status(500);
            res.json({
                SUCCESS: false,
                status: "error",
                errors: {message : "service unavailable", code : 500}
            });
        } else {
            if (mailEntry.length > 0) {
                res.status(202);
                res.json({
                    SUCCESS: true,
                    status: mailEntry[0].status,
                    last_status_update : mailEntry[0].updated_at
                });
            } else {
                res.status(400);
                res.json({
                    SUCCESS: false,
                    status: "error",
                    errors: {message : "invalid request", code : 400}
                });
            }
        }
    });
});

/**
 * Post mail listing
 */
router.post("/", function (req, res, next) {
    res.removeHeader("X-Powered-By");
    //validation of fields
    req.checkBody('content', 'message is required').notEmpty();
    req.checkBody('receiver_name', 'receiver_name is required').notEmpty();
    req.checkBody('receiver_email', 'receiver_email is required ').notEmpty();
    req.checkBody('receiver_email', 'is not a valid email').isEmail();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty())  {
            var errors = result.useFirstErrorOnly().mapped();
            res.status(400);
            res.json({
                SUCCESS: false,
                status: "error",
                errors: {message : errors, code : 400}
            });

        } else {
            //if no errors on validation
            try {
                var dataValue = req.body;
                //create data message
                var data = {
                    message_id : uuidV4(),
                    sender_email : process.env.MAIL_SENDER_EMAIL,
                    sender_name : process.env.MAIL_SENDER_NAME,
                    content : dataValue.content,
                    content_type : dataValue.content_type || dataValue.content_type != undefined ?
                        dataValue.content_type :
                        'text/plain',
                    subject : dataValue.subject || dataValue.subject != undefined ? dataValue.subject : '',
                    receiver_name : dataValue.receiver_name,
                    receiver_email : dataValue.receiver_email,
                    status : "initial"
                };
                var newMail = new mail(data);
                mail.createMail(newMail, function (err, mail) {
                    if (err) {
                        console.error(err);
                        res.status(400);
                        res.json({
                            SUCCESS:false,
                            status: "error",
                            errors: {message :"service unavailable in this moment", code : 400}
                        });
                    } else {
                        //send message to queue
                        producer(data, rabbit);
                        res.status(202);
                        var urlLocation = req.protocol + '://' + req.get('host') + '/mail/' + mail.message_id;
                        res.setHeader('Location' , urlLocation );
                        //res.location("/mail/" + mail.message_id);
                        res.json({
                            SUCCESS : true,
                            message_id : mail.message_id,
                            status : "initial"
                        });
                    }
                });
            } catch (err) {
                console.error(err);
                res.status(400);
                res.json({
                    SUCCESS:false,
                    status: "error",
                    errors: {message : "service unavailable in this moment", code : 400}
                });
            }
        }
    });
});


module.exports = router;
