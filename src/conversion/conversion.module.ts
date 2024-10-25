import { Module } from '@nestjs/common';
import { ConversionService } from './conversion.service';

@Module({
  controllers: [],
  providers: [ConversionService],
})
export class EmailModule {}
