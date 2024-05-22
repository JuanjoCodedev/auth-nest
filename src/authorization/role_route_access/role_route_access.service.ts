import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleRouteAccessEntity } from './role_route_access.entity';
import { RoleRouteAccessDto } from './role_route_access.dto';
import { Authentication } from 'src/authentication/authentication.interface';

@Injectable()
export class RoleRouteAccessService {
  constructor(
    @InjectRepository(RoleRouteAccessEntity)
    private readonly _roleRouteAccessRepository: Repository<RoleRouteAccessEntity>,
  ) {}

  private async _validateRoleRouteAccess(role_id: number): Promise<RoleRouteAccessEntity> {
    return await this._roleRouteAccessRepository.findOne({ where: { role_id } });
  }

  public async createRoleRouteAccess(body: RoleRouteAccessDto): Promise<Authentication.ApiResponse<RoleRouteAccessEntity>> {
    const existingUserRouteAccess = await this._validateRoleRouteAccess(body.role_id);
    if (existingUserRouteAccess) throw new ConflictException('El usuario tiene asignado este permiso.');

    const newUserRouteAccess = this._roleRouteAccessRepository.create({ ...body, status: true });
    const saveUserRouteAccess = await this._roleRouteAccessRepository.save(newUserRouteAccess);

    return { message: 'Ruta de acceso asignada correctamente.', data: saveUserRouteAccess };
  }
}
