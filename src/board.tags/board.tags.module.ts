import { Module } from '@nestjs/common';
import { BoardTagsService } from './board.tags.service';
import { BoardTagsController } from './board.tags.controller';

@Module({
  controllers: [BoardTagsController],
  providers: [BoardTagsService],
})
export class BoardTagsModule {}
