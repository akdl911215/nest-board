import { Comments } from '@prisma/client';

export interface CommentsRepositoryInterface {
  readonly delete: (entity: {
    readonly id: Comments['id'];
    readonly board_id: Comments['board_id'];
  }) => Promise<Comments>;

  readonly register: (entity: {
    readonly board_id: Comments['board_id'];
    readonly content: Comments['content'];
    readonly nickname: Comments['nickname'];
  }) => Promise<Comments>;

  readonly update: (entity: {
    readonly id: Comments['id'];
    readonly board_id: Comments['board_id'];
    readonly content: Comments['content'];
  }) => Promise<Comments>;
}
