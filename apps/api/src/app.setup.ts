import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

export function setupApp(app: INestApplication) {
  const config = app.get(ConfigService);
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: config.getOrThrow<string>('WEB_ORIGIN'),
    credentials: true,
  });
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  return app;
}

export function buildOpenApi(app: INestApplication) {
  return SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Cockpit API')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
    {
      // AuthController.login → "authLogin" → no front vira useAuthLogin()
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        controllerKey
          .replace(/Controller$/, '')
          .replace(/^./, (c) => c.toLowerCase()) +
        methodKey.replace(/^./, (c) => c.toUpperCase()),
    },
  );
}
