var mongoConnection = require("./mongoDB");
/**
 * Mail Schema for MongoDB
 */
var MailHistorySchema = mongoConnection.Schema({
    message_id : {
        type: String,
        index: true
    },
    provider : {
        type: String,
        index: true
    },
    data_raw : {
        type: String
    },
    service_response : {
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

var history = module.exports = mongoConnection.model('mail_history', MailHistorySchema);

/**
 * Create Email
 * @param data
 * @param callback
 */
module.exports.createEntry = function (newEntry, callback) {
    newEntry.save(callback);
};


/**
 * @param messageID
 * @param callback
 */
module.exports.getMailEntrybyId = function(messageID, callback) {
    var query = {message_id : messageID};
    history.find(query, callback);
};
