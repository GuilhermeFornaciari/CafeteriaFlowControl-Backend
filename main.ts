import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/infra/http/nest/app.module';

async function main(port: number) {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors()
  await app.listen(port);
}
const port = 4000;
main(port);