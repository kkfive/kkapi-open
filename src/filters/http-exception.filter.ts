import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = exception.message;
    const errorDetail = (exception.getResponse() as object as any).message;
    Logger.log('错误提示', errorDetail, message);
    const errorResponse = {
      message,
      data: errorDetail, // 获取全部的错误信息
      code: exception.getStatus() === 200 ? -1 : exception.getStatus(), // 自定义code
      type: 'error',
      url: request.originalUrl, // 错误的url地址
    };
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
