import { BoardTags } from '@prisma/client';
import { BoardTagsBaseDto } from '../dtos/board.tags.base.dto';

export interface BoardTagsRepositoryInterface {
  readonly delete: (entity: {
    readonly tag_id: BoardTags['tag_id'];
    readonly board_id: BoardTags['board_id'];
  }) => Promise<{ readonly remove_tags: boolean }>;

  readonly inquiry: (entity: {
    readonly tag_id: BoardTags['tag_id'];
    readonly board_id: BoardTags['board_id'];
  }) => Promise<BoardTags[]>;

  readonly register: (entity: {
    readonly board_id: BoardTags['board_id'];
    readonly tags: BoardTagsBaseDto['tags'];
  }) => Promise<BoardTags[]>;
}
