import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class PasswordCheckingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>().body;

    if ('confirmPassword' in request) {
      if (request.password === request.confirmPassword) {
        delete request['confirmPassword'];
        delete request['currentPassword'];
      } else {
        throw new BadRequestException('password && confirmPassword different');
      }
    }

    return next.handle().pipe(tap((data) => delete data.password));
  }
}
