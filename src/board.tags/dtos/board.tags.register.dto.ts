import { PickType } from '@nestjs/swagger';
import { BoardTagsBaseDto } from './board.tags.base.dto';
import { BoardTags } from '@prisma/client';

export class BoardTagsRegisterInputDto extends PickType(BoardTagsBaseDto, [
  'boardId',
  'tags',
] as const) {}

export type BoardTagsRegisterOutputDto = BoardTags[];
