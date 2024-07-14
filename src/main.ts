import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { extname, join } from 'path';
import * as hbs from 'nodemailer-express-handlebars';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  app.setBaseViewsDir(join(__dirname, 'views'));
  app.engine('hbs', hbs({ extname: 'hbs' }));
  app.setViewEngine('hbs');

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  try {
    await app.listen(process.env.PORT);
    console.log(`API is listening on the port: ${process.env.PORT}`);
  } catch (err) {
    console.error('Error starting API:', err);
  }
}

bootstrap();
