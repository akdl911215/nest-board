import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { CommunitiesRepository } from './communities.repository';

@Module({
  controllers: [CommunitiesController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: CommunitiesService },

    // repository
    { provide: 'REPOSITORY', useClass: CommunitiesRepository },
  ],
})
export class CommunitiesModule {}
