import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/sign-in/auth.guard';
import { AccessLevelGuard } from '../../modules/auth/access-level/access-level.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard, AccessLevelGuard));
}
