/**
 * test model class
 * @param data
 * @constructor
 */
function TestDb(data){}

/**
 * method save
 */
TestDb.prototype.save = function(callback) {
    var id = Math.floor(Math.random() * (100000));
    callback(null,{_id:id, body:'Hello, world!'});
};

/**
 * @type {TestDb}
 */
module.exports = TestDb;
