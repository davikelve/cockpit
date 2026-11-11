import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';
import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service.js';

describe('HealthController', () => {
  let controller: HealthController;
  const health = { check: vi.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: health },
        { provide: PrismaHealthIndicator, useValue: { pingCheck: vi.fn() } },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();
    controller = module.get(HealthController);
  });

  it('delegates to the health check service', () => {
    health.check.mockReturnValue('ok');
    expect(controller.check()).toBe('ok');
  });
});
