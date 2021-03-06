var mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

/**
 * Mailgun class
 * @param data
 * @constructor
 */
function Mailgun(data) {
    this.from_name = data.sender_name;
    this.from_email = data.sender_email;
    this.to_email = data.receiver_email;
    this.subject = data.subject;
    this.content = data.content;
}

/**
 *
 * @param error
 * @param response
 * @returns {{success: boolean, retry: boolean, message: string}}
 */
Mailgun.handleResponse = function(error, response) {
    var result = {
        success : true,
        retry : false,
        message : ''
    };
    if (error) {
        result.success = false;
        result.retry = true;
        result.message = response.message;
    }
    return result;
};
/**
 *
 * @param callback
 */
Mailgun.prototype.sendMail = function (callback) {
    //Set Data to send
    var data = {
        from: this.from_name  + ' <' + this.from_email + '>',
        to: this.to_email,
        subject: this.subject,
        text: this.content
    };

    //send email to mailgun
    mailgun.messages().send(data, function (err, response) {
        var result = Mailgun.handleResponse(err, response);
        callback(result);
    });
};

module.exports = Mailgun;