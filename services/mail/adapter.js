var mailgun = require('./mailgunAdapter');
var mailjet = require('./mailjetAdapter');
var mandrill = require('./mandrillAdapter');
var sendgrid = require('./sendgridAdapter');
var test = require('./test');

/**
 * Class Provider
 * @constructor
 */
function Adapter(provider){
    this.provider = provider;
}

/**
 * Method to get the Adapter
 * @returns {*}
 */
Adapter.prototype.getProvider = function(data) {
    switch (this.provider) {
        case "mailgun":
            return new mailgun(data);
        case "mailjet":
            return new mailjet(data);
        case "mandrill":
            return new mandrill(data);
        case "sendgrid":
            return new sendgrid(data);
        case "test":
            return new test(data);
        default:
            throw ('no Email Service implemented');
    }
};

/**
 * @type {Adapter}
 */
module.exports = Adapter;
