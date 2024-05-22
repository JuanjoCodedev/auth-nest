import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AppLoggerModule } from './modules/logger/logger.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseService } from './modules/databases/databases.service';
import { DatabaseModule } from './modules/databases/databases.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { WebsocketsModule } from './modules/websockets/websockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    UserModule,
    AppLoggerModule,
    DatabaseModule,
    AuthModule,
    MailerModule,
    LoggerModule,
    WebsocketsModule,
  ],
  providers: [DatabaseService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
