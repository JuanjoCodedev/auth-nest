import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserRouteAccessGuard } from 'src/authorization/user_route_access/user_route_access.guard';
import { RoleAccessGuard } from 'src/authorization/role_route_access/role_route_access.guard';

@Injectable()
export class AuthorizationAccessGuard implements CanActivate {
  constructor(
    private readonly routeAccessGuard: UserRouteAccessGuard,
    private readonly roleAccessGuard: RoleAccessGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userHasAccess = await this.routeAccessGuard.canActivate(context);
    if (userHasAccess) return true;

    const roleHasAccess = await this.roleAccessGuard.canActivate(context);
    if (roleHasAccess) return true;

    throw new ForbiddenException('No tienes acceso a esta ruta.');
  }
}
