import { expect } from 'chai';

import { LOGIN_SUCCESS, ID_TOKEN_KEY } from '../../../app/redux/modules/auth';
import fakeState from '../../fix/fakeState';
import faker from '../../fix/faker';
import reducer from '../../../app/redux/modules/reducer';


describe('redux/modules/auth', () => {
  describe('reducer', () => {
    function rememberedToken() {
      return {
        raw: faker.fake('raw-id-token-{{lorem.word}}'),
        payload: { fake: faker.fake('fake-payload-{{lorem.word}}') },
      };
    }

    it('should return default state', () => {
      const state = reducer();
      expect(state.auth).to.eql({ origin: null, idToken: null });
    });

    it('should restore idToken from local storage', () => {
      const idToken = rememberedToken();
      localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(idToken));
      const state = reducer();
      expect(state.auth).to.eql({ origin: null, idToken });
    });

    it('should return provided state for unknown action', () => {
      const initialState = fakeState();
      const state = reducer(initialState, { type: 'unknown' });
      expect(state.auth).to.eql(initialState.auth);
    });

    it('should handle login success and remember token', () => {
      const idToken = rememberedToken();
      const initialState = fakeState();
      const state = reducer(initialState, { type: LOGIN_SUCCESS, rawIdToken: idToken.raw, idTokenPayload: idToken.payload });
      expect(state.auth).to.eql({ ...initialState.auth, idToken });
      expect(localStorage.getItem(ID_TOKEN_KEY)).to.eql(JSON.stringify(idToken));
    });
  });
});
