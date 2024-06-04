import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE } from './_common/infrastructure/global.winston.module';
import { HttpExceptionFilter } from './_common/exceptions/http.exception.filter';
import { GlobalReturnResponseInterceptor } from './_common/outbound/interceptors/global.return.response.interceptor';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  console.log('process.env.NODE_ENV : ', process.env.NODE_ENV);
  console.log('process.env.OS : ', process.env.OS);
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, WINSTON_MODULE);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(new GlobalReturnResponseInterceptor());

  const configService = app.get(ConfigService);
  const PORT: number = configService.get<number>('PORT');
  const HOST: string = configService.get<string>('HOST');

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access_token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'refresh_token',
    )
    .setTitle('COMMUNITY')
    .setDescription('THE COMMUNITY API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //
  await app.listen(PORT, () => console.log(`http://${HOST}:${PORT}/docs`));
}
bootstrap().then();
