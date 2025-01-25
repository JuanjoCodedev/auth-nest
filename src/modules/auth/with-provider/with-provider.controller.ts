import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('with-provider')
export class WithProviderController {
  constructor() {}

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

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirección tras autenticación con Google.' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con Google.', type: Object })
  @ApiResponse({ status: 401, description: 'Error de autenticación con Google.' })
  async googleAuthRedirect(@Req() req: any) {
    return req.user; // Devuelve la información del usuario autenticado que es almacenada en `req.user`
  }

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

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Redirección tras autenticación con GitHub.' })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con GitHub.', type: Object })
  @ApiResponse({ status: 401, description: 'Error de autenticación con GitHub.' })
  async githubAuthRedirect(@Req() req: any) {
    return req.user; // Devuelve la información del usuario autenticado que es almacenada en `req.user`
  }
}
