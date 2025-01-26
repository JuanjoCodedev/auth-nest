import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { RolPermissionsEntity } from './rol_permissions.entity';
import { RolesEntity } from '../roles/roles.entity';
import { PermissionsEntity } from '../permissions/permissions.entity';

/* Dtos */
import { RolPermissionsDto } from './rol_permissions.dto';

/* Interface */
import { Int_Rol_Permissions_Response } from './rol_permissions.interface';

@Injectable()
export class RolPermissionsService {
  constructor(
    @InjectRepository(RolPermissionsEntity)
    private readonly rolPermissionRepository: Repository<RolPermissionsEntity>,

    @InjectRepository(RolesEntity)
    private readonly rolRepository: Repository<RolesEntity>,

    @InjectRepository(PermissionsEntity)
    private readonly permissionRepository: Repository<PermissionsEntity>,
  ) { }

  async AssignRoleAndPermissions(body: RolPermissionsDto): Promise<Int_Rol_Permissions_Response> {
    const role = await this.rolRepository.findOne({ where: { id: body.id_rol } });
    if (!role) throw new NotFoundException(`Rol con ID ${body.id_rol} no encontrado.`);

    const permission = await this.permissionRepository.findOne({ where: { id: body.id_permissions } });
    if (!permission) throw new NotFoundException(`Permiso con ID ${body.id_permissions} no encontrado.`);

    const newRolPermission = this.rolPermissionRepository.create({ role, permission });

    const saveRolPermission = await this.rolPermissionRepository.save(newRolPermission);

    return { message: 'Permiso y rol asignados correctamente.', data: saveRolPermission };
  }
}
