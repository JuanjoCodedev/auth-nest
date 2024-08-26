import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('HOST_DATABASE'),
      port: parseInt(this.configService.get<string>('POSTGRES_PORT')),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('DATABASE'),
      synchronize: false,
      entities: [UserEntity],
      logging: ['error', 'warn', 'info', 'query'],
    };
  }
}
