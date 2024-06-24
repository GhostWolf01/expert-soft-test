import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

type FileParams = {
  filename: string;
};

@Controller('upload')
export class FileController {
  @Get(':filename')
  getFile(@Param() params: FileParams) {
    const file = createReadStream(join(process.cwd(), `/src/upload/${params.filename}`));
    return new StreamableFile(file);
  }
}
