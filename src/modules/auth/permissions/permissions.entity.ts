import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';
import { RolPermissionsEntity } from '../rol_permissions/rol_permissions.entity';

@Entity('permissions')
export class PermissionsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying', unique: true })
  route: string;

  @OneToMany(() => RolPermissionsEntity, (rolPermission) => rolPermission.permission)
  rolPermissions: RolPermissionsEntity[];
}
