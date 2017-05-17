import Auth0Lock from 'auth0-lock';
import _ from 'lodash';

export default function createAuth0Lock(params = {}) {
  return new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, _.merge({
    container: 'auth-container',
    auth: {
      redirectUrl: `${window.location.origin}/login`,
      responseType: 'token',
      params: {
        scope: 'openid name email',
      },
    },
  }, params));
}
