import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './_common/infrastructure/prisma.service';

@Module({
  imports: [ConfigModule, BoardsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
