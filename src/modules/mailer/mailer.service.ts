import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EMailerService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * ?Envía un correo electrónico para restablecer la contraseña del usuario.
   *
   * *@param user - Información del usuario que recibirá el correo.
   * *@param checkLink - Enlace de verificación para el restablecimiento de contraseña.
   * *@throws - Si ocurre un error durante el envío del correo.
   * *@returns - Un mensaje de confirmación del resultado del envío del correo.
   */
  async sendPasswordResetEmail(user: { email: string; name: string }, newPassword: string, checkLink: string) {
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
  /**
   * ?Envía un correo electrónico notificando sobre un dispositivo desconocido.
   *
   * *@param user - Información del usuario que recibirá el correo.
   * *@param checkLink - Enlace de verificación para la configuración del nuevo dispositivo.
   * *@throws - Sí ocurre un error durante el envío del correo.
   * *@returns - Un mensaje de confirmación del resultado del envío del correo.
   */
  async sendUnknowIpEmail(user: { email: string; name: string }, checkLink: string) {
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
