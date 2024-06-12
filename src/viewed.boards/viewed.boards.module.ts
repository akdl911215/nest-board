import { Module } from '@nestjs/common';
import { ViewedBoardsService } from './viewed.boards.service';
import { ViewedBoardsController } from './viewed.boards.controller';

@Module({
  controllers: [ViewedBoardsController],
  providers: [ViewedBoardsService],
})
export class ViewedBoardsModule {}
