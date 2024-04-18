import { ERROR_CODES } from '@app/enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(errorCode: keyof typeof ERROR_CODES, status: HttpStatus) {
    const { CODE, MESSAGE } = ERROR_CODES[errorCode];

    super({ errorCode: CODE, errorMessage: MESSAGE }, status);
  }
}
