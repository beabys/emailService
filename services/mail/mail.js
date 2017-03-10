/**
 * Class Mail
 * @constructor
 */
function Mail(adapter){
    this.adapter = adapter;
}

/**
 * Save Mail Data
 * @param callback
 */
Mail.prototype.saveMail = function(callback) {
    this.adapter.save(callback);
};

module.exports = Mail;