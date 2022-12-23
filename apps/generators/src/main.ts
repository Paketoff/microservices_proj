import "reflect-metadata";
import "class-validator";
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GeneratorsModule } from './generators.module';

async function bootstrap() {
  const app = await NestFactory.create(GeneratorsModule, 
    {cors: true});
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
