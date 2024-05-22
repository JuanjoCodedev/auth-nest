import { Body, Controller, Post } from '@nestjs/common';

import { RoleService } from './role.service';

import { RoleDto } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Post()
  public async createRol(@Body() body: RoleDto) {
    return this._roleService.createRole(body);
  }
}
