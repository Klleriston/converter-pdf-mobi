import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConversionService } from 'src/conversion/conversion.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly conversionService: ConversionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file || file.mimetype !== 'application/pdf') {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    return this.conversionService.processingFiles(file.path);
  }
}
