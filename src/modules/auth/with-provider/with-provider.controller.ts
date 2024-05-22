import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('with-provider')
export class WithProviderController {
  constructor() {}

  /**
   * ?Ruta para iniciar el flujo de autenticación con Google.
   * ?Esta ruta redirige al usuario al flujo de autenticación de Google.
   *
   * *@returns {void} Redirige al usuario a la página de login de Google.
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Inicia el flujo de autenticación con Google.' })
  @ApiResponse({ status: 200, description: 'Solicitud exitosa para iniciar autenticación con Google.' })
  @ApiResponse({ status: 302, description: 'Redirección al flujo de autenticación de Google.' })
  @ApiResponse({ status: 401, description: 'Error al intentar autenticar con Google.' })
  async googleAuth() {
    // Se inicia el flujo de autenticación con Google
    // El guard de Passport maneja la redirección automáticamente.
  }

  /**
   * ?Ruta de callback que recibe la respuesta de Google tras la autenticación.
   * ?Esta ruta es llamada por Google después de la autenticación exitosa y redirige al usuario de vuelta a la aplicación.
   *
   * *@param {any} req - Objeto de solicitud que contiene la información del usuario autenticado.
   * *@returns {any} El usuario autenticado, que será devuelto a la aplicación.
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirección tras autenticación con Google.' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con Google.', type: Object })
  @ApiResponse({ status: 401, description: 'Error de autenticación con Google.' })
  async googleAuthRedirect(@Req() req: any) {
    return req.user; // Devuelve la información del usuario autenticado que es almacenada en `req.user`
  }

  /**
   * ?Ruta para iniciar el flujo de autenticación con GitHub.
   * ?Esta ruta redirige al usuario al flujo de autenticación de GitHub.
   *
   * *@returns {void} Redirige al usuario a la página de login de GitHub.
   */
  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Inicia el flujo de inicio de sesión de GitHub.' })
  @ApiResponse({ status: 200, description: 'Solicitud exitosa para iniciar autenticación con Github.' })
  @ApiResponse({ status: 302, description: 'Redirección al flujo de autenticación de Github.' })
  @ApiResponse({ status: 401, description: 'Error al intentar autenticar con Github.' })
  async githubAuth() {
    // Inicia el flujo de inicio de sesión de GitHub
    // El guard de Passport maneja la redirección automáticamente.
  }

  /**
   * ?Ruta de callback que recibe la respuesta de GitHub tras la autenticación.
   * ?Esta ruta es llamada por GitHub después de la autenticación exitosa y redirige al usuario de vuelta a la aplicación.
   *
   * *@param {any} req - Objeto de solicitud que contiene la información del usuario autenticado.
   * *@returns {any} El usuario autenticado, que será devuelto a la aplicación.
   */
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Redirección tras autenticación con GitHub.' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con GitHub.', type: Object })
  @ApiResponse({ status: 401, description: 'Error de autenticación con GitHub.' })
  async githubAuthRedirect(@Req() req: any) {
    return req.user; // Devuelve la información del usuario autenticado que es almacenada en `req.user`
  }
}
