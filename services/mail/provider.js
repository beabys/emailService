/**
 * Class Mail
 * @constructor
 */
function Provider(adapter){
    this.adapter = adapter;
}

/**
 * Save Mail Data
 * @param callback
 */
Provider.prototype.sendMail = function(callback) {
    this.adapter.sendMail(callback);
};

module.exports = Provider;