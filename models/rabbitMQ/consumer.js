var dotenv = require('dotenv');
dotenv.config();
var mailEntry = require('../../models/mongo/mail');
var mailHistory = require('../../models/mongo/mailHistory');
var mailProvider = require("../../services/mail/adapter");
var producer = require('./producer');

/**
 * handle errors
 * @param err
 */
var handleErrors = function(err)
{
    console.error(err);
    process.exit(1);
};

/**
 * @param data
 * @param servicesToUse
 * @returns {*}
 */
var getServiceToUse = function (data, servicesToUse)
{
    var servicesUsed = [];
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            servicesUsed.push(data[i].provider);
        }
        for (var used in servicesUsed) {
            var service = servicesUsed[used];
            if (servicesToUse.includes(service) ) {
                var index = servicesToUse.indexOf(service);
                servicesToUse.splice(index, 1);
            }
        }
    }
    return servicesToUse;
};

/**
 * @param provider
 * @param data
 * @param rabbit
 */
var sendMail = function(provider, data, rabbit)
{
    //update variables mail Entry
    var query = { message_id: data.message_id };
    var update  = { status: "executed" };
    var options = { new: true };
    var emailProvider = new mailProvider(provider).getProvider(data);
    emailProvider.sendMail(function (result) {
        var newHistoryEntry = {
            message_id: data.message_id,
            provider: provider,
            data_raw: JSON.stringify(data),
            service_response : JSON.stringify(result),
            result : result.success
        };
        //save response in database
        var newMailEntry = new mailHistory(newHistoryEntry);
        mailHistory.createEntry(newMailEntry, function (err) {
            if (err) {
                console.error(err);
            }
        });
        if (result.success == false) {
            //update in mailEntry not processed
            update  = { status: "not Send" };
            mailEntry.updateById(query, update, options, function (err, history) {
                if (err) {
                    console.error(err);
                }
            });
            if (result.retry == true) {
                producer(data, rabbit);
            }
        } else {
            //update in mailEntry status success
            mailEntry.updateById(query, update, options, function (err, history) {
                if (err) {
                    console.error(err);
                }
            });
        }
    });
};

/**
 * @param msg
 * @param rabbit
 * @param services
 */
var handleMessage = function(msg, rabbit, services)
{
    var data = JSON.parse(msg.content.toString());
    //update to processing status
    var query = { message_id: data.message_id };
    var update  = { status: "processing" };
    var options = { new: true };
    mailEntry.updateById(query, update, options, function (err, history) {
        if (err) {
            console.error(err);
        }
    });
    mailHistory.getMailEntrybyId(data.message_id, function (err, history) {
        // first check if exist intents and services availbles to send
        var serviceToUse = getServiceToUse(history, services);
        if (serviceToUse.length > 0) {
            var emailProvider = serviceToUse.shift();
            sendMail(emailProvider, data, rabbit);
        }
    });
};

/**
 * @param rabbit
 */
var consumer = function (rabbit)
{
    try {
        var q = process.env.RABBITMQ_QUEUE;
        rabbit(function (conn) {
            conn.createChannel(on_open);
            function on_open(err, ch) {
                if (err != null) handleErrors(err);
                ch.assertQueue(q);
                //ch.prefetch(1);
                ch.consume(q, function (msg) {
                    if (msg !== null) {
                        var servicesAvailable = process.env.MAIL_PROVIDERS.split(',');
                        handleMessage(msg, rabbit, servicesAvailable);
                        ch.ack(msg);
                    }
                });
            }
        });
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
};

/**
 * @type {consumer}
 */
module.exports = consumer;