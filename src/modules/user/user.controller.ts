import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { UpdatePasswordDto } from './user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiUnauthorizedResponse({
  description: 'Se necesita un token de acceso para consumir el endpoint.',
})
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'Perfil del usuario obtenido.' })
  @Auth()
  @Get('profile/:id')
  async userProfile(@Param('id') id: number) {
    return this.userService.userProfile(id);
  }

  @ApiOkResponse({ description: 'Contraseña actualizada con exito.' })
  @Auth()
  @Patch('recoverPassword/:id')
  async recoverPassword(@Param('id') id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.recoverPassword(id, updatePasswordDto);
  }
}
