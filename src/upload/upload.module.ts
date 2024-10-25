import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ConversionService } from 'src/conversion/conversion.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [UploadController],
  providers: [ConversionService, EmailService]
})
export class UploadModule {}
