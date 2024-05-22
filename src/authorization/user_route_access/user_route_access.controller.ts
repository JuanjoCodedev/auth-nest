import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRouteAccessService } from './user_route_access.service';

import { UserRouteAccessDto } from './user_route_access.dto';
import { Authentication } from 'src/authentication/authentication.interface';

import { TokenAuthGuard } from 'src/authentication/token/token.guard';
import { UserRouteAccessGuard } from './user_route_access.guard';

import { UserRouteAccessEntity } from './user_route_access.entity';

@ApiTags('Rutas de acceso')
@UseGuards(TokenAuthGuard, UserRouteAccessGuard)
@Controller('user-route-access')
export class UserRouteAccessController {
  constructor(private readonly _userRouteAccessService: UserRouteAccessService) {}

  @Post()
  public async createUserRouteAccess(@Body() body: UserRouteAccessDto): Promise<Authentication.ApiResponse<UserRouteAccessEntity>> {
    return this._userRouteAccessService.createUserRouteAccess(body);
  }
}
