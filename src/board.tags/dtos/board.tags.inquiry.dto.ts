import { PickType } from '@nestjs/swagger';
import { BoardTagsBaseDto } from './board.tags.base.dto';
import { BoardTags } from '@prisma/client';

export class BoardTagsInquiryInputDto extends PickType(BoardTagsBaseDto, [
  'tagId',
  'boardId',
] as const) {}

export type BoardTagsInquiryOutputDto = BoardTags[];
