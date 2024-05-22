import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RouteAccessService } from './route_access.service';

import { RouteAccessDto } from './route_access.dto';
import { Auth } from '../auth.interface';

import { TokenAuthGuard } from '../token/token.guard';
import { RouteAccessGuard } from './route_access.guard';

import { RouteAccessEntity } from './route_access.entity';

@ApiTags('Rutas de acceso')
@UseGuards(TokenAuthGuard, RouteAccessGuard)
@Controller('route-access')
export class RouteAccessController {
  constructor(private readonly _routeAccessService: RouteAccessService) {}

  @Post()
  public async createRouteAccess(@Body() body: RouteAccessDto): Promise<Auth.ApiResponse<RouteAccessEntity>> {
    return this._routeAccessService.createRouteAccess(body);
  }
}
