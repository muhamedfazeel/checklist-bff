import { registerAs } from '@nestjs/config';

const env = process.env;

export default registerAs('config', () => ({
  server: {
    port: env.PORT || 3000,
    env: env.NODE_ENV || 'development',
    host: env.HOST || 'localhost',
  },
  swagger: {
    server: env.SWAGGER_SERVER,
    user: env.SWAGGER_USER,
    password: env.SWAGGER_PASSWORD,
  },
  log: {
    level: env.LOGGER_LEVEL || 'debug',
    prettyPrint: env.LOG_PRETTY_PRINT || false,
  },
  jwt: {
    secret: env.JWT_SECRET || 'jwt-secret',
    expiresIn: env.JWT_EXPIRES_IN || '1d',
    refreshSecret: env.JWT_REFRESH_SECRET || 'refresh-secret',
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  mainApi: {
    url: env.MAIN_API_URL,
    version: env.MAIN_API_VERSION,
  },
  maxLoginLimit: env.MAX_LOGIN_ATTEMPTS || 5,
}));
