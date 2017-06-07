import { expect } from 'chai';
import faker from 'faker';
import nock from 'nock';

import request from '../../../app/api/request';

describe('request', () => {
  it('should call send reqeust and return json body', async () => {
    const url = faker.internet.url();
    const path = `/${faker.internet.domainWord()}`;
    const reqData = { key1: faker.lorem.words(), key2: faker.lorem.words() };
    const responseData = { key1: faker.lorem.words(), key2: faker.lorem.words() };

    const scope = nock(url)
      .matchHeader('Content-Type', 'application/json')
      .post(path, reqData)
      .reply(200, responseData);
    const res = await request(`${url}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqData),
    });

    expect(res.body).to.eql(responseData);
    expect(scope.isDone()).to.eql(true);
  });

  it('should fail with http error on failure', async () => {
    const url = faker.internet.url();
    const path = `/${faker.internet.domainWord()}`;

    const responseData = { key1: faker.lorem.words(), key2: faker.lorem.words() };

    const scope = nock(url).get(path).reply(400, responseData);
    let err;
    try {
      await request(`${url}${path}`);
    } catch (e) {
      err = e;
    }
    expect(err.name).to.eql('HttpResponseError');
    expect(err.httpStatus).to.eql(400);
    expect(err.message).to.eql(`400 response from GET ${url}${path}`);
    expect(scope.isDone()).to.eql(true);
  });

  it('should include error details if HttpError was thrown', async () => {
    const url = faker.internet.url();
    const path = `/${faker.internet.domainWord()}`;

    const responseData = {
      httpStatus: 400,
      errors: [
        { code: 'BadRequest', message: faker.lorem.sentence() },
      ],
    };

    nock(url).get(path).reply(400, responseData);
    let err;
    try {
      await request(`${url}${path}`);
    } catch (e) {
      err = e;
    }
    expect(err.message).to.eql(`400 response from GET ${url}${path}: ${responseData.errors[0].message}`);
  });

  it('should include requestId if present', async () => {
    const url = faker.internet.url();
    const path = `/${faker.internet.domainWord()}`;

    const responseData = {
      httpStatus: 400,
      errors: [
        { code: 'BadRequest', message: faker.lorem.sentence() },
      ],
      diagnostics: {
        requestId: faker.fake('req-id-{{lorem.word}}'),
      },
    };

    nock(url).get(path).reply(400, responseData);
    let err;
    try {
      await request(`${url}${path}`);
    } catch (e) {
      err = e;
    }
    expect(err.requestId).to.eql(responseData.diagnostics.requestId);
  });
});
