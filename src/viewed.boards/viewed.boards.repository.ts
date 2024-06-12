import { Dependencies, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { ViewedBoardsRepositoryInterface } from './interfaces/viewed.boards.repository.interface';
import { ViewedBoards } from '@prisma/client';
import Redis from 'ioredis';

const REDIS_KEY: string = 'user:recentViewedBoards:';
@Injectable()
@Dependencies([PrismaService, Redis])
export class ViewedBoardsRepository implements ViewedBoardsRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('REDIS_MODULE') private readonly redis: Redis,
  ) {}

  public async getRecentViewedBoards(entity: {
    readonly user_id: ViewedBoards['user_id'];
  }): Promise<ViewedBoards[]> {
    const { user_id } = entity;

    const cacheKey: string = `${REDIS_KEY}${user_id}`;
    const cachedBoards: string = await this.redis_get({ key: cacheKey });

    if (!!cachedBoards) {
      const cacheBoardList = JSON.parse(cachedBoards);

      console.log('cacheBoardList : ', cacheBoardList);
      return cacheBoardList;
    } else {
      const viewedBoards: ViewedBoards[] = await this.prisma.$transaction(
        async () => {
          const boardList: ViewedBoards[] =
            await this.prisma.viewedBoards.findMany({
              where: { user_id },
              orderBy: { viewed_at: 'desc' },
              take: 10,
              include: { board: true },
            });

          await this.redis_set({
            key: cacheKey,
            value: JSON.stringify(boardList),
            duration: 3600,
          });

          return boardList;
        },
      );

      console.log('viewedBoards : ', viewedBoards);
      return viewedBoards;
    }
  }

  public async logViewedBoard(entity: {
    readonly user_id: ViewedBoards['user_id'];
    readonly board_id: ViewedBoards['board_id'];
  }): Promise<ViewedBoards> {
    const { user_id, board_id } = entity;

    const viewedBoard: ViewedBoards = await this.prisma.$transaction(
      async () => {
        const registerViewedBoard: ViewedBoards =
          await this.prisma.viewedBoards.create({
            data: {
              user_id,
              board_id,
            },
          });

        await this.redis_delete({ key: `${REDIS_KEY}${user_id}` });

        return registerViewedBoard;
      },
    );

    return viewedBoard;
  }

  private async redis_get({
    key,
  }: {
    readonly key: string;
  }): Promise<string | null> {
    const getKey: string = await this.redis.get(key);

    return getKey;
  }

  private async redis_set({
    key,
    value,
    duration = 3600,
  }: {
    readonly key: string;
    readonly value: string;
    readonly duration: number;
  }): Promise<void> {
    await this.redis.set(key, value, 'EX', duration);
  }
  private async redis_delete({ key }: { readonly key: string }): Promise<void> {
    await this.redis.del(key);
  }
}
