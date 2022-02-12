import { HttpException } from '@nestjs/common';

export class ParamsLostException extends HttpException {
  constructor(objectOrError?: string | object | any, description?: string, status = 200) {
    super(HttpException.createBody(objectOrError, description, -1), status);
    this.message = description;
    this.getStatus();
  }
}
