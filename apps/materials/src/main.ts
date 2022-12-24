import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MaterialsModule } from './materials.module';

async function bootstrap() {
  const app = await NestFactory.create(MaterialsModule,
    {cors: true});
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(6001, '0.0.0.0', () => console.log(`Listening on port: 6000`));
}
bootstrap();
