var mailjet = require('node-mailjet').
              connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
/**
 * Mailjet class
 * @param data
 * @constructor
 */
function Mailjet(data) {
    this.content = data.content;
    this.subject = data.subject;
    this.from_email = data.sender_email;
    this.from_name = data.sender_name;
    this.to_email = data.receiver_email;
    this.to_name = data.receiver_name;
    this.content_type = data.content_type == 'text/plain' ? 'Text-part' : 'Html-part';
}

/**
 *
 * @param response
 * @returns {{success: boolean, retry: boolean, message: string}}
 */
Mailjet.handleResponse = function(response) {
    var body = response.body;
    var result = {
        success : false,
        retry : false,
        message : 'undefined Error'
    };
    if (body.Sent && body.Sent.length > 0) {
        result.success = true;
        result.retry = false;
        result.message = body.Sent;
    }
    return result;
};

/**
 *
 * @param callback
 */
Mailjet.prototype.sendMail = function(callback) {
    //Set Data to send
    var data = {
        'FromEmail': this.from_email,
        'FromName': this.from_name,
        'Subject': this.subject,
        'Recipients': [{
            'Email': this.to_email,
            'Name': this.to_name
        }]
    };
    //add content to message
    data[this.content_type] = this.content;

    var sendEmail = mailjet.post('send');
    sendEmail
        .request(data)
        .then(function (response) {
            callback(Mailjet.handleResponse(response))
        })
        .catch(function(e) {
            callback({
                success : true,
                retry : false,
                message : e
            });
        });
};

module.exports = Mailjet;