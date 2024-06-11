import { Module } from '@nestjs/common';
import { CommunityTagsService } from './community.tags.service';
import { CommunityTagsController } from './community.tags.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { CommunityTagsRepository } from './community.tags.repository';

@Module({
  controllers: [CommunityTagsController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: CommunityTagsService },

    // repository
    { provide: 'REPOSITORY', useClass: CommunityTagsRepository },
  ],
})
export class CommunityTagsModule {}
