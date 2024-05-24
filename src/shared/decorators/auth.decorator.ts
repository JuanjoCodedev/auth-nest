import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleEnum } from '../interfaces';
import { AuthGuard, RolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export function Auth(...role: RoleEnum[]) {
  return applyDecorators(Roles(...role), UseGuards(AuthGuard, RolesGuard));
}
