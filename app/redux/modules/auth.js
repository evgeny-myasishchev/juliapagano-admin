import { push } from 'react-router-redux';

const LOGIN = 'juliapagano-admin/auth/LOGIN';
const LOGIN_SUCCESS = 'juliapagano-admin/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'juliapagano-admin/auth/LOGIN_FAIL';
const LOGOUT = 'juliapagano-admin/auth/LOGOUT';
const LOGOUT_SUCCESS = 'juliapagano-admin/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'juliapagano-admin/auth/LOGOUT_FAIL';

const localStorage = global.localStorage;

function initialState() {
  const idTokenJson = localStorage.getItem('id-token');
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
    case LOGIN_SUCCESS:
      localStorage.setItem('id-token', JSON.stringify({
        raw: action.idToken,
        payload: action.idTokenPayload,
      }));
      return {
        ...state,
        idToken: action.idToken,
        idTokenPayload: action.idTokenPayload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        idToken: null,
      // loginError: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
      };
    default:
      return state;
  }
}
