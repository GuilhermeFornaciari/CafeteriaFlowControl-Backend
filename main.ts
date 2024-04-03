import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/infra/http/nest/app.module';

async function main(port: number) {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://ur-flow.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['content-type', 'Access-Control-Allow-Origin'],
  });
  await app.listen(port);
}
const port = 4000;
main(port);
