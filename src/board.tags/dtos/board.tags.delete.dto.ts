import { PickType } from '@nestjs/swagger';
import { BoardTagsBaseDto } from './board.tags.base.dto';

export class BoardTagsDeleteInputDto extends PickType(BoardTagsBaseDto, [
  'tagId',
  'boardId',
] as const) {}

export type BoardTagsDeleteOutputDto = { readonly remove_tags: boolean };
