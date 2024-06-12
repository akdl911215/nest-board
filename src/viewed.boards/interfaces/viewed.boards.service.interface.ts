import {
  ViewedBoardsLogViewedBoardInputDto,
  ViewedBoardsLogViewedBoardOutputDto,
} from '../dtos/viewed.boards.log.viewed.board.dto';
import {
  ViewedBoardsGetRecentViewedBoardsInputDto,
  ViewedBoardsGetRecentViewedBoardsOutputDto,
} from '../dtos/viewed.boards.get.recent.viewed.boards.dto';

export interface ViewedBoardsServiceInterface {
  readonly logViewedBoard: (
    dto: ViewedBoardsLogViewedBoardInputDto,
  ) => Promise<ViewedBoardsLogViewedBoardOutputDto>;

  readonly getRecentViewedBoards: (
    dto: ViewedBoardsGetRecentViewedBoardsInputDto,
  ) => Promise<ViewedBoardsGetRecentViewedBoardsOutputDto>;
}
