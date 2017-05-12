import _ from 'lodash';
import chai from 'chai';
import nock from 'nock';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.localStorage = (function localStorage() {
  let items = {};
  return {
    setItem: (key, value) => { items[key] = value; },
    getItem: key => items[key],
    reset: () => (items = {}),
  };
}());

before(() => {
  nock.disableNetConnect();
});

beforeEach(() => {
  global.localStorage.reset();
  nock.cleanAll();
});

require.extensions['.css'] = _.noop;
require.extensions['.less'] = _.noop;
require.extensions['.scss'] = _.noop;
