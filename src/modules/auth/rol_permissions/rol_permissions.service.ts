import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RolPermissionsEntity } from './rol_permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from '../roles/roles.entity';
import { PermissionsEntity } from '../permissions/permissions.entity';
import { RolPermissionsDto } from './rol_permissions.dto';

@Injectable()
export class RolPermissionsService {
  constructor(
    @InjectRepository(RolPermissionsEntity)
    private readonly rolPermissionRepository: Repository<RolPermissionsEntity>,

    @InjectRepository(RolesEntity)
    private readonly rolRepository: Repository<RolesEntity>,

    @InjectRepository(PermissionsEntity)
    private readonly permissionRepository: Repository<PermissionsEntity>,
  ) {}

  async AssignRoleAndPermissions(body: RolPermissionsDto) {
    const role = await this.rolRepository.findOne({ where: { id: body.id_rol } });
    if (!role) throw new NotFoundException(`Rol con ID ${body.id_rol} no encontrado.`);

    const permission = await this.permissionRepository.findOne({ where: { id: body.id_permissions } });
    if (!permission) throw new NotFoundException(`Permiso con ID ${body.id_permissions} no encontrado.`);

    const newRolPermission = this.rolPermissionRepository.create({ role, permission });

    const saveRolPermission = await this.rolPermissionRepository.save(newRolPermission);

    return { message: 'Permiso y rol asignados correctamente.', data: saveRolPermission };
  }
}
