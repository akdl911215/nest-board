import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsInquiryInputDto extends PickType(BoardsBaseDto, [
  'id',
  'nickname',
] as const) {}

export type BoardsInquiryOutputDto = Boards;
