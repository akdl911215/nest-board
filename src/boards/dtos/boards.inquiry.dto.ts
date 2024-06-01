import { PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsInquiryInputDto extends PickType(BoardsBaseDto, [
  'id',
] as const) {}

export type BoardsInquiryOutputDto = Boards[];
