var express = require('express');
var router = express.Router();
var uuidV4 = require("uuid/v4");
var mail = require('../services/mail/mail');
var adapter = require("../models/adapter");

/**
 * GET mail listing
 */
router.get('/', function(req, res, next) {
  res.json('respond with a json');
});

/**
 * Post mail listing
 */
router.post("/", function (req, res, next) {
    req.checkBody('content', 'message is required').notEmpty();
    req.checkBody('receiver_name', 'receiver_name is required').notEmpty();
    req.checkBody('receiver_email', 'receiver_email is required ').notEmpty();
    req.checkBody('receiver_email', 'is not a email valid').isEmail();
    req.getValidationResult().then(function(result) {
        if (!result.isEmpty())  {
            var errors = result.useFirstErrorOnly().mapped();
            res.status(400);
            res.json({
                SUCCESS: false,
                errors: errors
            });

        } else {
            try {
                var dataValue = req.body;
                var data = {
                    message_id : uuidV4(),
                    provider : dataValue.provider || dataValue.provider != undefined ?
                        dataValue.provider :
                        process.env.MAIL_PROVIDER,
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
                var db = new adapter(process.env.DATABASE).getAdapter(data);
                var newMail = new mail(db);
                newMail.saveMail(function (err, mail) {
                    if (err) {
                        console.error(err);
                        res.status(400);
                        res.json({
                            SUCCESS:false,
                            error: "service unavailable in this moment"
                        });
                    } else {
                        res.status(201);
                        res.json({
                            SUCCESS:true,
                            id: mail._id
                        });
                    }
                });
            } catch (err) {
                console.error(err);
                res.status(400);
                res.json({
                    SUCCESS:false,
                    error: "service unavailable in this moment"
                });
            }
        }
    });
});


module.exports = router;
