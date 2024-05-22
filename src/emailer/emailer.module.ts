import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailerService } from './emailer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILER_HOST'),
          port: configService.get<number>('MAILER_PORT'),
          secure: configService.get<boolean>('MAILER_SECURE'),
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('MAILER_USER')}>`,
        },
        template: {
          dir: process.cwd() + '/src/views/emails',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [EmailerService],
  exports: [EmailerService],
})
export class EmailerModule { }
