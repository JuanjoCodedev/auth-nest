import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from 'express';
import { match } from 'path-to-regexp';

import { UserRouteAccessEntity } from './user_route_access.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class UserRouteAccessGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRouteAccessEntity)
    private readonly userRouteRepo: Repository<UserRouteAccessEntity>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserEntity;

    if (!user) return false;

    const access = await this.userRouteRepo.findOne({ where: { user_id: user.id } });
    if (!access || access.status === false) return false;
    if (!access.routes || access.routes.length === 0) return false;

    return access.routes.some((route) => match(route, { decode: decodeURIComponent })(request.path));
  }
}
