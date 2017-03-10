var sendgrid = require('sendgrid').mail;
var sg = require('sendgrid')("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");

/**
 * Sendgrid class
 * @param data
 * @constructor
 */
function Sendgrid(data) {

    /**
     * @type {SendGrid.Helpers.Mail.Email}
     */
    this.from_email = new sendgrid.Email(data.sender_email);

    /**
     * @type {SendGrid.Helpers.Mail.Email}
     */
    this.to_email = new sendgrid.Email(data.receiver_email);

    /**
     * @type {*}
     */
    this.subject = data.subject;

    /**
     * @type {SendGrid.Helpers.Mail.Content}
     */
    this.content = new sendgrid.Content(data.content_type, data.content);

}

/**
 * @param response
 * @returns {{success: boolean, retry: boolean, message: string}}
 */
Sendgrid.handleResponse = function(response) {
    var error = this.mapResponse(response.statusCode);
    var result = {
        success : true,
        retry : false,
        message : ''
    };
    if (error && error.error == "server") {
        result.success = false;
        result.retry = true;
        result.message = "error by SendGrid"
    }
    if (error && error.error == "data") {
        result.success = false;
        result.retry = false;
        result.message = "error in request"
    }
    return result;
};

/**
 * @param response
 * @returns {*}
 */
Sendgrid.mapResponse = function (response) {
    var dataError = [
        400, 401, 403, 404, 405, 413, 429
    ];
    var serverError = [
        500, 503
    ];
    if (serverError.indexOf(response) >= 0) {
        return {error: "server"};
    }
    if (dataError.indexOf(response) >= 0) {
        return{error: "data"};
    }
    return false;
};

/**
 * Function to Send Mail
 * @param callback
 */
Sendgrid.prototype.sendMail = function (callback) {
    var mail = new sendgrid.Mail(
        this.from_email,
        this.subject,
        this.to_email,
        this.content
    );
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    sg.API(request, function(error, response) {
        var result = Sendgrid.handleResponse(response);
        callback(result);
    });
};

module.exports = Sendgrid;