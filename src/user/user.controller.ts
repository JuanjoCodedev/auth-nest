import { Body, Controller, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { UserDto } from './user.dto';

import { TokenAuthGuard } from 'src/auth/token/token.guard';
import { RouteAccessGuard } from 'src/auth/route_access/route_access.guard';

@ApiTags('Usuarios')
@UseGuards(TokenAuthGuard, RouteAccessGuard)
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Patch('profile/:id')
  public async updateProfile(@Param('id') id: number, @Body() body: UserDto) {
    return this._userService.UpdateProfile(id, body);
  }

  @Put('/:id')
  public async updateStatus(@Param('id') id: number) {
    return this._userService.updateStatus(id);
  }
}
