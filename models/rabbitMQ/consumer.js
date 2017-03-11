var dotenv = require('dotenv');
dotenv.load();
var mailProvider = require("../../services/mail/providers/adapter")
var mailService = require("../../services/mail/provider");
/**
 * handle errors
 * @param err
 */
var handleerrors = function(err) {
    console.error(err);
    process.exit(1);
};

/**
 * @param rabbit
 */
var consumer = function (rabbit) {
    var q = process.env.RABBITMQ_QUEUE;
    rabbit(function(conn) {
        conn.createChannel(on_open);
        function on_open(err, ch) {
            if (err != null) handleerrors(err);
            ch.assertQueue(q);
            ch.consume(q, function(msg) {
                if (msg !== null) {
                    var data = JSON.parse(msg.content.toString());
                    var provider = new mailProvider(data.provider).getProvider(data);
                    var service = new mailService(provider);
                    service.sendMail(function (result) {
                        //@TODO updatedb
                        console.log(result);
                    });
                    ch.ack(msg);
                }
            });
        }
    });
};

module.exports = consumer;