var dotenv = require('dotenv');
dotenv.load();
process.env.SENDGRID_API_KEY ='fake_key';
process.env.MAILGUN_API_KEY="key-super-fake";
process.env.MAILGUN_DOMAIN="ofcourseisface";
process.env.MAILJET_API_KEY="key-super-fake";
process.env.MAILJET_API_SECRET="ofcourseisface";
process.env.MANDRILL_API_KEY="aNd-is-Fake-Too";
var nock = require('nock');
var sendgridAdapter = require('../services/mail/sendgridAdapter');
var mailgunAdapter = require('../services/mail/mailgunAdapter');
var mailjetAdapter = require('../services/mail/mailjetAdapter');
var mandrillAdapter = require('../services/mail/mandrillAdapter');
var expect = require('chai').expect;

var data = {
    sender_email : "test@test.tst",
    sender_name : "test",
    receiver_email : "test@test.tst",
    receiver_name : "test",
    subject : "test",
    content_type : "plain/text",
    content : "test"
};

describe("Testing sendgrid API", function () {

    it("returns a successful mocked response for sendgrid", function (done) {

        //specify the url to be intercepted
        nock("https://api.sendgrid.com/v3/mail/send")
        //define the method to be intercepted
            .post('')
            .reply(200, {
                statusCode: 200,
                message: "This is a mocked response"
            });
        var sendgrid = new sendgridAdapter(data);
        sendgrid.sendMail(function (res) {
            expect(res.success).to.equal(true);
            done();
        });
    })
});

describe("Testing mailgun API", function () {

    it("returns a successful mocked response for mailgun", function (done) {

        //specify the url to be intercepted
        nock("https://api.mailgun.net/v3/" + process.env.MAILGUN_DOMAIN + "/messages")
        //define the method to be intercepted
            .post('')
            .reply(200,{
                    Error: 'error',
                    message :"This is a mocked response"
                });

        var mailgun = new mailgunAdapter(data);
        mailgun.sendMail(function (res) {
            expect(res.success).to.equal(true);
            done();
        });
    })
});

describe("Testing mailjet API", function () {

    it("returns a successful mocked response for mailjet", function (done) {
        //specify the url to be intercepted
        nock("https://api.mailjet.com/v3/send")
        //define the method to be intercepted
            .post('')
            .reply(200,JSON.stringify({
                Sent: [{
                    Email: "test@test.tst",
                    MessageID: 1234567890
                }]
            }));

        var mailjet = new mailjetAdapter(data);
        mailjet.sendMail(function (res) {
            expect(res.success).to.equal(true);
            done();
        });
    })
});


describe("Testing mandrill API", function () {

    it("returns a successful mocked response for mandrill", function (done) {
        //specify the url to be intercepted
        nock("https://mandrillapp.com/api/1.0/messages/send.json")
        //define the method to be intercepted
            .post('')
            .reply(200, {
                0:{
                    status: "sent",
                    message: "This is a mocked response"
                }
            });

        var mandrill = new mandrillAdapter(data);
        mandrill.sendMail(function (res) {
            expect(res.success).to.equal(true);
            done();
        });
    })
});