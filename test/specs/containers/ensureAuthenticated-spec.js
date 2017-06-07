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

    const subject = shallow(<EnsureAuthenticated {...props} />);

    return {
      props,
      subject,
    };
  }

  it('should dispatch login action if no token present on component mounted', () => {
    const pathname = faker.fake('current-path-{{lorem.word}}');
    const { subject, props: { actions } } = setup({ props: { routing: { locationBeforeTransitions: { pathname } } } });
    subject.instance().componentDidMount();
    expect(actions.login).to.have.been.calledWith(pathname);
    expect(subject.nodes.length).to.eql(1);
    expect(subject.nodes[0]).to.eql(null);
  });

  it('should dispatch login action if no token present on component updated', () => {
    const pathname = faker.fake('current-path-{{lorem.word}}');
    const { subject, props: { actions } } = setup({ props: { routing: { locationBeforeTransitions: { pathname } } } });
    subject.instance().componentDidUpdate();
    expect(actions.login).to.have.been.calledWith(pathname);
    expect(subject.nodes.length).to.eql(1);
    expect(subject.nodes[0]).to.eql(null);
  });

  it('should render children if token is present', () => {
    const { subject, props: { actions, children } } = setup({ props: { idToken: { raw: 'fake' } } });
    subject.instance().componentDidMount();
    expect(actions.login).to.have.callCount(0);
    expect(subject.nodes.length).to.eql(1);
    expect(subject.nodes[0].props).to.eql({ children });
  });
});
