import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ConversionService {
  constructor(private readonly emailService: EmailService) {}

  async processingFiles(path: string): Promise<string> {
    const pathMobi = await this.convertToMobi(path);

    await this.emailService.sendToKindle(pathMobi);

    return 'Success';
  }

  private convertToMobi(path: string): Promise<string> {
    const pathMobi = path.replace('.pdf', '.mobi');
    return new Promise((resolve, reject) => {
      exec(`ebook-convert ${path} ${pathMobi}`, (error, stdout, stderr) => {
        if (error) {
          reject(`Error converting file: ${error.message}`);
        } else {
          resolve(pathMobi);
        }
      });
    });
  }
}
