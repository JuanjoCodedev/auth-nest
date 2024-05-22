import { UserEntity } from 'src/modules/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolPermissionsEntity } from '../rol_permissions/rol_permissions.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying', unique: true })
  rol: string;

  @OneToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity;

  @OneToMany(() => RolPermissionsEntity, (rolPermission) => rolPermission.role)
  rolPermissions: RolPermissionsEntity[];
}
