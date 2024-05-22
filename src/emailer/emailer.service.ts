import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailerService {
    constructor(private readonly mailerService: MailerService) { }
    
    public async sendPasswordResetEmail(user: { email: string; name: string }, newPassword: string, checkLink: string) {
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Restablecimiento de contraseña',
                template: 'recoverpass',
                context: { name: user.name, newPassword: newPassword, checkLink: checkLink },
            });
        } catch (error) {
            console.error('Error al enviar email:', error);
        }
    }
}
