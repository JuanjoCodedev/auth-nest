import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RoleEntity } from 'src/auth/role/role.entity';
import { RoleRouteAccessEntity } from 'src/auth/role_route_access/role_route_access.entity';
import { UserRouteAccessEntity } from 'src/auth/user_route_access/user_route_access.entity';

import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.get<string>(`HOST_DATABASE`);
    const port = this.configService.get<string>(`POSTGRES_PORT`);
    const username = this.configService.get<string>(`POSTGRES_USER`);
    const password = this.configService.get<string>(`POSTGRES_PASSWORD`);
    const database = this.configService.get<string>(`DATABASE`);

    const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${database}`;

    return {
      type: 'postgres',
      url: connectionUrl,
      synchronize: false,
      entities: [UserEntity, UserRouteAccessEntity, RoleEntity, RoleRouteAccessEntity],
      logging: ['error', 'warn', 'info', 'query'],
    };
  }
}
