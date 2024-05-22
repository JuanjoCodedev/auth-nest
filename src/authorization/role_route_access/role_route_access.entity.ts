import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity('role_route_access')
export class RoleRouteAccessEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  status: boolean = false;

  @Column({ type: 'integer' })
  role_id: number;

  @ManyToOne(() => RoleEntity, (role) => role.routeAccess)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @Column({ type: 'varchar', array: true })
  routes: string[];
}
