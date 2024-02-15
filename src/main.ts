import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/custom-logger/custom-logger.service';
import * as K from './shared/constants';
import { useRequestLogging } from './middlewares/request-logger';
import { SuccessResponseInterceptor } from './interceptors/success.response.interceptor';
import { swaggerAuth } from './middlewares/swagger.auth.middleware';
import { name, description, version } from 'package.json';

async function bootstrap() {
  const logger = new CustomLogger('Main');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: K.MAX_REQUEST_BODY_SIZE }),
    { rawBody: true },
  );

  app.setGlobalPrefix('/api');
  app.useLogger(logger);
  useRequestLogging(app);
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('config.port');
  const env = config.get('config.environment');
  const swaggerServer = config.get('config.swagger.server');
  const devServerUrl = config.get('config.devServerUrl');
  const localhost = config.get('config.localhost');

  // Cors configuration
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Swagger configuration
  if (swaggerServer === 'true') {
    app.use(['/jp/api-docs', '/jp/api-docs-json'], swaggerAuth);
    const options = new DocumentBuilder()
      .setTitle(name)
      .setDescription(`${description}\nRunning on ${env} Mode`)
      .addBearerAuth()
      .setVersion(version)
      .addServer(devServerUrl, 'Remote Dev Server')
      .addServer(`http://${localhost}:${port}`, 'Local Dev Server')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('jp/api-docs', app, document);
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`Listening on port ${port}, running in ${env} environment`);
}
bootstrap();
