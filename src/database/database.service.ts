import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RouteAccessEntity } from 'src/auth/route_access/route_access.entity';

import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const env = this.configService.get<string>('NODE_ENV') === 'production' ? 'PRODUCTION' : 'DEVELOPMENT';

    const host = this.configService.get<string>(`HOST_DATABASE_${env}`);
    const port = this.configService.get<string>(`POSTGRES_PORT_${env}`);
    const username = this.configService.get<string>(`POSTGRES_USER_${env}`);
    const password = this.configService.get<string>(`POSTGRES_PASSWORD_${env}`);
    const database = this.configService.get<string>(`DATABASE_${env}`);

    const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${database}`;

    return {
      type: 'postgres',
      url: connectionUrl,
      synchronize: false,
      entities: [UserEntity, RouteAccessEntity],
      logging: ['error', 'warn', 'info', 'query'],
    };
  }
}
