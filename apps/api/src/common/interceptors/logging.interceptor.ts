import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request>();
    const res = httpContext.getResponse<Response>();

    const { method, originalUrl } = req;
    const requestId = req.requestId || 'unknown-req-id';
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          const statusCode = res.statusCode;
          this.logRequest({
            requestId,
            method,
            path: originalUrl,
            statusCode,
            duration: `${duration}ms`,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error?.status || 500;
          this.logRequest({
            requestId,
            method,
            path: originalUrl,
            statusCode,
            duration: `${duration}ms`,
            error: error?.message,
          });
        },
      }),
    );
  }

  private logRequest(data: Record<string, unknown>) {
    this.logger.log(JSON.stringify(data));
  }
}
