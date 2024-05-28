import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/models/user.entity';

@Injectable()
export class ConnService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.HOSTDB,
      port: parseInt(process.env.PORTDB),
      username: process.env.USERNAMEDB,
      password: process.env.PASSDB,
      database: process.env.DB,
      synchronize: false,
      entities: [UserEntity],
      logging: ['error', 'warn', 'info', 'query'],
    };
  }
}
