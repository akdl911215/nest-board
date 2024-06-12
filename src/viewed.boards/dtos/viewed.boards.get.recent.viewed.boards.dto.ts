import { PickType } from '@nestjs/swagger';
import { ViewedBoardsBaseDto } from './viewed.boards.base.dto';
import { ViewedBoards } from '@prisma/client';

export class ViewedBoardsGetRecentViewedBoardsInputDto extends PickType(
  ViewedBoardsBaseDto,
  ['userId'] as const,
) {}

export type ViewedBoardsGetRecentViewedBoardsOutputDto = ViewedBoards[];
