import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import sinon from 'sinon';

import { Login } from '../../../app/containers/Login';
import faker from '../../fix/faker';

describe('Login', () => {
  function auth0LockCreator(params = {}) {
    return function createAuth0Lock(opts) {
      _.set(params, 'createParams', opts);
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

    const subject = shallow(<Login {...props} />);

    return {
      props,
      subject,
      auth0LockParams,
    };
  }

  // {
  //   accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16QX…wd6aSLYMI7LzuiVL6h0zQ9mDGjxXG_Rpd7l0emfJj8V8gd3cA",
  //   expiresIn: 86400,
  //   scope: "openid email pages:read",
  //   idToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16QX…sf40Xx3p_zQoflUjMZJjfXeSy6h1fxljLUY-rwFWS527tvxtQ",
  //   tokenType: "Bearer"
  // }

  it('should show lock on mount', () => {
    const origin = faker.fake('fake-origin-{{lorem.word}}');
    const { subject, auth0LockParams } = setup({ props: { origin } });
    const rendered = subject.instance();
    rendered.componentDidMount();
    expect(auth0LockParams.createParams).to.eql({
      auth: {
        params: { state: new Buffer(JSON.stringify({ origin })).toString('base64') },
      },
    });
  });

  it('should hide lock on unmount', () => {
    const origin = faker.fake('fake-origin-{{lorem.word}}');
    const { subject, auth0LockParams } = setup({ props: { origin } });
    const rendered = subject.instance();
    rendered.componentWillUnmount();
    expect(auth0LockParams.hideCalled).be.true;
  });

  describe('authenticated', () => {
    function fakeJwtToken(body) {
      return [
        { typ: 'JWT' },
        {
          iss: faker.fake('iss-{{lorem.word}}'),
          sub: faker.fake('sub-{{lorem.word}}'),
          ...body,
        },
      ]
      .map(part => new Buffer(JSON.stringify(part)).toString('base64'))
      .join('.') + faker.fake('.{{lorem.word}}');
    }

    function fakeAuthResult() {

    }

    it('should dispatch login success action and redirect to root', () => {
      const { auth0LockParams, props: { actions } } = setup();
      const authResult = {
        rawIdToken: faker.fake('id-token-{{lorem.word}}'),
        idTokenPayload: faker.fake('id-token-payload-{{lorem.word}}'),
      };
      auth0LockParams.on.authenticated(authResult);
      expect(actions.loginSuccess).to.have.been.calledWithExactly(authResult.rawIdToken, authResult.idTokenPayload);
      expect(actions.push).to.have.been.calledWithExactly('/');
    });

    it('should redirect to return url if it was present in the state', () => {
      const { auth0LockParams, props: { actions } } = setup();
      const origin = faker.fake('fake-origin-{{lorem.word}}');
      const authResult = {
        rawIdToken: faker.fake('id-token-{{lorem.word}}'),
        idTokenPayload: faker.fake('id-token-payload-{{lorem.word}}'),
        state: new Buffer(JSON.stringify({ origin })).toString('base64'),
      };
      auth0LockParams.on.authenticated(authResult);
      expect(actions.loginSuccess).to.have.been.calledWithExactly(authResult.rawIdToken, authResult.idTokenPayload);
      expect(actions.push).to.have.been.calledWithExactly(origin);
    });
  });
});
