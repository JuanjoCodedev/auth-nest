import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/* Entity */
import { LogDto } from 'src/modules/log/log.dto';

/* Service */
import { LogService } from 'src/modules/log/log.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly _logService: LogService) { }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const errorResponse = exception.getResponse();
    const clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    const logData: LogDto = {
      path: request.url,
      message: exception.message,
      status_code: statusCode,
      client_ip: String(clientIp),
    };

    try {
      await this._logService.logCreate(logData);
    } catch (logError) {
      console.error('Error al registrar el log:', logError);
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      path: request.url,
      errorResponse: errorResponse,
      clientIp: clientIp,
      timestamp: new Date().toISOString(),
    });
  }
}