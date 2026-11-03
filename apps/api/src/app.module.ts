import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module.js';
import { envValidation } from './config/env.validation.js';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envValidation }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : { target: 'pino-pretty' },
        autoLogging: process.env.NODE_ENV !== 'test',
      },
    }),
    PrismaModule,
  ],
})
export class AppModule {}
