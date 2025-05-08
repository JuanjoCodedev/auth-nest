import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

/* Entity */
import { AccessLevelEntity } from '../access-level/access-level.entity';
import { RouteAccessEntity } from '../route-access/route-access.entity';

@Entity('accessLevelRouteAccess')
export class AccessLevelRouteAccessEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => AccessLevelEntity, (accessLevel) => accessLevel.accessLevelRouteAccess)
  @JoinColumn({ name: 'id_access_level' })
  accessLevel: AccessLevelEntity;

  @ManyToOne(() => RouteAccessEntity, (routeAccess) => routeAccess.accessLevelRouteAccess)
  @JoinColumn({ name: 'id_route_access' })
  routeAccess: RouteAccessEntity;
}
