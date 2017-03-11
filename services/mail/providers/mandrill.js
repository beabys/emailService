var mandrill = require("mandrill-api");

/**
 * Mandrill class
 * @param data
 * @constructor
 */
function MandrillMail(data) {
    this.content = data.content;
    this.subject = data.subject;
    this.from_email = data.sender_email;
    this.from_name = data.sender_name;
    this.to_email = data.receiver_email;
    this.to_name = data.receiver_name;
    this.to_type = "to"
}

/**
 *
 * @param response
 * @returns {{success: boolean, retry: boolean, message: string}}
 */
MandrillMail.handleResponse = function(response) {
    var dataResult = response[0];
    var result = {
        success : true,
        retry : false,
        message : ''
    };
    if (dataResult.status && dataResult.status != "sent") {
        result.success = false;
        result.retry = false;
        result.message = dataResult.status + ' : ' + response.message;
    }
    return result;
};

/**
 *
 * @param callback
 */
MandrillMail.prototype.sendMail = function (callback) {
    var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);
    var async = false;
    var ip_pool = "Main Pool";
    var date = Date(Date.now());
    var send_at = date.toString();
    //Set Data to send
    var message = {
        "text": this.content,
        "subject": this.subject,
        "from_email": this.from_email,
        "from_name": this.from_name,
        "to": [{
            "email": this.to_email,
            "name": this.to_name,
            "type": this.to_type
        }]
    };
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
        callback(MandrillMail.handleResponse(result));
    }, function(e) {
        callback({
            success : false,
            retry : false,
            message : e
        });
    });
};


module.exports = MandrillMail;