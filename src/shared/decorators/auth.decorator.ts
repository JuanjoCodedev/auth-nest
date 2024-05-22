import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/sign-in/auth.guard';
import { RolesGuard } from '../../modules/auth/roles/roles.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard, RolesGuard));
}
