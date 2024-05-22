import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PermissionsEntity } from 'src/modules/auth/permissions/permissions.entity';
import { RolesService } from 'src/modules/auth/roles/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly rolesService: RolesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado.');
    }

    const userId = user.sub;
    console.log('Authenticated User:', user, userId);

    const userRolesWithPermissions = await this.rolesService.getUserRolesWithPermissions(userId);
    if (!userRolesWithPermissions || userRolesWithPermissions.length === 0) {
      throw new ForbiddenException('El usuario no tiene roles asignados.');
    }
    console.log('User  Roles with Permissions:', JSON.stringify(userRolesWithPermissions, null, 2));

    const request = context.switchToHttp().getRequest();
    const route = request.route.path;
    const method = request.method;
    console.log('Route:', route);
    console.log('Method:', method);

    const hasAccess = userRolesWithPermissions.some((role) => role.rolPermissions.some((permissionEntity) => this.validatePermission(permissionEntity.permission, route)));

    console.log('Has Access:', hasAccess);

    if (!hasAccess) {
      throw new ForbiddenException(`El usuario no tiene acceso a la ruta ${route}`);
    }

    return true;
  }

  private validatePermission(permission: PermissionsEntity, route: string): boolean {
    const permissionRoute = permission.route;

    const normalizedRoute = this.normalizeRoute(route);
    const normalizedPermRoute = this.normalizeRoute(permissionRoute);

    return normalizedRoute === normalizedPermRoute;
  }

  private normalizeRoute(route: string): string {
    return route.replace(/\/:[^/]+/g, '/:id');
  }
}
