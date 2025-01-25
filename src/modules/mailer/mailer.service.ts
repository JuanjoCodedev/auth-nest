import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EMailerService {
  constructor(private readonly mailerService: MailerService) { }

  public async sendPasswordResetEmail(user: { email: string; name: string }, newPassword: string, checkLink: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Restablecimiento de contraseña',
        template: 'recoverpass',
        context: {
          name: user.name,
          newPassword: newPassword,
          checkLink: checkLink,
        },
      });
    } catch (error) {
      console.error('Error al enviar email:', error);
    }
  }

  public async sendUnknowIpEmail(user: { email: string; name: string }, checkLink: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Dispositivo desconocido',
        template: 'unknown_ip',
        context: {
          name: user.name,
          checkLink: checkLink,
        },
      });
    } catch (error) {
      console.error('Error al enviar email:', error);
    }
  }
}
