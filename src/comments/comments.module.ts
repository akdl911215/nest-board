import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { CommentsRepository } from './comments.repository';

@Module({
  controllers: [CommentsController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: CommentsService },

    // repository
    { provide: 'REPOSITORY', useClass: CommentsRepository },
  ],
})
export class CommentsModule {}
