import { UserEntity } from 'src/modules/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolPermissionsEntity } from '../rol_permissions/rol_permissions.entity';

@Entity('rol')
export class RolesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying', unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.id_rol)
  users: UserEntity;

  @OneToMany(() => RolPermissionsEntity, (rolPermission) => rolPermission.role)
  rolPermissions: RolPermissionsEntity[];
}
