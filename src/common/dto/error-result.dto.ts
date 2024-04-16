/**
 *
 */
export class ErrorResultDto {
  status: number;
  error: string;
  path: string;
  timestamp: string;
  details: {
    errorCode: number;
    errorMessage: string;
  };

  constructor(
    status: number,
    error: string,
    path: string,
    errorCode: number,
    errorMessage: string,
  ) {
    this.status = status;
    this.error = error;
    this.path = path;
    this.timestamp = new Date().toISOString();
    this.details = {
      errorCode,
      errorMessage,
    };
  }
}
