import chai from 'chai';
import nock from 'nock';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

before(() => {
  nock.disableNetConnect();
});

beforeEach(() => {
  nock.cleanAll();
});
