import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = this.createTransporter();
  }

  private createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: `${process.env.NODEMAILER_USER}`,
        pass: `${process.env.NODEMAILER_PASS}`,
      },
    });
  }

  async sendMail(mailOptions: { email: string; subject: string; html: string }): Promise<void> {
    const { email, subject, html } = mailOptions;

    const info = await this.transporter.sendMail({
      from: `"${process.env.NODEMAILER_NAME}"<${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: subject,
      text: html,
      html: html,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
