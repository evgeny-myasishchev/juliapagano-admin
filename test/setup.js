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
    removeItem: key => delete items[key],
    clear: () => (items = {}),
  };
}());

before(() => {
  nock.disableNetConnect();
});

beforeEach(() => {
  localStorage.clear();
  nock.cleanAll();
});

require.extensions['.css'] = _.noop;
require.extensions['.less'] = _.noop;
require.extensions['.scss'] = _.noop;
