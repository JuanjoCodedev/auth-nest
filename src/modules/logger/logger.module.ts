import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as pino from 'pino';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          base: { pid: false },
          timestamp: pino.stdTimeFunctions.isoTime,
          
          transport:
            configService.get<string>('NODE_ENV') !== 'production' ? { target: 'pino-pretty', options: { messageKey: 'message', translateTime: true, colorize: true } } : undefined,

          messageKey: 'message',

          autoLogging: false,

          serializers: {
            req: () => undefined,
            res: () => undefined,
          },
        },
      }),
    }),
  ],
})
export class AppLoggerModule {}
