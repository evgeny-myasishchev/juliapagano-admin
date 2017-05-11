import { expect } from 'chai';
import _ from 'lodash';

import { load } from '../../../app/redux/modules/auth';
import fakeState from '../../fix/fakeState';
import reducer from '../../../app/redux/modules/reducer';


describe('redux/modules/auth', () => {
  beforeEach(() => {
    const items = {};
    global.localStorage = (function localStorage() {
      return {
        setItem: (key, value) => { items[key] = value; },
        getItem: key => items[key],
      };
    }());
  });

  describe('reducer', () => {
    it('should return default state', () => {
      const state = reducer();
      expect(state.auth).to.eql({ origin: null });
    });

    it('should provided state for unknown action', () => {
      const initialState = fakeState();
      const state = reducer(initialState, { type: 'unknown' });
      expect(state).to.eql(initialState);
    });

    it('should return loading state for load action', () => {
      const initialState = fakeState();
      const state = reducer(initialState, { type: load() });
      expect(state).to.eql(_.assign(initialState, { auth: { loading: true } }));
    });
  });
});
