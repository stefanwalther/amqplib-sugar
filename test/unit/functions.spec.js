/* global describe, it */
const amqpLibSugar = require('./../../src');

describe('UNIT TESTS', () => {

  describe('amqpLibSugar => check functions', () => {
    it('should contain a method connect', () => {
      expect(amqpLibSugar).to.have.a.property('connect').to.be.a('function');
    });
    it('should contain a method publishMessage', () => {
      expect(amqpLibSugar).to.have.a.property('publishMessage').to.be.a('function');
    });
    xit('should contain a method subscribeMessage', () => {
      expect(amqpLibSugar).to.have.a.property('subscribeMessage').to.be.a('function');
    });
  });
});
