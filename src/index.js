const amqp = require('amqplib');
const logger = require('winster').instance();

class AmqplibSugar {


  /**
   * Post a message to RabbitMq.
   * @param {object} opts - Configuration to use to publish a message.
   * @param {object} opts.server - RabbitMQ server. If a string is passed, it's just the URI.
   * @param {object} opts.exchange - Information about the exchange.
   * @param {string} opts.exchange.type - 'topic', 'direct'
   * @param {string} opts.exchange.name - Name of the exchange.
   * @param {string} opts.key - Key to publish the message.
   * @param {object} opts.message - The message to post.
   */
  static publishMessage(opts) {
    return amqp.connect(opts.server)
      .then(conn => {
        conn.createChannel()
          .then(ch => {
            ch.assertExchange(opts.exchange.name, opts.exchange.type, {durable: true});
            ch.publish(opts.exchange.name, opts.key, encode(opts.message));
            logger.debug(" [x] Sent %s:'%s'", opts.key, JSON.stringify(opts.message, null)); // eslint-disable-line quotes
            setTimeout(() => {
              conn.close();
              logger.debug('publishMessage: Connection closed');

            }, 500);
          });
      });
  }
}

module.exports = AmqplibSugar;
