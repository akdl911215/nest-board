import { Comments } from '@prisma/client';

export interface CommentsRepositoryInterface {
  readonly delete: (entity: {
    readonly id: Comments['id'];
  }) => Promise<Comments>;

  readonly register: (entity: {
    readonly author_id: Comments['author_id'];
    readonly content: Comments['content'];
  }) => Promise<Comments>;

  readonly update: (entity: {
    readonly id: Comments['id'];
    readonly author_id: Comments['author_id'];
    readonly content: Comments['content'];
  }) => Promise<Comments>;
}
