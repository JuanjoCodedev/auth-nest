import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';
import { PermissionsEntity } from '../permissions/permissions.entity';

@Entity('rol_permissions')
export class RolPermissionsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => RolesEntity, (role) => role.rolPermissions)
  @JoinColumn({ name: 'idRol' })
  role: RolesEntity;

  @ManyToOne(() => PermissionsEntity, (permission) => permission.rolPermissions)
  @JoinColumn({ name: 'idPermission' })
  permission: PermissionsEntity;
}
