import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRouteAccessEntity } from './user_route_access.entity';
import { UserRouteAccessDto } from './user_route_access.dto';
import { Auth } from '../auth.interface';

@Injectable()
export class UserRouteAccessService {
  constructor(
    @InjectRepository(UserRouteAccessEntity)
    private readonly _routeRepository: Repository<UserRouteAccessEntity>,
  ) {}

  private async _validateUserRouteAccess(user_id: number): Promise<UserRouteAccessEntity | null> {
    return await this._routeRepository.findOne({ where: { user_id } });
  }

  public async createUserRouteAccess(body: UserRouteAccessDto): Promise<Auth.ApiResponse<UserRouteAccessEntity>> {
    const existingUserRouteAccess = await this._validateUserRouteAccess(body.user_id);
    if (existingUserRouteAccess) throw new ConflictException('El usuario tiene asignado este permiso.');

    const newUserRouteAccess = this._routeRepository.create(body);
    const saveUserRouteAccess = await this._routeRepository.save(newUserRouteAccess);

    return { message: 'Ruta de acceso asignada correctamente.', data: saveUserRouteAccess };
  }
}
