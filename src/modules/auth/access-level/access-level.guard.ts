import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

/* Entity */
import { RouteAccessEntity } from 'src/modules/auth/route-access/route-access.entity';

/* Service */
import { AccessLevelService } from 'src/modules/auth/access-level/access-level.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(private readonly rolesService: AccessLevelService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado.');
    }

    const userId = user.sub;
    console.log('Authenticated User:', user, userId);

    const userAccessLevelWithRouteAccess = await this.rolesService.getUserAccessLevelWithRouteAccess(userId);
    if (!userAccessLevelWithRouteAccess || userAccessLevelWithRouteAccess.length === 0) {
      throw new ForbiddenException('El usuario no tiene roles asignados.');
    }
    console.log('User Access level with Route access:', JSON.stringify(userAccessLevelWithRouteAccess, null, 2));

    const request = context.switchToHttp().getRequest();
    const route = request.route.path;
    const method = request.method;
    console.log('Route:', route);
    console.log('Method:', method);

    const hasAccess = userAccessLevelWithRouteAccess.some((accessLevel) => accessLevel.accessLevelRouteAccess.some((permissionEntity) => this.validateRouteAccess(permissionEntity.routeAccess, route)));

    console.log('Has Access:', hasAccess);

    if (!hasAccess) {
      throw new ForbiddenException(`El usuario no tiene acceso a la ruta ${route}`);
    }

    return true;
  }

  private validateRouteAccess(routeAccess: RouteAccessEntity, route: string): boolean {
    const permissionRoute = routeAccess.route;

    const normalizedRoute = this.normalizeRoute(route);
    const normalizedPermRoute = this.normalizeRoute(permissionRoute);

    return normalizedRoute === normalizedPermRoute;
  }

  private normalizeRoute(route: string): string {
    return route.replace(/\/:[^/]+/g, '/:id');
  }
}
