import { Module } from '@nestjs/common';
import { ViewedBoardsService } from './viewed.boards.service';
import { ViewedBoardsController } from './viewed.boards.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { ViewedBoardsRepository } from './viewed.boards.repository';
import { RedisProvider } from '../_common/infrastructure/redis/redis.config';

@Module({
  controllers: [ViewedBoardsController],
  providers: [
    // infrastructure
    PrismaService,
    RedisProvider,

    // service
    { provide: 'SERVICE', useClass: ViewedBoardsService },

    // repository
    { provide: 'REPOSITORY', useClass: ViewedBoardsRepository },
  ],
})
export class ViewedBoardsModule {}
