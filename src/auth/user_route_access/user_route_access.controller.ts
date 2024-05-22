import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRouteAccessService } from './user_route_access.service';

import { UserRouteAccessDto } from './user_route_access.dto';
import { Auth } from '../auth.interface';

import { TokenAuthGuard } from '../token/token.guard';
import { UserRouteAccessGuard } from './user_route_access.guard';

import { UserRouteAccessEntity } from './user_route_access.entity';

@ApiTags('Rutas de acceso')
@UseGuards(TokenAuthGuard, UserRouteAccessGuard)
@Controller('user-route-access')
export class UserRouteAccessController {
  constructor(private readonly _userRouteAccessService: UserRouteAccessService) {}

  @Post()
  public async createUserRouteAccess(@Body() body: UserRouteAccessDto): Promise<Auth.ApiResponse<UserRouteAccessEntity>> {
    return this._userRouteAccessService.createUserRouteAccess(body);
  }
}
