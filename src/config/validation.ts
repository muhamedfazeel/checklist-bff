import * as Joi from 'joi';
import * as K from 'src/common/constants';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(...K.NODE_ENVIRONMENTS)
    .default(K.NODE_ENVIRONMENTS[0]),
  PORT: Joi.string().required(),
  LOGGER_LEVEL: Joi.string()
    .valid(...K.LOGGER_LEVELS)
    .default(K.LOGGER_LEVELS[0]),
  LOG_PRETTY_PRINT: Joi.string().default('false'),
  SWAGGER_SERVER: Joi.string().default('false'),
  SWAGGER_USER: Joi.string().when('SWAGGER_SERVER', {
    is: 'true',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  SWAGGER_PASSWORD: Joi.string().when('SWAGGER_SERVER', {
    is: 'true',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  MAIN_API_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
  MAX_LOGIN_ATTEMPTS: Joi.string().required(),
});
