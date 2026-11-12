import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module.js';
import { buildOpenApi, setupApp } from './app.setup.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  setupApp(app);
  SwaggerModule.setup('docs', app, buildOpenApi(app));
  await app.listen(app.get(ConfigService).get<number>('PORT', 3000));
}
await bootstrap();
