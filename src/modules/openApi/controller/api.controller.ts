import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Req, Response, Request } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { NoAuth } from '../../../common/decorator/customize';

@Controller('/openapi')
export class OpenApiController {
  @NoAuth()
  @Get('version')
  async getVersion() {
    const { version, date } = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
    );
    return new SuccessModal({ version, date });
  }
}
