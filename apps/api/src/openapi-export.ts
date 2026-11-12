import { writeFileSync } from 'node:fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { buildOpenApi, setupApp } from './app.setup.js';

// Gera openapi.json na raiz do repositório sem abrir porta (dist/ → apps/api → apps → raiz).
const app = await NestFactory.create(AppModule, { logger: false });
setupApp(app);
writeFileSync(
  new URL('../../../openapi.json', import.meta.url),
  JSON.stringify(buildOpenApi(app), null, 2) + '\n',
);
await app.close();
