import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 Marks the module as Global, so it can be used anywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Export PrismaService so other modules can use it
})
export class PrismaModule {}
