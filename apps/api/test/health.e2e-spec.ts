import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './utils/app.js';

describe('GET /health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close(); // fecha a conexão com o banco; sem isso o Vitest não termina
  });

  it('returns 200 with the database up', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);
    expect(res.body.info.database.status).toBe('up');
  });
});
