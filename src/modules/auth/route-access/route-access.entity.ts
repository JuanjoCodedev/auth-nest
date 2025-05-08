import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessLevelRouteAccessEntity } from '../access-level_route-access/access-level_route-access.entity';

@Entity('routeAccess')
export class RouteAccessEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying', unique: true })
  route: string;

  @OneToMany(() => AccessLevelRouteAccessEntity, (accessLevelRouteAccess) => accessLevelRouteAccess.routeAccess)
  accessLevelRouteAccess: AccessLevelRouteAccessEntity[];
}
