import { Body, Controller, Post } from '@nestjs/common';

import { RoleRouteAccessService } from './role_route_access.service';

import { RoleRouteAccessDto } from './role_route_access.dto';

@Controller('role-route-access')
export class RoleRouteAccessController {
  constructor(private readonly _roleRouteAccessSerivce: RoleRouteAccessService) {}

  @Post()
  public async createRoleRouteAccess(@Body() body: RoleRouteAccessDto) {
    return this._roleRouteAccessSerivce.createRoleRouteAccess(body);
  }
}
