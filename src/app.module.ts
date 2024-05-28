import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnService } from './core/services/conn.service';
import { DatabaseModule } from './modules/database.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }), TypeOrmModule.forRootAsync({ useClass: ConnService }), AuthModule, UserModule, DatabaseModule],
  providers: [ConnService],
})
export class AppModule {}
