import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { SignInDto } from './sign-in.dto';
import { TokensService } from '../tokens/tokens.service';
import { AuthService } from '../auth.service';
import { EMailerService } from 'src/modules/mailer/mailer.service';

@Injectable()
export class SignInService {
  private readonly _logger = new Logger(SignInService.name);

  constructor(
    private authService: AuthService,
    private tokenService: TokensService,
    private readonly mailerService: EMailerService,
  ) {}

  async validateUser(useremail: string, userpassword: string, req?: Request): Promise<any> {
    const user = await this.authService.findOneByEmail(useremail);
    if (!user) throw new UnauthorizedException('Email no fue encontrado');

    const isPasswordValid = await compare(userpassword, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Contraseña incorrecta.');

    const { password: _, ...result } = user;
    this._logger.debug({ context: 'AuthService', message: `Usuario ${useremail} validado` });
    return result;
  }

  async signIn(signInDto: SignInDto, req: Request) {
    const user = await this.validateUser(signInDto.email, signInDto.password, req);
    return this.tokenService.generateAccessAndRefreshTokens(user);
  }

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
