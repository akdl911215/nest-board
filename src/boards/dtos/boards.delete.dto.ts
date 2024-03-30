import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsDeleteInputDto extends PickType(BoardsBaseDto, [
  'id',
  'nickname',
] as const) {}

export type BoardsDeleteOutputDto = Boards;
