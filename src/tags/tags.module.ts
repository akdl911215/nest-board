import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { TagsRepository } from './tags.repository';

@Module({
  controllers: [TagsController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: TagsService },

    // repository
    { provide: 'REPOSITORY', useClass: TagsRepository },
  ],
})
export class TagsModule {}
