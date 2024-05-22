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

    // Obtener roles y permisos del usuario
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

    // Verifica si algún rol tiene permisos para la ruta específica
    const hasAccess = userRolesWithPermissions.some((role) =>
      role.rolPermissions.some(
        (permissionEntity) => this.validatePermission(permissionEntity.permission, route), // Asegúrate de usar la propiedad correcta
      ),
    );

    console.log('Has Access:', hasAccess);

    if (!hasAccess) {
      throw new ForbiddenException(`El usuario no tiene acceso a la ruta ${route}`);
    }

    return true;
  }

  private validatePermission(permission: PermissionsEntity, route: string): boolean {
    // Accede al nombre o la propiedad que representa el permiso como cadena
    const permissionRoute = permission.permissions; // Ajusta esto según el campo que almacena el nombre del permiso.

    // Normaliza el permiso
    const normalizedRoute = this.normalizeRoute(route);
    const normalizedPermRoute = this.normalizeRoute(permissionRoute);

    // Compara solo la ruta
    return normalizedRoute === normalizedPermRoute;
  }

  private normalizeRoute(route: string): string {
    // Normaliza la ruta reemplazando cualquier parámetro dinámico con un valor genérico
    return route.replace(/\/:[^/]+/g, '/:id'); // Cambia cualquier parámetro dinámico a "/:id"
  }
}
