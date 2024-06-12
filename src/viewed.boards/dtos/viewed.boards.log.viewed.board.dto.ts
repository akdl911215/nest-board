import { PickType } from '@nestjs/swagger';
import { ViewedBoardsBaseDto } from './viewed.boards.base.dto';
import { ViewedBoards } from '@prisma/client';

export class ViewedBoardsLogViewedBoardInputDto extends PickType(
  ViewedBoardsBaseDto,
  ['userId', 'boardId'] as const,
) {}

export type ViewedBoardsLogViewedBoardOutputDto = ViewedBoards;
