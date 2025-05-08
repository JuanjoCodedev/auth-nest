import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { AccessLevelRouteAccessEntity } from './access-level_route-access.entity';
import { AccessLevelEntity } from '../access-level/access-level.entity';
import { RouteAccessEntity } from '../route-access/route-access.entity';

/* Dtos */
import { AccessLevelRouteAccessDto } from './access-level_route-access.dto';

/* Interface */
import { Int_Access_Level_Route_Access_Response } from './access-level_route-access.interface';

@Injectable()
export class AccessLevelRouteAccess {
  constructor(
    @InjectRepository(AccessLevelRouteAccessEntity)
    private readonly accessLevelRouteAccessRepository: Repository<AccessLevelRouteAccessEntity>,

    @InjectRepository(AccessLevelEntity)
    private readonly accessLevelRepository: Repository<AccessLevelEntity>,

    @InjectRepository(RouteAccessEntity)
    private readonly routeAccessRepository: Repository<RouteAccessEntity>,
  ) { }

  async AssignAccessLevelAndRouteAccess(body: AccessLevelRouteAccessDto): Promise<Int_Access_Level_Route_Access_Response> {
    const existingAccessLevel = await this.accessLevelRepository.findOne({ where: { id: body.id_access_level } });
    if (!existingAccessLevel) throw new NotFoundException(`Nivel de acceso con ID ${body.id_access_level} no encontrado.`);

    const existingRouteAccess = await this.routeAccessRepository.findOne({ where: { id: body.id_route_access } });
    if (!existingRouteAccess) throw new NotFoundException(`Ruta de acceso con ID ${body.id_route_access} no encontrada.`);

    const newAccessLevelRouteAccess = this.accessLevelRouteAccessRepository.create({ accessLevel: existingAccessLevel, routeAccess: existingRouteAccess });

    const saveAccessLevelRouteAccess = await this.accessLevelRouteAccessRepository.save(newAccessLevelRouteAccess);

    return { message: 'Ruta de acceso y nivel de acceso asignados correctamente.', data: saveAccessLevelRouteAccess };
  }
}
