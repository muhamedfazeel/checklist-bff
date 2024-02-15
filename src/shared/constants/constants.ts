export const MAX_REQUEST_BODY_SIZE = 10485760;

export const NODE_ENVIRONMENT = {
  DEVELOPMENT: 'develop',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

export const NODE_ENVIRONMENTS = Object.values(NODE_ENVIRONMENT);
export const LOG_LEVELS = ['log', 'error', 'warn', 'debug'];
export const LOCALHOST = '0.0.0.0';

export const PUBLIC_METADATA = 'isPublic';

export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
};

export const JWT_ALGORITHM = 'HS512';
export const JWT_STRATEGY = {
  DEFAULT: 'jwt-strat',
  REFRESH: 'jwt-refresh-strat',
};

export const FASTIFY_ERR_BODY_TOO_LARGE = 'FST_ERR_CTP_BODY_TOO_LARGE';
