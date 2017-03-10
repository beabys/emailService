var mandrill = require('./mandrill');
var mailgun = require('./mailgun');
var sendgrid = require('./sendgrid');
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
        case "mandrill":
            return new mandrill(data);
        case "mailgun":
            return new mailgun(data);
        case "sendgrid":
            return new sendgrid(data);
        case "test":
            return new test(data);
        default:
            throw ('no database implemented');
    }
};

/**
 * @type {Provider}
 */
module.exports = Adapter;
