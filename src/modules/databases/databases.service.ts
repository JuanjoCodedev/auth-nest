import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/* Entidades */
import { UserEntity } from '../user/user.entity';
import { RolesEntity } from '../auth/roles/roles.entity';
import { PermissionsEntity } from '../auth/permissions/permissions.entity';
import { RolPermissionsEntity } from '../auth/rol_permissions/rol_permissions.entity';
import { LogEntity } from '../log/log.entity';
import { CityEntity } from '../location/city/city.entity';
import { CountryEntity } from '../location/country/country.entity';
import { DepartmentEntity } from '../location/department/department.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
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
      entities: [UserEntity, RolesEntity, PermissionsEntity, RolPermissionsEntity, LogEntity, CityEntity, CountryEntity, DepartmentEntity],
      logging: ['error', 'warn', 'info', 'query'],
    };
  }
}
