import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { RepliesRepository } from './replies.repository';

@Module({
  controllers: [RepliesController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: RepliesService },

    // repository
    { provide: 'REPOSITORY', useClass: RepliesRepository },
  ],
})
export class RepliesModule {}
