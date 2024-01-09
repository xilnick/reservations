import { Module } from '@nestjs/common';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';

@Module({
  exports: [ConvertService],
  providers: [ConvertService],
  controllers: [ConvertController],
})
export class ConvertModule {}
