import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/* Entity */
import { UserEntity } from 'src/modules/user/user.entity';
import { AccessLevelRouteAccessEntity } from '../access-level_route-access/access-level_route-access.entity';

@Entity('accessLevel')
export class AccessLevelEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying', unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.id_rol)
  users: UserEntity;

  @OneToMany(() => AccessLevelRouteAccessEntity, (accessLevelRouteAccess) => accessLevelRouteAccess.accessLevel)
  accessLevelRouteAccess: AccessLevelRouteAccessEntity[];
}
