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
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user: UserEntity = request.user as UserEntity;

    if (!user || !user.role) return false;

    const currentPath = request.path;

    const roleAccess = await this.roleAccessRepo.findOne({ where: { role_id: user.role.id } });
    if (!roleAccess || roleAccess.status === false) return false;
    if (!roleAccess.routes || roleAccess.routes.length === 0) return false;

    return roleAccess.routes.some((route) => match(route, { decode: decodeURIComponent })(currentPath));
  }
}
