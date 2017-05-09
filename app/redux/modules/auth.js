import { push } from 'react-router-redux';
import Auth0Lock from 'auth0-lock';

const LOGIN = 'juliapagano-admin/auth/LOGIN';
const LOGIN_LOAD = 'juliapagano-admin/auth/LOGIN_LOAD';
const LOGIN_SUCCESS = 'juliapagano-admin/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'juliapagano-admin/auth/LOGIN_FAIL';
const LOGIN_COMPLETED = 'juliapagano-admin/auth/LOGIN_COMPLETED';
const LOGOUT = 'juliapagano-admin/auth/LOGOUT';
const LOGOUT_SUCCESS = 'juliapagano-admin/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'juliapagano-admin/auth/LOGOUT_FAIL';

const initialState = Object.freeze({
  loggingIn: false,
  idToken: localStorage.getItem('id-token') || null,
  origin: null,
});

const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
  container: 'auth-container',
  auth: {
    redirectUrl: `${window.location.origin}/login`,
    responseType: 'token',
  },
});

export function login(origin) {
  return (dispatch) => {
    dispatch({ type: LOGIN, origin });
    dispatch(push('/login'));
  };
}

export function loginLoad() {
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_LOAD });
    lock.show({
      auth: {
        params: {
          scope: 'openid name email',
          state: new Buffer(JSON.stringify({ origin: getState().auth.origin })).toString('base64'),
        },
      },
    });
    lock.on('authenticated', (authResult) => {
      // TODO: if(!authResult.idToken) dispatch error
      let returnUrl = '/';
      if (authResult.state) {
        const stateObject = JSON.parse(new Buffer(authResult.state, 'base64').toString('ascii'));
        returnUrl = stateObject.origin || returnUrl;
      }
      dispatch({ type: LOGIN_SUCCESS, idToken: authResult.idToken });
      dispatch(push(returnUrl));
    });
  };
}

export function loginCompleted() {
  return () => {
    lock.hide();
  };
}

// lock.on('authenticated', this.doAuthentication.bind(this));

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        origin: action.origin,
      };
    case LOGIN_LOAD:
      return {
        ...state,
        loggingIn: true,
      };
    case LOGIN_COMPLETED:
      return {
        ...state,
        loggingIn: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('id-token', action.idToken);
      return {
        ...state,
        loggingIn: false,
        idToken: action.idToken,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
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
