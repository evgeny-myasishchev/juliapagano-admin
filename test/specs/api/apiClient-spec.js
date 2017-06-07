import { expect } from 'chai';
import faker from 'faker';
import nock from 'nock';

import { mockIdToken } from '../../fix/faker';
import apiClient from '../../../app/api/apiClient';

describe('apiClient', () => {
  function setupApiClient() {
    const apiHost = faker.internet.url();
    const idToken = mockIdToken();
    const store = {
      getState() {
        return { auth: { idToken } };
      },
    };
    const api = apiClient(store, { hosts: { default: apiHost } });
    return {
      api,
      apiHost,
      idToken,
      store,
    };
  }

  describe('getAllPages', () => {
    function setupApiCall({ apiHost, idToken }) {
      const pages = [{ page1: true }, { page2: true }];
      const nockScope = nock(apiHost, {
        reqheaders: {
          authorization: `Bearer ${idToken.raw}`,
        },
      })
      .get('/v1/pages')
      .reply(200, pages);
      return { nockScope, pages };
    }
    it('should call pages api to get all pages', async () => {
      const { api, ...apiParams } = setupApiClient();
      const { nockScope, pages } = setupApiCall(apiParams);
      const res = await api.getAllPages();
      expect(res.body).to.eql(pages);
      expect(nockScope.isDone()).to.eql(true);
    });
  });
});
