import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('AUTH NEST API')
    .setDescription('API para la autenticación  rutas de acceso del usuario.')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Servidor de desarrollo')
    .addServer('https://api.auth-nest.com', 'Servidor de producción')
    .addTag('Autenticación', 'Endpoints dedicados a la autenticación y autorización de usuarios.')
    .addTag('Usuarios', 'Endpoints relacionados con la gestión de usuarios.')
    .addTag('Rutas de acceso', 'Endpoints relacionados a las rutas que el usuario puede acceder.')
    .addTag('Ubicación', 'Endpoints relacionados a las rutas de ubicación, ciudad, departamento y municipio.')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  try {
    await app.listen(configService.get('PORT'));
    console.log(`API is listening on the port: ${configService.get('PORT')}`);
  } catch (err) {
    console.error('Error starting API:', err);
  }
}

bootstrap();
