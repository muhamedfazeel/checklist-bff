export const ERROR_CODES = {
  DEFAULT: {
    statusCode: 1000,
    message: 'Internal error',
  },
  INTERNAL: {
    statusCode: 1001,
    message: 'Internal error',
  },
  INPUT: {
    statusCode: 1002,
    message: 'Invalid input format',
  },
  GOOGLE_CREDENTIAL: {
    statusCode: 1003,
    message: 'Invalid google credential token',
  },

  AUTH_ERROR: {
    statusCode: 1004,
    message: 'Authentication error',
  },
  NOT_FOUND: {
    statusCode: 1005,
    message: 'Resource not found',
  },
  FORBIDDEN: {
    statusCode: 1006,
    message: 'This request cannot be fulfilled',
  },
  REQUEST_BODY_LARGE: {
    statusCode: 1007,
    message: 'Request body too large',
  },
  INVALID_ACCESS_TOKEN: {
    statusCode: 1008,
    message: 'Invalid access token',
  },
  INVALID_REFRESH_TOKEN: {
    statusCode: 1009,
    message: 'Invalid refresh token',
  },
  NO_AUTH_TOKEN: {
    statusCode: 1010,
    message: 'No auth token',
  },
  MAX_LOGIN_LIMIT: {
    statusCode: 1011,
    message: 'Maximum login limit reached',
  },
  LOGIN_BLOCKED: {
    statusCode: 1012,
    message: 'Login blocked after consecutive failed login attempts',
  },
  EMAIL_EXISTS: {
    statusCode: 1015,
    message: 'Email Already exists',
  },
  MESSAGE_BODY: {
    statusCode: 1016,
    message: 'Either messageText or imageUrl is required',
  },
  DEACTIVATED_USER: {
    statusCode: 1017,
    message: 'An error occurred. Please contact your admin. ',
  },
  REQUEST_BODY_EMPTY: {
    statusCode: 1021,
    message: 'Request body is empty',
  },
};
