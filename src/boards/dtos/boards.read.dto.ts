import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsReadInputDto extends PickType(BoardsBaseDto, [
  'id',
  'title',
] as const) {}

export type BoardsReadOutputDto = Boards;
