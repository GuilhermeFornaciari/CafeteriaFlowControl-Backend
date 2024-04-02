import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/infra/http/nest/app.module';

async function main(port: number) {
  const app = await NestFactory.create(AppModule, {cors: true})
  app.enableCors({
    origin: true,
    credentials: true, // se tu for ter credenciais no cabecalho
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  });
  await app.listen(port);
}
const port = 4000;
main(port); 