import { push } from 'react-router-redux';

export const ID_TOKEN_KEY = 'juliapagano-admin/id-token';

const LOGIN = 'juliapagano-admin/auth/LOGIN';
export const LOGIN_SUCCESS = 'juliapagano-admin/auth/LOGIN_SUCCESS';

function initialState() {
  const idTokenJson = localStorage.getItem(ID_TOKEN_KEY);
  return Object.freeze({
    idToken: idTokenJson ? JSON.parse(idTokenJson) : null,
    origin: null,
  });
}

export function login(origin) {
  return (dispatch) => {
    dispatch({ type: LOGIN, origin });
    dispatch(push('/login'));
  };
}

export function loginSuccess(idToken, idTokenPayload) {
  return { type: LOGIN_SUCCESS, idToken, idTokenPayload };
}

export default function reducer(state = initialState(), action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        origin: action.origin,
      };
    case LOGIN_SUCCESS: {
      const idToken = {
        raw: action.rawIdToken,
        payload: action.idTokenPayload,
      };
      localStorage.setItem(ID_TOKEN_KEY, JSON.stringify(idToken));
      return {
        ...state, idToken,
      };
    }
    default:
      return state;
  }
}
