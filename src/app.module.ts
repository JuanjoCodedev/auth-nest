import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseService } from './database/database.service';

import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { EmailerModule } from './emailer/emailer.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }), TypeOrmModule.forRootAsync({ useClass: DatabaseService }), DatabaseModule, UserModule, AuthenticationModule, AuthorizationModule, EmailerModule, LocationModule],
})
export class AppModule { }
