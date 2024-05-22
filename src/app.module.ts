import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnService } from './config/config.service';
import { UserModule } from './modules/user.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true }), TypeOrmModule.forRootAsync({ useClass: ConnService }), UserModule],
  controllers: [AppController],
  providers: [ConnService],
})
export class AppModule {}
