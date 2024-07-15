import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(user: { email: string; name: string }, checkLink: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Restablecimiento de contraseña',
        template: 'recoverpass',
        context: {
          name: user.name,
          checkLink: checkLink,
        },
      });
      console.log('Email sent result:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
