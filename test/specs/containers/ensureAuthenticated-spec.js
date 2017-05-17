import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { EnsureAuthenticated } from '../../../app/containers/EnsureAuthenticated';
import faker from '../../fix/faker';

describe('EnsureAuthenticated', () => {
  function setup(params = { props: {} }) {
    const props = {
      actions: {
        login: sinon.spy(),
      },
      routing: {
        location: {
          pathname: faker.fake('fake-path-{{lorem.word}}'),
        },
      },
      children: React.createElement('div', faker.fake('fake-children-{{lorem.word}}')),
      ...params.props,
    };

    const enzymeWrapper = shallow(<EnsureAuthenticated {...props} />);

    return {
      props,
      enzymeWrapper,
    };
  }

  it('should dispatch login action if no token present', () => {
    const pathname = faker.fake('current-path-{{lorem.word}}');
    const { enzymeWrapper, props: { actions } } = setup({ props: { routing: { locationBeforeTransitions: { pathname } } } });
    enzymeWrapper.instance().componentDidMount();
    expect(actions.login).to.have.been.calledWith(pathname);
    expect(enzymeWrapper.nodes.length).to.eql(1);
    expect(enzymeWrapper.nodes[0]).to.eql(null);
  });

  it('should render children if token is present', () => {
    const { enzymeWrapper, props: { actions, children } } = setup({ props: { idToken: { raw: 'fake' } } });
    enzymeWrapper.instance().componentDidMount();
    expect(actions.login).to.have.callCount(0);
    expect(enzymeWrapper.nodes.length).to.eql(1);
    expect(enzymeWrapper.nodes[0].props).to.eql({ children });
  });
});
