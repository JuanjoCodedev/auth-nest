import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { DatabaseService } from './database/database.service';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }), TypeOrmModule.forRootAsync({ useClass: DatabaseService }), DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
