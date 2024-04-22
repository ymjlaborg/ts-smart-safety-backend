import { CustomException, Utils } from '@app/common';
import { ERROR_CODES } from '@app/enum';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;
    let errorDetails: any;

    if (exception instanceof CustomException) {
      status = exception.getStatus();
      errorDetails = exception.getResponse();
      errorMessage = Utils.getHttpStatusKey(HttpStatus, exception.getStatus());
    } else if (exception instanceof NotFoundException) {
      console.log('NotFound...');
      status = HttpStatus.NOT_FOUND;
      errorMessage = 'Not Found';
      errorDetails = ERROR_CODES.COMMON_NOT_FOUND;
    } else if (exception instanceof HttpException) {
      console.log('HttpException');
      status = exception.getStatus();
      errorMessage = exception.message;
      errorDetails = {
        errorCode: status,
        errorMessage: errorMessage,
      };
    } else {
      Logger.error(exception.message);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error';
      errorDetails = ERROR_CODES.COMMON_INTERNAL_SERVER;
    }

    response.status(status).json({
      error: errorMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
      details: errorDetails,
    });
  }
}
