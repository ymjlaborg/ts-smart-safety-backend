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

    Logger.error(
      `request.url = ${request.url}`,
      `errorMessage = ${exception.message || 'ERROR!'}`,
    );

    if (exception instanceof CustomException) {
      status = exception.getStatus();
      errorDetails = exception.getResponse();
      errorMessage = Utils.getHttpStatusKey(HttpStatus, exception.getStatus());
      Logger.error(
        `CustomException errorStatus = ${status}`,
        `errorMessage = ${errorMessage}`,
      );
    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      errorMessage = 'Not Found';
      errorDetails = ERROR_CODES.COMMON_NOT_FOUND;
      Logger.error(
        `NotFoundException errorStatus = ${status}`,
        `errorMessage = ${errorMessage}`,
      );
    } else if (exception instanceof HttpException) {
      console.log('HttpException');
      status = exception.getStatus();
      errorMessage = exception.message;
      errorDetails = {
        errorCode: status,
        errorMessage: errorMessage,
      };
      Logger.error(
        `HttpException errorStatus = ${status}`,
        `errorMessage = ${errorMessage}`,
      );
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error';
      errorDetails = ERROR_CODES.COMMON_INTERNAL_SERVER;
      Logger.error(
        `INTERNAL_SERVER_ERROR errorStatus = ${status}`,
        `errorMessage = ${errorMessage}`,
      );
    }

    response.status(status).json({
      error: errorMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
      details: errorDetails,
    });
  }
}
