import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,              // Transforma os dados para o tipo definido no DTO
      whitelist: true,              // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true,   // Lança erro se dados extras forem enviados
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
