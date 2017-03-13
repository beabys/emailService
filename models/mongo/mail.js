var mongoConnection = require("./mongoDB");
/**
 * Mail Schema for MongoDB
 */
var MailSchema = mongoConnection.Schema({
    message_id : {
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

var mails = module.exports = mongoConnection.model('mails', MailSchema);

/**
 * @param newMail
 * @param callback
 */
module.exports.createMail = function(newMail, callback) {
    newMail.save(callback);
};

/**
 * @param messageID
 * @param callback
 */
module.exports.getMailbyId = function(messageID, callback) {
    var query = {message_id : messageID};
    mails.find(query, callback);
};

module.exports.updateById = function (query, update, options, callback) {
    mails.findOneAndUpdate(query, update, options, callback);
};
