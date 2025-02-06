import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class EmailService implements OnModuleInit {
  onModuleInit() {
    console.log('📡 Email Service is actively listening for RabbitMQ messages...');
  }

  @MessagePattern('user_created') // ✅ Make sure this matches the emitted event
  async handleUserCreated(@Payload() data: any) {
    console.log('✅ Received event: user_created', data);
    console.log('📧 Sending email to:', data.email);
  }
}
