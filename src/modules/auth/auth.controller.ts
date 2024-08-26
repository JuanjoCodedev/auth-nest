import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PersonDto, SignInDto, VerifyEmailDto } from 'src/shared/dtos/person.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * ?Crea una nueva cuenta de usuario.
   *
   * *@param signUpDto - Datos del usuario para la creación de la cuenta.
   * *@param req - Objeto de solicitud para obtener información adicional, como la dirección IP.
   * *@returns - Retorna un objeto con los datos creados incluyendo la dirección IP.
   */
  @Post('signUp')
  async createAccount(@Body() signUpDto: PersonDto, @Req() req: Request) {
    this.logger.log(`Solicitud de nueva cuenta recibida para el usuario ${signUpDto.email}`);
    const ipAddress = req.ip;
    return await this.authService.signUp(signUpDto, ipAddress);
  }

  /**
   * ?Inicia sesión en la aplicación.
   *
   * *@param signInDto - Credenciales del usuario para iniciar sesión.
   * *@param req - Objeto de solicitud para obtener información adicional (IP).
   * *@returns - Retorna un objeto con las credenciales del usuario.
   */
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Req() req: Request) {
    this.logger.log(`Solicitud de inicio de sesión recibida para el usuario ${signInDto.email}`);
    return await this.authService.signIn(signInDto, req);
  }

  /**
   * ?Renueva el token de acceso utilizando un token de actualización.
   *
   * *@param refreshToken  - Token de actualización
   * *@returns - Retorna un nuevo token de acceso.
   */
  @Post('refreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  /**
   * ?Envia un correo electrónico para restablecer la contraseña del usuario.
   *
   * *@param resetDto - Información del usuario como correo, nombre y ID.
   * *@returns - Retorna un objeto con los datos del usuario.
   */
  @Post('sendPasswordReset')
  async sendPasswordResetEmail(@Body() resetDto: VerifyEmailDto) {
    return await this.authService.sendPasswordResetEmail(resetDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Se inicia el flujo de autenticación con Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    this.logger.log(`Solicitud de inicio de sesión recibida para el usuario ${req.user.username}, ${req.user}`);
    return req.user;
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // Inicia el flujo de inicio de sesión de GitHub
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: any) {
    this.logger.log(`Solicitud de inicio de sesión recibida para el usuario ${req.user.username}, ${req.user}`);
    return req.user;
  }
}
