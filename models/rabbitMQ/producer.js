/**
 * @param data
 * @param rabbit
 */
var producer = function (data, rabbit) {
    data = JSON.stringify(data);
    rabbit(function(conn) {
        conn.createChannel(function(err, ch) {
            var q = process.env.RABBITMQ_QUEUE;
            ch.assertQueue(q, {durable: true, noAck: true});
            ch.sendToQueue(q, new Buffer(data));
        });
        setTimeout(function() { conn.close()}, 500);
    });
};

module.exports = producer;