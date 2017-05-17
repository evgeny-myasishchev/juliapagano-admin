import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';

import { Login } from '../../../app/containers/Login';
import faker from '../../fix/faker';

describe('Login', () => {
  function auth0LockCreator(params = {}) {
    return function createAuth0Lock() {
      return {
        on: (evt, cb) => { _.set(params, `on.${evt}`, cb); },
        show: (args) => { _.set(params, 'showArgs', args); },
        hide: () => { _.set(params, 'hideCalled', true); },
      };
    };
  }

  function setup(params = { props: {} }) {
    const auth0LockParams = {};
    const createAuth0Lock = auth0LockCreator(auth0LockParams);
    const props = {
      createAuth0Lock,
      actions: {
        push: sinon.spy(),
        loginSuccess: sinon.spy(),
      },
      ...params.props,
    };

    const enzymeWrapper = shallow(<Login {...props} />);

    return {
      props,
      enzymeWrapper,
      auth0LockParams,
    };
  }

  it('should show lock on mount', () => {
    const origin = faker.fake('fake-origin-{{lorem.word}}');
    const { enzymeWrapper, auth0LockParams } = setup({ props: { origin } });
    const rendered = enzymeWrapper.instance();
    rendered.componentDidMount();
    expect(auth0LockParams.showArgs).to.eql({
      auth: {
        params: { state: new Buffer(JSON.stringify({ origin })).toString('base64') },
      },
    });
  });

  it('should hide lock on unmount', () => {
    const origin = faker.fake('fake-origin-{{lorem.word}}');
    const { enzymeWrapper, auth0LockParams } = setup({ props: { origin } });
    const rendered = enzymeWrapper.instance();
    rendered.componentWillUnmount();
    expect(auth0LockParams.hideCalled).be.true;
  });

  describe('authenticated', () => {
    it('should dispatch login success action and redirect to root', () => {
      const { auth0LockParams, props: { actions } } = setup();
      const authResult = {
        idToken: faker.fake('id-token-{{lorem.word}}'),
        idTokenPayload: faker.fake('id-token-payload-{{lorem.word}}'),
      };
      auth0LockParams.on.authenticated(authResult);
      expect(actions.loginSuccess).to.have.been.calledWithExactly(authResult.idToken, authResult.idTokenPayload);
      expect(actions.push).to.have.been.calledWithExactly('/');
    });

    it('should redirect to return url if it was present in the state', () => {
      const { auth0LockParams, props: { actions } } = setup();
      const origin = faker.fake('fake-origin-{{lorem.word}}');
      const authResult = {
        idToken: faker.fake('id-token-{{lorem.word}}'),
        idTokenPayload: faker.fake('id-token-payload-{{lorem.word}}'),
        state: new Buffer(JSON.stringify({ origin })).toString('base64'),
      };
      auth0LockParams.on.authenticated(authResult);
      expect(actions.loginSuccess).to.have.been.calledWithExactly(authResult.idToken, authResult.idTokenPayload);
      expect(actions.push).to.have.been.calledWithExactly(origin);
    });
  });
});
