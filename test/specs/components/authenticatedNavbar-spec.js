import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import AuthenticatedNavbar from '../../../app/components/AuthenticatedNavbar';
import faker from '../../fix/faker';

describe('AuthenticatedNavbar', () => {
  function setup(props = {}) {
    const componentProps = {
      onSignOut: sinon.spy(),
      userName: faker.internet.userName(),
      ...props,
    };

    const subject = shallow(<AuthenticatedNavbar {...componentProps} />);

    return {
      ...componentProps,
      subject,
    };
  }

  it('should show userName', () => {
    const { subject, userName } = setup();
    expect(subject).to.shallowly.find('a[name="user-name"]').to.shallowly.have.text().include(userName);
  });

  it('should call signout handler on signout', () => {
    const { subject, onSignOut } = setup();
    subject.find('SafeAnchor[name="sign-out"]').node.props.onClick();
    expect(onSignOut).to.have.callCount(1);
  });
});
