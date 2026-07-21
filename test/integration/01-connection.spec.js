const AmqpLibSugar = require('./../../src');

describe.only('Integration => Connection', () => {

  let amqpLibSugar = null;
  beforeEach(() => {
    amqpLibSugar = new AmqpLibSugar();
  });

  it('.connect => requires a string opt', () => {
    expect(() => {
      amqpLibSugar.connect();
    }).to.throw();
  });

  it('.connect => connects if connection string is passed', () => {
    expect(() => {
      return amqpLibSugar.connect({server: 'amqp://guest:guest@localhost:5500'})
        .then(conn => {
          expect(conn).to.exist;
        })
        .catch(err => {
          expect(err).to.not.exist;
        });
    }).to.not.throw(new Error());
  });
});
