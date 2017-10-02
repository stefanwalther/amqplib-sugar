const amqp = require('amqplib');
const logger = require('winster').instance();
// Todo: Need to be removed from scheduler-service as soon as migrated to amqplib-sugar
const promiseRetry = require('promise-retry');

function encode(doc) {
  return new Buffer(JSON.stringify(doc));
}

/**
 * Sugar methods to work with amqplib.
 */
class AmqpSugarLib {

  /**
   * RabbitMQ Server definition.
   *
   * @typedef {string} rabbitConnectionDef - Connection string of the server.
   */

  /**
   * Retry behavior in case RabbitMQ is not available.
   *
   * @typedef {object} retryBehavior
   *
   * @property {number} retries - The maximum amount of times to retry the operation. Defaults to 10.
   *
   * @property {boolean} enabled - Whether retry is enabled at all or not (defaults to true); setting to false is equal to keeping {@link retryBehavior} empty.
   * @property {number} interval - Interval in ms.
   * @property {number} times - Amount of times the given operation should be retried.
   * @readonly
   * @property {number} attempts - Readonly, current amount of attempts.
   */

  /**
   * Post a message to RabbitMq.
   *
   * @param {object} opts - Configuration to use to publish a message.
   * @param {object} opts.server - RabbitMQ server. If a string is passed, it's just the URI.
   * @param {object} opts.exchange - Information about the exchange.
   * @param {string} opts.exchange.type - 'topic', 'direct'
   * @param {string} opts.exchange.name - Name of the exchange.
   * @param {string} opts.key - Key to publish the message.
   * @param {object} opts.payload - The message to post.
   * @param {Object} opts.options - Options to publish.
   * @param {string} opts.correlationId - RabbitMQ's correlationId.
   * @param {retryBehavior} opts.retry_behavior - Retry behavior.
   *
   * @returns {Promise}
   */
  static publishMessage(opts) {
    return AmqpSugarLib.connect(opts)
      .then(conn => {
        conn.createChannel()
          .then(ch => {
            ch.assertExchange(opts.exchange.name, opts.exchange.type, {durable: true});
            ch.publish(opts.exchange.name, opts.key, encode(opts.payload), opts.options);
            logger.verbose(` [x] Sent ${opts.key}: ${JSON.stringify(opts.payload, null)}`);

            // Todo: Not clear, why we need a setTimeout here ...
            setTimeout(() => {
              conn.close();
              logger.verbose('publishMessage: Connection closed');
            }, 500);
          });
      });
  }

  /**
   * Subscribe to a message.
   *
   * @param opts
   */
  // static subscribeMessage(opts) {
  //
  // }

  /**
   * Connect to RabbitMQ.
   *
   * Very similar to amqp.connect, but with the big difference, that if the connection
   * fails, the operation will retry as defined in opts.retry_behavior
   *
   * @param {rabbitConnectionDef} opts.server - Connection information for the server.
   * @param {retryBehavior} opts.retry_behavior - Retry behavior for establishing the connection.
   *
   * @return {Promise} - Returns the promise as defined for amqplib.connect
   */
  static connect(opts) {

    return promiseRetry((retry, number) => {

      opts.retry_behavior.attempts = number;
      if (number >= 2) {
        logger.verbose(`Trying to (re)connect to RabbitMq, attempt number ${number - 1}`);
      }

      return amqp.connect(opts.server)
        .catch(retry);

    });
  }
}

module.exports = AmqpSugarLib;
