import { Module } from '@nestjs/common';
import { BoardTagsService } from './board.tags.service';
import { BoardTagsController } from './board.tags.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { BoardTagsRepository } from './board.tags.repository';

@Module({
  controllers: [BoardTagsController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: BoardTagsService },

    // repository
    { provide: 'REPOSITORY', useClass: BoardTagsRepository },
  ],
})
export class BoardTagsModule {}
