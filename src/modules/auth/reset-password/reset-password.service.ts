import { TokensService } from './../tokens/tokens.service';
import { EMailerService } from 'src/modules/mailer/mailer.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './resetPassword.dto';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    private readonly eMailerService: EMailerService,
  ) {}

  /**
   * ?Envía un correo electrónico para restablecer la contraseña del usuario.
   *
   * *@param reset - Contiene la información del usuario como email y uid. El UID debe coincidir
   * *con el UID del usuario encontrado mediante el correo electrónico.
   *
   * *@throws UnauthorizedException - Si el correo electrónico proporcionado no existe
   * *en la base de datos o el UID no coincide con el correo electrónico.
   *
   * *@returns Un objeto con un mensaje de confirmación que indica que el
   * *correo electrónico de recuperación ha sido enviado.
   */
  async sendPasswordResetEmail(reset: ResetPasswordDto) {
    const user = await this.authService.findOneByEmail(reset.email);

    if (!user) throw new UnauthorizedException('Este email es invalido, por favor vuelva a intentarlo.');

    const newPassword = this.authService.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update({ id: user.id }, { password: hashedPassword });

    const payload = { uid: user.id, roles: user.id_rol, purpose: 'Reset Password' };
    const tokenReset = await this.tokensService.generateToken(payload, '30m', 'JWT_SECRET');

    const checkLink = `http://localhost:8100/auth/recover-pass/?uid=${user.id}&token=${tokenReset}`;

    await this.eMailerService.sendPasswordResetEmail(
      {
        email: user.email,
        name: user.name,
      },
      newPassword,
      checkLink,
    );

    return { message: `El código de recuperación de contraseña ha sido enviado a la dirección de correo electrónico: ${user.email}` };
  }
}
