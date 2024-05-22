import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RoleRouteAccessEntity } from '../role_route_access/role_route_access.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  status: boolean = false;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @OneToMany(() => RoleRouteAccessEntity, (access) => access.role)
  routeAccess: RoleRouteAccessEntity[];
}
