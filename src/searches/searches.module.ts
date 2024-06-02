import { Module } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesController } from './searches.controller';
import { SearchesRepository } from './searches.repository';
import { RedisProvider } from '../_common/infrastructure/redis/redis.config';

@Module({
  controllers: [SearchesController],
  providers: [
    // infrastructure
    RedisProvider,

    // service
    { provide: 'SERVICE', useClass: SearchesService },

    // repository
    { provide: 'REPOSITORY', useClass: SearchesRepository },
  ],

})
export class SearchesModule {}
