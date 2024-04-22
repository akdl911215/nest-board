import { Replies } from '@prisma/client';

export interface RepliesRepositoryInterface {
  readonly delete: (entity: {
    readonly id: Replies['id'];
    readonly comment_id: Replies['comment_id'];
  }) => Promise<Replies>;

  readonly register: (entity: {
    readonly nickname: Replies['nickname'];
    readonly content: Replies['content'];
    readonly comment_id: Replies['comment_id'];
  }) => Promise<Replies>;

  readonly update: (entity: {
    readonly id: Replies['id'];
    readonly nickname: Replies['nickname'];
    readonly content: Replies['content'];
    readonly comment_id: Replies['comment_id'];
  }) => Promise<Replies>;
}
