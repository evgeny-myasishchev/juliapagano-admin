import Promise from 'bluebird';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';

import { HttpResponseError } from './HttpError';

export function getUrl(apiHost, path) {
  return apiHost + path;
}

export default function request(url, params) {
  const req = new Request(url);
  const fetchResult = fetch(req, { mode: 'cors', ...params }).then((res) => {
    if (!res.ok) {
      return res.text().then((body) => {
        let errorBody = body;
        try {
          errorBody = JSON.parse(body);
        } catch (e) {
          // Nothing here, error body is not JSON
        }
        _.set(res, 'req', req);
        throw HttpResponseError.fromResponse(res, errorBody);
      });
    }

    return res.json().then(json => ({ body: json }));
  });
  return Promise.resolve(fetchResult);
}
