import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { NodemailerService } from './nodemailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: `email-remitente@gmail.com`,
          pass: `--secret`,
        },
      },
      defaults: {
        from: '"No Reply" <email-remitente@gmail.com>',
      },
      template: {
        dir: join(__dirname, '..', '..', 'views', 'emails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
