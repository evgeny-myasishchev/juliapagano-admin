export const API_CALL = Symbol('juliapagano-admin/call-api');

export default function (client) {
  // store => next => action
  return () => next => (action) => {
    const apiCall = action[API_CALL];
    if (typeof apiCall === 'undefined') {
      return next(action);
    }

    const { invoke, types, ...rest } = apiCall;

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    return invoke(client).then(
        result => next({ ...rest, result, type: SUCCESS }),
        error => next({ ...rest, error, type: FAILURE }),
      ).catch((error) => {
        // Something is very wrong
        console.error('MIDDLEWARE ERROR:', error); // eslint-disable-line no-console
        next({ ...rest, error, type: FAILURE });
      });
  };
}
