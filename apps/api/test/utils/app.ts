import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module.js';
import { setupApp } from '../../src/app.setup.js';
import { Test } from '@nestjs/testing';

export async function createTestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleRef.createNestApplication();
  setupApp(app); //mesmos pipes, prefixos e versionamento do main.ts
  await app.init();
  return app;
}
