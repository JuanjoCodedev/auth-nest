import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../interfaces';

export const ROLES_KEY = 'roles';
export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);
