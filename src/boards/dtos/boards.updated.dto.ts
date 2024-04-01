import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsUpdatedInputDto extends PickType(BoardsBaseDto, [
  'id',
  'title',
  'category',
  'nickname',
] as const) {}

export type BoardsUpdateOutputDto = Boards;
