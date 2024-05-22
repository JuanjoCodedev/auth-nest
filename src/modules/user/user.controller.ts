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

  /**
   * ?Maneja la solicitud para obtener el perfil de un usuario especifico por su ID.
   *
   * *@Auth - Este endpoint permite a los usuarios con los roles de administrador o miembro obtener
   * *la información del perfil de un usuario dado su ID.
   *
   * *@param id - El ID del usuario cuyo perfil se desea obtener.
   * *@returns - Un objeto que contiene la información del perfil del usuario.
   */
  @ApiOkResponse({ description: 'Perfil del usuario obtenido.' })
  @Auth()
  @Get('profile/:id')
  async userProfile(@Param('id') id: number) {
    return this.userService.userProfile(id);
  }

  /**
   * ?Maneja la solicitud para actualizar la contraseña de un usuario en especifico.
   *
   * *@Auth - Este endpoint permite a los usuarios con los roles de administrador o miembro obtener
   * *la información del perfil de un usuario dado su ID.
   *
   * *@param id -  El ID del usuario cuya contraseña se necesita actualizar.
   * *@param updatePasswordDto - Contiene el campo (contraseña) que el usuario necesita ingresar para actualizar la contraseña.
   * *@returns - Devuelve un objeto que contiene el ID del usuario actualizado y la nueva contraseña.
   */
  @ApiOkResponse({ description: 'Contraseña actualizada con exito.' })
  @Auth()
  @Patch('recoverPassword/:id')
  async recoverPassword(@Param('id') id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.recoverPassword(id, updatePasswordDto);
  }
}
