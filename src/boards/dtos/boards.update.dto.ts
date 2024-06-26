import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsUpdateInputDto extends PickType(BoardsBaseDto, [
  'id',
  'title',
  'category',
  'nickname',
  'content',
] as const) {}

export type BoardsUpdateOutputDto = Boards;
