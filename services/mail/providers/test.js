/**
 * test provider class
 * @param data
 * @constructor
 */
function TestProvider(data){}

/**
 * saveMail
 * @param callback
 */
TestProvider.prototype.sendMail = function (callback) {
    callback({
        success : true,
        retry : true,
        message : ''
    });
};

/**
 * @type {TestProvider}
 */
module.exports = TestProvider;
