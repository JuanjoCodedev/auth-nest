import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Service */
import { TokensService } from './../tokens/tokens.service';
import { EMailerService } from 'src/modules/mailer/mailer.service';
import { AuthService } from 'src/modules/auth/auth.service';

/* Entity */
import { UserEntity } from 'src/modules/user/user.entity';

/* Dtos */
import { ResetPasswordDto } from './resetPassword.dto';

/* Interface */
import { Int_Reset_Pass_Response } from './reset-pass.interface';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    private readonly eMailerService: EMailerService,
  ) { }

  async sendPasswordResetEmail(reset: ResetPasswordDto): Promise<Int_Reset_Pass_Response> {
    const user = await this.authService.findOneByEmail(reset.email);

    if (!user) throw new UnauthorizedException('Este email es invalido, por favor vuelva a intentarlo.');

    const newPassword = await this.authService.generateRandomPassword();

    await this.userRepository.update({ id: user.id }, { password: newPassword });

    const payload = { uid: user.id, roles: user.id_rol, purpose: 'Reset Password' };
    const tokenReset = await this.tokensService.generateToken(payload, '30m', 'JWT_SECRET');

    const checkLink = `http://localhost:8100/auth/recover-pass/?uid=${user.id}&token=${tokenReset}`;

    await this.eMailerService.sendPasswordResetEmail(
      { email: user.email, name: user.name },
      newPassword,
      checkLink,
    );

    return { message: `Correo de restablecimiento enviado.` };
  }
}
