import Auth0Lock from 'auth0-lock';
import _ from 'lodash';

export default function createAuth0Lock(params = {}) {
  return new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, _.merge({
    container: 'auth-container',
    oidcConformant: true,
    auth: {
      redirectUrl: `${window.location.origin}/login`,
      responseType: 'token id_token',
      audience: 'https://staging.juliapagano.co.uk/api',
      params: {
        scope: 'openid name email pages:read',
      },
    },
  }, params));
}
