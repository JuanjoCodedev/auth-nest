import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SignInDto } from './sign-in.dto';
import { TokensService } from '../tokens/tokens.service';
import { AuthService } from '../auth.service';
import { EMailerService } from 'src/modules/mailer/mailer.service';

@Injectable()
export class SignInService {
  constructor(
    @InjectPinoLogger(SignInService.name)
    private readonly logger: PinoLogger,

    private authService: AuthService,
    private tokenService: TokensService,
    private readonly mailerService: EMailerService,
  ) {}

  /**
   * ?Valida las credenciales de un usuario y verifica la dirección IP.
   *
   * *@param useremail - Email del usuario para la validación.
   * *@param userpassword - Contraseña del usuario para la validación.
   * *@param req - Objeto de solicitud que contiene la IP del usuario.
   * *@throws UnauthorizedException - Si el email no es encontrado, la contraseña es incorrecta, o la IP no coincide.
   * *@returns Los detalles del usuario sin la contraseña.
   */
  async validateUser(useremail: string, userpassword: string, req?: Request): Promise<any> {
    const user = await this.authService.findOneByEmail(useremail);
    if (!user) throw new UnauthorizedException('Email no fue encontrado');

    const isPasswordValid = await compare(userpassword, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta.');

    const { password: _, ...result } = user;
    this.logger.debug({ context: 'AuthService', message: `Usuario ${useremail} validado` });
    return result;
  }

  /**
   * ?Inicia sesión en el sistema y genera tokens para el usuario.
   *
   * *@param signInDto - Datos de inicio de sesión del usuario.
   * *@param req - Objeto de solicitud que contiene la IP del usuario.
   * *@returns Un objeto que contiene tokens de autenticación para el usuario.
   */
  async signIn(signInDto: SignInDto, req: Request) {
    const user = await this.validateUser(signInDto.email, signInDto.password, req);
    return this.tokenService.generateAccessAndRefreshTokens(user);
  }

  /**
   * ?Envía un correo electrónico para iniciar sesión en un dispositivo diferente.
   *
   * *@param reset - Contiene la información del usuario como email, uid, y nombre.
   * *@throws UnauthorizedException - Si el email no es válido.
   * *@returns Un objeto con un mensaje de confirmación y el token de inicio de sesión.
   */
  async sendUnkanownIpEmail(reset: string) {
    const user = await this.authService.findOneByEmail(reset);
    if (!user) throw new UnauthorizedException('Este email es invalido, por favor vuelva a intentarlo.');

    const payload = { uid: user.id, roles: user.id_rol, purpose: 'Reset Password' };
    const tokenReset = await this.tokenService.generateToken(payload, '30m', 'JWT_SECRET');

    const checkLink = `http://localhost:4200/auth/recover/password/?uid=${user.id}&token=${tokenReset}`;

    await this.mailerService.sendUnknowIpEmail(
      {
        email: user.email,
        name: user.name,
      },
      checkLink,
    );

    return { message: `Se ha enviado el correo electronico a: ${user.email}`, tokenReset };
  }
}
