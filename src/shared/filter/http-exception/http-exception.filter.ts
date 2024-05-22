import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(404).json({
      statusCode: 404,
      path: request.url,
      message: 'La ruta que intentas acceder no existe.',
      suggestion: 'Por favor, verifica la URL o consulta la documentación de la API para obtener más información.',
      timestamp: new Date().toISOString(),
    });
  }
}
