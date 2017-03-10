var mongoDB = require("./mongoDB");
var testDB = require("./test");

/**
 * class MailAdapter
 * @param adapter
 * @constructor
 */
function MailAdapter(adapter){
    this.adapter = adapter;
}

/**
 * Method to get the Adapter
 * @returns {*}
 */
MailAdapter.prototype.getAdapter = function(data) {
    switch (this.adapter) {
        case "mongodb":
            return new mongoDB(data);
        case "test":
            return new testDB(data);
        default:
            throw ('no database implemented');
    }
};

/**
 * @type {MailAdapter}
 */
module.exports = MailAdapter;
