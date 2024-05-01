import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { ReactionsRepository } from './reactions.repository';

@Module({
  controllers: [ReactionsController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: ReactionsService },

    // repository
    { provide: 'REPOSITORY', useClass: ReactionsRepository },
  ],
})
export class ReactionsModule {}
