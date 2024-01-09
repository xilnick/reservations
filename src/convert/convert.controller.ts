import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConvertService } from './convert.service';

@Controller('convert')
export class ConvertController {
  constructor(private convertService: ConvertService) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.convertService.parseCsv(file.buffer);
  }
}
