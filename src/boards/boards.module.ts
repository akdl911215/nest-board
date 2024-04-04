import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { BoardsRepository } from './boards.repository';

@Module({
  controllers: [BoardsController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: BoardsService },

    // repository
    { provide: 'REPOSITORY', useClass: BoardsRepository },
  ],
})
export class BoardsModule {}
