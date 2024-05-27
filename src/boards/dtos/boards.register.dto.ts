import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsRegisterInputDto extends PickType(BoardsBaseDto, [
  'category',
  'title',
  'nickname',
  'identifierId',
  'content',
  'type',
] as const) {}

export type BoardsRegisterOutputDto = Boards;
