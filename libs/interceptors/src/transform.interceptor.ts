import { ResultDto } from '@app/dto';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResultDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResultDto<T>> | Promise<Observable<ResultDto<T>>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const status = response.statusCode || HttpStatus.OK;

        return {
          data,
          status,
        };
      }),
    );
  }
}
