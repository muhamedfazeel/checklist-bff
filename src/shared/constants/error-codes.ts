export const ERROR_CODES = {
  DEFAULT: {
    code: 1000,
    message: 'Internal Error',
  },
  AUTH_ERROR: {
    code: 1003,
    message: 'Authentication error',
  },
  INTERNAL: {
    code: 1001,
    message: 'Internal error',
  },
  NOT_FOUND: {
    code: 1004,
    message: 'Resource not found',
  },
  REQUEST_BODY_EMPTY: {
    code: 1020,
    message: 'Request body is empty',
  },
  INPUT: {
    code: 1002,
    message: 'Invalid input format',
  },
  FORBIDDEN: {
    code: 1005,
    message: 'This request cannot be fulfilled',
  },
  REQUEST_BODY_LARGE: {
    code: 1006,
    message: 'Request body too large',
  },
  INVALID_ACCESS_TOKEN: {
    code: 1007,
    message: 'Invalid access token',
  },
  INVALID_REFRESH_TOKEN: {
    code: 1008,
    message: 'Invalid refresh token',
  },
  NO_AUTH_TOKEN: {
    code: 1009,
    message: 'No auth token',
  },
  MAX_LOGIN_LIMIT: {
    code: 1010,
    message: 'Maximum login limit reached',
  },
};
