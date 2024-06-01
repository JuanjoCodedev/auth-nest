import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnService } from './core/services/conn.service';
import { DatabaseModule } from './modules/database.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { AppLoggerModule } from './modules/logger.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: ConnService }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    AuthModule,
    UserModule,
    AppLoggerModule,
    DatabaseModule,
  ],
  providers: [ConnService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
