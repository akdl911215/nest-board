import { ViewedBoards } from '@prisma/client';

export interface ViewedBoardsRepositoryInterface {
  readonly logViewedBoard: (entity: {
    readonly user_id: ViewedBoards['user_id'];
    readonly board_id: ViewedBoards['board_id'];
  }) => Promise<ViewedBoards>;

  readonly getRecentViewedBoards: (entity: {
    readonly user_id: ViewedBoards['user_id'];
  }) => Promise<ViewedBoards[]>;
}
