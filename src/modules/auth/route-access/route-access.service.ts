import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entity */
import { RouteAccessEntity } from './route-access.entity';

/* Service */
import { RouteAccessDto } from './route-access.dto';

/* Interface */
import { Int_Route_Access_Response } from './route-access.interface';

@Injectable()
export class RouteAccessService {
  constructor(
    @InjectRepository(RouteAccessEntity)
    private readonly routeAccessRepository: Repository<RouteAccessEntity>,
  ) {}

  async createRouteAccess(body: RouteAccessDto): Promise<Int_Route_Access_Response> {
    const existingRouteAccess = await this.routeAccessRepository.findOne({ where: { route: body.route } });

    if (existingRouteAccess) throw new ConflictException(`La ruta de acceso "${body.route}" ya está en uso. Por favor, prueba con otro nombre.`);

    const newRouteAccess = this.routeAccessRepository.create(body);
    const saveRouteAccess = await this.routeAccessRepository.save(newRouteAccess);

    return { message: 'Nueva ruta de acceso creada exitosamente.', data: saveRouteAccess };
  }
}
