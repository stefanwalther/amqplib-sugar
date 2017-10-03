const amqpSugar = require('./../../src/');

describe('Test the options', () => {
  it('should add all options if missing', () => {
    let r = amqpSugar._fixOptions({});
    expect(r).to.not.be.empty;
    expect(r).to.have.a.property('attempts');
    expect(r).to.have.a.property('retries');
    expect(r).to.have.a.property('interval');
    expect(r).to.have.a.property('enabled');
  });

  it('should add missing values', () => {
    let r = amqpSugar._fixOptions({retry_behavior: {attempts: 10000}});
    expect(r).to.not.be.empty;
    expect(r).to.have.a.property('attempts').to.be.equal(10000);
    expect(r).to.have.a.property('retries');
    expect(r).to.have.a.property('interval');
    expect(r).to.have.a.property('enabled');
  })
});
