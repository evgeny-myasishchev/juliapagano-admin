import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { App } from '../../../app/containers/App';
import AuthenticatedNavbar from '../../../app/components/AuthenticatedNavbar';
import faker from '../../fix/faker';

describe('App', () => {
  function setup(props = {}) {
    const appProps = {
      signedIn: false,
      children: <div className="fake-children">{faker.fake('fake-children-{{lorem.word}}')}</div>,
      actions: {
        logout: sinon.spy(),
      },
      ...props,
    };

    const subject = shallow(<App {...appProps} />);

    return {
      ...appProps,
      subject,
    };
  }


  it('should render children', () => {
    const { subject, children } = setup();
    expect(subject.find('div.fake-children'))
      .to.have.length(1)
      .and.shallowly.have.text().eql(children.props.children);
  });

  it('should render AuthenticatedNavbar for signedIn User', () => {
    const { subject } = setup({ signedIn: true });
    expect(subject.find(AuthenticatedNavbar))
      .to.have.length(1)
      .and.to.shallowly.have.props('onSignOut').be.a('function');
  });

  it('should dispatch logout on signOut click', () => {
    const { subject, actions: { logout } } = setup({ signedIn: true });
    const authenticatedNavbar = subject.find(AuthenticatedNavbar);
    authenticatedNavbar.props().onSignOut();
    expect(logout).to.have.callCount(1);
  });
});
