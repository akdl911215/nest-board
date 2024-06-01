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
    readonly user_id: Comments['user_id'];
  }) => Promise<Comments>;

  readonly update: (entity: {
    readonly id: Comments['id'];
    readonly board_id: Comments['board_id'];
    readonly content: Comments['content'];
  }) => Promise<Comments>;

  readonly list: (entity: {
    readonly board_id: Comments['board_id'];
  }) => Promise<Comments[]>;

  readonly inquiry: (entity: {
    readonly user_id: Comments['user_id'];
  }) => Promise<Comments[]>;
}
