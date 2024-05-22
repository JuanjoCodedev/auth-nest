import { Body, Controller, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { UserDto } from './user.dto';

import { TokenAuthGuard } from 'src/authentication/token/token.guard';
import { AuthorizationAccessGuard } from 'src/authorization/authorization.guard';

@ApiTags('Usuarios')
@UseGuards(TokenAuthGuard, AuthorizationAccessGuard)
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
