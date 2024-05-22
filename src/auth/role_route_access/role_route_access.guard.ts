import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from 'express';
import { match } from 'path-to-regexp';

import { RoleRouteAccessEntity } from './role_route_access.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class RoleAccessGuard implements CanActivate {
  constructor(
    @InjectRepository(RoleRouteAccessEntity)
    private readonly roleAccessRepo: Repository<RoleRouteAccessEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user: UserEntity = request.user as UserEntity;

    if (!user || !user.role) return false;

    const currentPath = request.path;

    const roleRoutes = await this.roleAccessRepo.find({
      where: { role_id: user.role.id },
    });

    return roleRoutes.some((entry) => entry.routes.some((route) => match(route, { decode: decodeURIComponent })(currentPath)));
  }
}
