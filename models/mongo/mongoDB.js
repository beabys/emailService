var mongoose = require("mongoose");

/**
 * return string for mongo connection taking the .env variables
 * @returns {string}
 */
var stringConnection = function(){
    var userPass = '';
    if (process.env.MONGODB_USER != '' && process.env.MONGODB_PASSWORD != '') {
        userPass = process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@';
    }
    return  'mongodb://' + userPass +
            process.env.MONGODB_HOST +
            ':' + process.env.MONGODB_PORT +
            '/' + process.env.MONGODB_DATABASE;
};
mongoose.Promise = global.Promise;
mongoose.connect(stringConnection());
var connection = module.exports = mongoose;
var db = mongoose.connection;
