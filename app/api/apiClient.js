// Stuff here is ported from doddle-shared

import request, { getUrl } from './request';

// eslint-disable-next-line no-unused-vars
export default function apiClient(store, { hosts = { default: '' } }) {
  return {
    async getAllPages() {
      const url = getUrl(hosts.default, '/v1/pages');
      const token = store.getState().auth.idToken.raw;
      const params = {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${token}`,
        },
      };
      return request(url, params);
    },

    //TODO: Other api calls to be added here
  };
}
