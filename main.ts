import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/infra/http/nest/app.module';

async function main(port: number) {
  const app = await NestFactory.create(AppModule)
  await app.enableCors({
    origin: '*', // permite qualquer origem
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'authorization'],
  });
  await app.listen(port);
}

const port = 4000;
main(port);
