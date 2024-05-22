import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RouteAccessEntity } from './route_access.entity';

import { RouteAccessDto } from './route_access.dto';
import { Auth } from '../auth.interface';

@Injectable()
export class RouteAccessService {
  constructor(
    @InjectRepository(RouteAccessEntity)
    private readonly _routeRepository: Repository<RouteAccessEntity>,
  ) {}

  private async _validateRouteAccess(user_id: number, routes: string): Promise<RouteAccessEntity | null> {
    return await this._routeRepository.findOne({ where: { user_id, routes } });
  }

  public async createRouteAccess(body: RouteAccessDto): Promise<Auth.ApiResponse<RouteAccessEntity>> {
    const existingRouteAccess = await this._validateRouteAccess(body.user_id, body.route);
    if (existingRouteAccess) throw new ConflictException('El usuario tiene asignado este permiso.');

    const newRouteAccess = this._routeRepository.create(body);
    const saveRouteAccess = await this._routeRepository.save(newRouteAccess);

    return { message: 'Permiso asignado correctamente.', data: saveRouteAccess };
  }
}
