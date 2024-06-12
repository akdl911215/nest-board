import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { ViewedBoardsRepositoryInterface } from './interfaces/viewed.boards.repository.interface';
import { ViewedBoards } from '@prisma/client';

@Injectable()
@Dependencies([PrismaService])
export class ViewedBoardsRepository implements ViewedBoardsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async getRecentViewedBoards(entity: {
    readonly user_id: ViewedBoards['user_id'];
  }): Promise<ViewedBoards[]> {
    const { user_id } = entity;

    const viewedBoards: ViewedBoards[] =
      await this.prisma.viewedBoards.findMany({
        where: { user_id },
        orderBy: { viewed_at: 'desc' },
        take: 10,
        include: { board: true },
      });

    return viewedBoards;
  }

  public async logViewedBoard(entity: {
    readonly user_id: ViewedBoards['user_id'];
    readonly board_id: ViewedBoards['board_id'];
  }): Promise<ViewedBoards> {
    const { user_id, board_id } = entity;

    const viewedBoard: ViewedBoards = await this.prisma.$transaction(
      async () =>
        await this.prisma.viewedBoards.create({
          data: {
            user_id,
            board_id,
          },
        }),
    );

    return viewedBoard;
  }
}
