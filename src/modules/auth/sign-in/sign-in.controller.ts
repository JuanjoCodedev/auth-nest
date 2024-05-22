import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInService } from './sign-in.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SignInDto } from './sign-in.dto';

@ApiTags('Autenticación')
@Controller('sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  /**
   * ?Inicia sesión en la aplicación.
   *
   * *@param signInDto - Credenciales del usuario para iniciar sesión.
   * *@param req - Objeto de solicitud para obtener información adicional (IP).
   * *@returns - Retorna un objeto con las credenciales del usuario.
   */
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Post('signIn')
  @ApiOperation({ summary: 'Inicia sesión en la aplicación.' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso.', type: Object })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async signIn(@Body() signInDto: SignInDto, @Req() req: Request) {
    return await this.signInService.signIn(signInDto, req);
  }
}
