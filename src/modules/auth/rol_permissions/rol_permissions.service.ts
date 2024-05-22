import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolPermissionsEntity } from './rol_permissions.entity';
import { Repository } from 'typeorm';
import { RolPermissionsDto } from './rol_permissions.dto';

@Injectable()
export class RolPermissionsService {
  constructor(
    @InjectRepository(RolPermissionsEntity)
    private readonly rolPermissionRepository: Repository<RolPermissionsEntity>,
  ) {}

  /**
   * ?Asigna un rol y permisos específicos creando una nueva relación en la base de datos.
   *
   * *@param body - Datos necesarios para crear la relación rol-permiso.
   * *@returns - Un objeto con un mensaje de éxito y los datos creados.
   */
  async AssignRoleAndPermissions(body: RolPermissionsDto) {
    // Buscar las entidades Role y Permission usando los IDs proporcionados en el DTO
    const role = await this.rolPermissionRepository.findOne({ where: { id: body.idRol } });
    if (!role) throw new NotFoundException(`Rol con ID ${body.idRol} no encontrado.`);

    const permission = await this.rolPermissionRepository.findOne({ where: { id: body.idPermission } });
    if (!permission) throw new NotFoundException(`Permiso con ID ${body.idPermission} no encontrado.`);

    // Crear una nueva relación de tipo RolPermissionsEntity
    const newRolPermission = this.rolPermissionRepository.create({
      role, // Asignar la entidad completa Role
      permission, // Asignar la entidad completa Permission
    });

    // Guardar la nueva relación
    const saveRolPermission = await this.rolPermissionRepository.save(newRolPermission);

    return { message: 'Permiso y rol asignados correctamente.', data: saveRolPermission };
  }
}
