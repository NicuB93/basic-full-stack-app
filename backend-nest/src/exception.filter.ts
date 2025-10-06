import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { PrismaClientValidationError } from 'generated/prisma/runtime/library';
import { LoggerService } from './logger/logger.service';

type MyResponseObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService(ExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myRespObject: MyResponseObject = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      myRespObject.statusCode = exception.getStatus();
      myRespObject.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myRespObject.statusCode = 422;
      myRespObject.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      myRespObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myRespObject.response = 'Internal Server Error';
    }

    response.status(myRespObject.statusCode).json(myRespObject);

    this.logger.error(myRespObject.response, ExceptionFilter.name);
    super.catch(exception, host);
  }
}
