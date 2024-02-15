import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  localhost: process.env.LOCALHOST,
  devServerUrl: process.env.DEV_SERVER_URL,
  mainApiUrl: process.env.MAIN_API_URL,
  logger: {
    level: process.env.LOGGER_LEVEL,
    prettyPrint: process.env.PRETTY_PRINT_LOG,
  },
  swagger: {
    server: process.env.SWAGGER_SERVER,
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY,
  },
}));
