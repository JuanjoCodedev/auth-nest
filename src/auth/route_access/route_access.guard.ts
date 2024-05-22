import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { match } from 'path-to-regexp';

import { RouteAccessEntity } from './route_access.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class RouteAccessGuard implements CanActivate {
  constructor(
    @InjectRepository(RouteAccessEntity)
    private readonly routeAccessRepo: Repository<RouteAccessEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user: UserEntity = request.user as UserEntity;

    if (!user) throw new ForbiddenException('Usuario no autenticado.');
    if (!user.status) throw new ForbiddenException('Cuenta inactiva.');

    const currentPath: string = request.path;

    const userRoutes: RouteAccessEntity[] = await this.routeAccessRepo.find({
      where: { user_id: user.id },
    });

    const hasAccess: boolean = userRoutes.some((routeEntry: RouteAccessEntity) => {
      return routeEntry.routes.some((route: string) => {
        const isMatch = match(route, { decode: decodeURIComponent });
        return isMatch(currentPath);
      });
    });

    if (!hasAccess) throw new ForbiddenException('No tienes acceso a esta ruta.');

    return true;
  }
}
