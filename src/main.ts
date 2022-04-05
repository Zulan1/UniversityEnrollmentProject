import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  try {
    await app.listen('asdasdasw' + config.port);
  } catch {
    console.log('App Failed...(Sad Face). Exiting... (Not Really)');
  }
}
bootstrap();
