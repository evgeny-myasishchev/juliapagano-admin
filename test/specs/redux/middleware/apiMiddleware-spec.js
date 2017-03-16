import { expect } from 'chai';
import Promise from 'bluebird';
import faker from 'faker';
import sinon from 'sinon';
import * as _ from 'lodash';

import api, { API_CALL } from '../../../../app/redux/middleware/api';

describe('redux/middleware/clientMiddleware', () => {
  const dummyClient = { dummyClient: true };
  const dummyStore = { dummyStore: true };
  const middleware = api(dummyClient)(dummyStore);

  const newAction = ({ apiCall, invoke } = {}) => ({
    dummyAction: true,
    [API_CALL]: _.merge({
      types: [
        faker.fake('REQUEST-START-{{lorem.word}}'),
        faker.fake('REQUEST-SUCCESS-{{lorem.word}}'),
        faker.fake('REQUEST-FAILURE-{{lorem.word}}'),
      ],
      invoke: sinon.spy(() => invoke || Promise.resolve()),
    }, apiCall),
  });

  const setup = ({ action } = {}) => {
    const rest = { prop1: faker.lorem.word(), prop2: faker.lorem.word() };
    return {
      next: sinon.spy(),
      action: newAction(_.merge(action, { apiCall: { ...rest } })),
      rest,
    };
  };

  it('should call next if not api call action', () => {
    const { next, action } = setup();
    delete action[API_CALL];
    middleware(next)(action);
    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWith(action);
  });

  it('should call next with request type', () => {
    const { next, action, rest } = setup();
    middleware(next)(action);
    expect(next).to.have.been.calledOnce;
    const apiCall = action[API_CALL];
    expect(next).to.have.been.calledWith({
      ...rest,
      type: apiCall.types[0],
    });
  });

  it('should call next with success type on success', async () => {
    const dummyResult = { res: faker.lorem.word() };
    const { next, action, rest } = setup({ action: { invoke: Promise.resolve(dummyResult) } });
    await middleware(next)(action);
    expect(next).to.have.been.calledTwice;
    const apiCall = action[API_CALL];
    expect(next).to.have.been.calledWith({ ...rest, result: dummyResult, type: apiCall.types[1] });
  });

  it('should call next with failure type on failure', async () => {
    const error = new Error(faker.lorem.sentence());
    const { next, action, rest } = setup({ action: { invoke: Promise.reject(error) } });
    await middleware(next)(action);
    expect(next).to.have.been.calledTwice;
    const apiCall = action[API_CALL];
    expect(next).to.have.been.calledWith({ ...rest, error, type: apiCall.types[2] });
  });
});
