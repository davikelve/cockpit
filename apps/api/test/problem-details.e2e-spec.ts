import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './utils/app.js';

describe('GET /api/v1/nada (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close(); // fecha a conexão com o banco; sem isso o Vitest não termina
  });

  it('answers an unknown route with 404 in application/problem+json', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/nada')
      .expect(404)
      .expect('Content-Type', /application\/problem\+json/);
    expect(res.body).toMatchObject({ status: 404, instance: '/api/v1/nada' });
  });
});
