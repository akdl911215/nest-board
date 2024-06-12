import { Inject, Injectable } from '@nestjs/common';
import { ViewedBoardsServiceInterface } from './interfaces/viewed.boards.service.interface';
import { ViewedBoardsRepositoryInterface } from './interfaces/viewed.boards.repository.interface';
import {
  ViewedBoardsGetRecentViewedBoardsInputDto,
  ViewedBoardsGetRecentViewedBoardsOutputDto,
} from './dtos/viewed.boards.get.recent.viewed.boards.dto';
import {
  ViewedBoardsLogViewedBoardInputDto,
  ViewedBoardsLogViewedBoardOutputDto,
} from './dtos/viewed.boards.log.viewed.board.dto';

@Injectable()
export class ViewedBoardsService implements ViewedBoardsServiceInterface {
  constructor(
    @Inject('REPOSITORY')
    private readonly repository: ViewedBoardsRepositoryInterface,
  ) {}

  public async getRecentViewedBoards(
    dto: ViewedBoardsGetRecentViewedBoardsInputDto,
  ): Promise<ViewedBoardsGetRecentViewedBoardsOutputDto> {
    return await this.repository.getRecentViewedBoards({
      user_id: dto.userId,
    });
  }

  public async logViewedBoard(
    dto: ViewedBoardsLogViewedBoardInputDto,
  ): Promise<ViewedBoardsLogViewedBoardOutputDto> {
    return await this.repository.logViewedBoard({
      user_id: dto.userId,
      board_id: dto.boardId,
    });
  }
}
