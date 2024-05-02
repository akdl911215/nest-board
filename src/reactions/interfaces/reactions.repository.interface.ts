import { Reactions } from '@prisma/client';

export interface ReactionsRepositoryInterface {
  readonly delete: (entity: {
    readonly id: Reactions['id'];
    readonly board_id: Reactions['board_id'];
  }) => Promise<{ readonly reactionDelete: boolean }>;

  readonly update: (entity: {
    readonly id: Reactions['id'];
    readonly type: Reactions['type'];
    readonly user_id: Reactions['user_id'];
    readonly board_id: Reactions['board_id'];
  }) => Promise<Reactions>;

  readonly register: (entity: {
    readonly type: Reactions['type'];
    readonly user_id: Reactions['user_id'];
    readonly board_id: Reactions['board_id'];
  }) => Promise<Reactions>;

  readonly reactionFindByUserIdAndBoardId: (entity: {
    readonly user_id: Reactions['user_id'];
    readonly board_id: Reactions['board_id'];
  }) => Promise<Reactions>;
}
