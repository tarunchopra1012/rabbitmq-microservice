import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Ensure RabbitMQ Microservice is started
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost'],
      queue: 'email_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices(); // ✅ Ensure microservice starts
  await app.listen(3000);
  console.log('🚀 User Service is running on http://localhost:3000');
}
bootstrap();
