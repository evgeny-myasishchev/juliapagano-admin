import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import _ from 'lodash';

import { Login } from '../../../app/containers/Login';
import faker from '../../fix/faker';

describe('Login', () => {
  function auth0LockCreator(params = {}) {
    return function createAuth0Lock() {
      return {
        on: () => {},
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
});
