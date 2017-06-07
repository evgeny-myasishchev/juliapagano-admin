import _ from 'lodash';

// Code below is partially taken from doddle-shared

export default class HttpError extends Error {
  static isHttpError(obj) {
    return _.has(obj, 'httpStatus') &&
              _.has(obj, 'errors') &&
              _.has(obj, 'errors[0].code');
  }
}

export class HttpResponseError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'HttpResponseError';
    Error.captureStackTrace(this, this.constructor);
  }

  static fromResponse(res, body) {
    const err = new HttpResponseError();
    if (!res) {
      err.message = 'Http request failed';
      return err;
    }
    err.httpStatus = res.status;
    err.message = `${res.status} response from ${
          _.get(res, 'req.method')} ${
          _.get(res, 'url')}`;
    err.body = body;
    if (!HttpError.isHttpError(body)) {
      return err;
    }

    err.message += `: ${body.errors[0].message}`;
    err.code = body.errors[0].code;

    if (_.has(body, 'diagnostics.requestId')) err.requestId = _.get(body, 'diagnostics.requestId');

    return err;
  }
}
