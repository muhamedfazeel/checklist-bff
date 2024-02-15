import * as Joi from 'joi';
import * as K from '../shared/constants';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(...K.NODE_ENVIRONMENTS)
    .default(K.NODE_ENVIRONMENTS[0]),
  PORT: Joi.number().required(),
  LOCALHOST: Joi.string().default(K.LOCALHOST),
  LOGGER_LEVEL: Joi.string()
    .valid(...K.LOG_LEVELS)
    .default(K.LOG_LEVELS[0]),
  PRETTY_PRINT_LOG: Joi.string().default('false'),
  SWAGGER_SERVER: Joi.string().default('false'),
  SWAGGER_USER: Joi.string().required(),
  SWAGGER_PASSWORD: Joi.string().required(),
  MAIN_API_URL: Joi.string().required(),
});
