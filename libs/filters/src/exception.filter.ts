import { CustomException } from '@app/common';
import { ERROR_CODES } from '@app/enum';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  NotFoundException,
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
      errorMessage = exception.name;
      errorDetails = exception.getResponse();
    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      errorMessage = 'Not Found';
      errorDetails = ERROR_CODES.COMMON_NOT_FOUND;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.message;
      errorDetails = {
        errorCode: status,
        errorMessage: errorMessage,
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error';
      errorDetails = ERROR_CODES.COMMON_INTERNAL_SERVER;
    }

    console.log('AAA');

    response.status(status).json({
      error: errorMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
      details: errorDetails,
    });
  }
}
