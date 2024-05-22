import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { RoleEntity } from 'src/authorization/role/role.entity';
import { RoleRouteAccessEntity } from 'src/authorization/role_route_access/role_route_access.entity';
import { UserRouteAccessEntity } from 'src/authorization/user_route_access/user_route_access.entity';

import { CountryEntity } from 'src/location/country/country.entity';
import { DepartmentEntity } from 'src/location/department/department.entity';
import { MunicipalityEntity } from 'src/location/municipality/municipality.entity';

import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.get<string>(`HOST_DATABASE`);
    const port = this.configService.get<string>(`POSTGRES_PORT`);
    const username = this.configService.get<string>(`POSTGRES_USER`);
    const password = this.configService.get<string>(`POSTGRES_PASSWORD`);
    const database = this.configService.get<string>(`DATABASE`);

    const pool_max = parseInt(this.configService.get<string>('POSTGRES_POOL_MAX') || '20', 10);
    const pool_min = parseInt(this.configService.get<string>('POSTGRES_POOL_MIN') || '5', 10);
    const idle_timeout = parseInt(this.configService.get<string>('POSTGRES_IDLE_TIMEOUT') || '30000', 10);

    const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${database}`;

    return {
      type: 'postgres',
      url: connectionUrl,
      synchronize: false,
      entities: [UserEntity, UserRouteAccessEntity, RoleEntity, RoleRouteAccessEntity, CountryEntity, DepartmentEntity, MunicipalityEntity],
      logging: ['error', 'warn', 'info', 'query'], // quita "query" en producción para no llenar discos con logs innecesarios
      extra: {
        max: pool_max,
        min: pool_min,
        idleTimeoutMillis: idle_timeout,
      },
    };
  }
}
