import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(user: { email: string; username: string }, checkLink: string) {
    console.log('Sending email to:', user.email);
    console.log('Template context:', { username: user.username, checkLink: checkLink }); // Depuración

    try {
      const result = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Nueva contraseña',
        template: 'recoverpass',
        context: {
          username: user.username,
          checkLink: checkLink,
        },
      });
      console.log('Email sent result:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
