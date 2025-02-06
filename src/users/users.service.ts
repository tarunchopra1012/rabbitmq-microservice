import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class UsersService {
  private client: ClientProxy;

  constructor(private prisma: PrismaService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost'],
        queue: 'email_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });

    console.log('🚀 Emitting event: user_created', user); // ✅ Debug Log

    // Emit event to RabbitMQ
    this.client.emit({ exchange: 'amq.topic', routingKey: 'user_created' }, user);


    return user;
  }
}
