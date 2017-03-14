var amqp = require('amqplib/callback_api');
/**
 * amqp connection
 * @param cb
 */
module.exports = function(cb) {
    var config = process.env;
    var userPass = config.RABBITMQ_USER != '' && config.RABBITMQ_PASSWORD ?
        config.RABBITMQ_USER + ':' + config.RABBITMQ_PASSWORD + '@' : '';
    var port = config.RABBITMQ_PORT != ''  ? ':' + config.RABBITMQ_PORT : '';

    amqp.connect('amqp://' + userPass + config.RABBITMQ_HOST + port, function(err, conn) {
        if (err) {
            throw new Error(err);
        }
        cb(conn);
    });
};