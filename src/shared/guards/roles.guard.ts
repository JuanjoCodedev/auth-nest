import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleEnum } from '../../shared/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!roles || !roles.length) return true;

    const { user } = context.switchToHttp().getRequest();

    return roles.some((role) => user.roles === role);
  }
}
