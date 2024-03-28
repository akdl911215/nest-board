import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './_common/infrastructure/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, BoardsModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
