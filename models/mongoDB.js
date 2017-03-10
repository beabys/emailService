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
var db = mongoose.connection;

/**
 * Mail Schema for MongoDB
 */
var MailSchema = mongoose.Schema({
    message_id : {
        type: String,
        index: true
    },
    provider : {
        type: String,
        index: true
    },
    sender_email : {
        type: String
    },
    sender_name : {
        type: String
    },
    content : {
        type: String
    },
    subject : {
        type: String
    },
    content_type : {
        type: String
    },
    receiver_name : {
        type: String
    },
    receiver_email : {
        type: String
    },
    status : {
        type: String,
        index: true
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    updated_at : {
        type: Date,
        default: Date.now
    }
});

var MongoDb = module.exports = mongoose.model('mails', MailSchema);