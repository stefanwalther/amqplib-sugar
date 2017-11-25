const amqpSugar = require('./../../src/');

describe.only('Unit Tests => test the options', () => {
  it('should add all options if missing', () => {
    let r = amqpSugar._fixOptions({});
    expect(r).to.not.be.empty;
    expect(r.retry_behavior).to.not.be.empty;
    expect(r.retry_behavior).to.have.a.property('attempts');
    expect(r.retry_behavior).to.have.a.property('retries');
    expect(r.retry_behavior).to.have.a.property('interval');
    expect(r.retry_behavior).to.have.a.property('enabled');
  });

  it('should add missing values', () => {
    let r = amqpSugar._fixOptions({retry_behavior: {attempts: 10000}});
    expect(r.retry_behavior).to.not.be.empty;
    expect(r.retry_behavior).to.have.a.property('attempts').to.be.equal(10000);
    expect(r.retry_behavior).to.have.a.property('retries');
    expect(r.retry_behavior).to.have.a.property('interval');
    expect(r.retry_behavior).to.have.a.property('enabled');
  })
});
