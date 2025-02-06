import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma.module'; // 👈 Import PrismaModule

@Module({
  imports: [PrismaModule], // 👈 Ensure PrismaModule is imported
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
