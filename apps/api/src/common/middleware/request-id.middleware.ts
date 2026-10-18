import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const headerValue = req.headers['x-request-id'];
    let requestId: string;

    if (typeof headerValue === 'string' && validateUuid(headerValue)) {
      requestId = headerValue;
    } else {
      requestId = uuidv4();
    }

    req.requestId = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
  }
}
