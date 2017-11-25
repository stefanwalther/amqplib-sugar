/* global describe, it */
const AmqpLibSugar = require('./../../src');

describe('Unit Tests => interface', () => {

  let amqpLibSugar = null;
  beforeEach(() => {
    amqpLibSugar = new AmqpLibSugar();
  });

  describe('amqpLibSugar => check private functions', () => {
    it('should contain a method connect', () => {
      expect(amqpLibSugar).to.have.a.property('connect').to.be.a('function');
    });
    it('should contain a method publishMessage', () => {
      expect(amqpLibSugar).to.have.a.property('publishMessage').to.be.a('function');
    });
    it('should contain a method subscribeMessage', () => {
      expect(amqpLibSugar).to.have.a.property('subscribeMessage').to.be.a('function');
    });
  });
});
