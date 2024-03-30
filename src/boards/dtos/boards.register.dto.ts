import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsRegisterInputDto extends PickType(BoardsBaseDto, [
  'category',
  'title',
  'password',
  'nickname',
] as const) {}

export type BoardsRegisterOutputDto = Boards;
