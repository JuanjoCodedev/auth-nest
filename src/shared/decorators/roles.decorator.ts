import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../interfaces/user.interface';

export const ROLES_KEY = 'roles';
export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);
