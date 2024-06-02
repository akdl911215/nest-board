import { Module } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesController } from './searches.controller';
import { SearchesRepository } from './searches.repository';
import { RedisProvider } from '../_common/infrastructure/redis/redis.config';
import { PrismaService } from '../_common/infrastructure/prisma.service';

@Module({
  controllers: [SearchesController],
  providers: [
    // infrastructure
    RedisProvider,
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: SearchesService },

    // repository
    { provide: 'REPOSITORY', useClass: SearchesRepository },
  ],
})
export class SearchesModule {}
