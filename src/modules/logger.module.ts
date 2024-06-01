import { Module } from '@nestjs/common';
import * as pino from 'pino';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        base: { pid: false },
        timestamp: pino.stdTimeFunctions.isoTime,

        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
            translateTime: true,
            colorize: true,
          },
        },

        messageKey: 'message',
      },
    }),
  ],
})
export class AppLoggerModule {}
