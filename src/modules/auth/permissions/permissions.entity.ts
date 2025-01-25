import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
