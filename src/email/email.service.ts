import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendToKindle(filePath: string): Promise<void> {
    const kindleEmail = process.env.KINDLE_EMAIL;
    const fileName = path.basename(filePath);

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: kindleEmail,
      subject: 'Mangá convertido para Kindle',
      text: 'Aqui está o seu arquivo MOBI pronto para leitura!',
      attachments: [
        {
          filename: fileName,
          path: filePath,
        },
      ],
    });
  }
}
