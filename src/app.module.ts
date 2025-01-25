import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';

/* Module */
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/databases/databases.module';
import { WebsocketsModule } from './modules/websockets/websockets.module';
import { LocationModule } from './modules/location/location.module';

/* Service */
import { DatabaseService } from './modules/databases/databases.service';

/* Filter */
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { LogModule } from './modules/log/log.module';

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
    DatabaseModule,
    AuthModule,
    MailerModule,
    WebsocketsModule,
    LogModule,
    LocationModule,
  ],
  providers: [DatabaseService, { provide: APP_GUARD, useClass: ThrottlerGuard }, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
