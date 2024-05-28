import { Module } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesController } from './searches.controller';
import Redis from 'ioredis';
import { SearchesRepository } from './searches.repository';

@Module({
  controllers: [SearchesController],
  providers: [
    // infrastructure
    Redis,

    // service
    { provide: 'SERVICE', useClass: SearchesService },

    // repository
    { provide: 'REPOSITORY', useClass: SearchesRepository },
  ],
})
export class SearchesModule {}
