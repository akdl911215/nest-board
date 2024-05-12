import {
  ConflictException,
  Dependencies,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { ReactionsRepositoryInterface } from './interfaces/reactions.repository.interface';
import { Boards, Reactions, Users } from '@prisma/client';
import { errorHandling } from '../_common/abstract/error.handling';
import { NOTFOUND_REACTION } from '../_common/constant/errors/404';
import { EXISTING_REACTION } from '../_common/constant/errors/409';

@Injectable()
@Dependencies([PrismaService])
export class ReactionsRepository implements ReactionsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async delete(entity: {
    readonly id: Reactions['id'];
    readonly board_id: Reactions['board_id'];
  }): Promise<{
    readonly reactionDelete: boolean;
  }> {
    const { id, board_id } = entity;

    const reactionFindByIdAndBoardId: Reactions =
      await this.prisma.reactions.findFirst({
        where: { AND: [{ id }, { board_id }] },
      });
    if (!reactionFindByIdAndBoardId)
      throw new NotFoundException(NOTFOUND_REACTION);

    try {
      await this.prisma.$transaction(
        async () => await this.prisma.reactions.delete({ where: { id } }),
      );

      return { reactionDelete: true };
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async update(entity: {
    readonly id: Reactions['id'];
    readonly type: Reactions['type'];
    readonly user_id: Reactions['user_id'];
    readonly board_id: Reactions['board_id'];
  }): Promise<Reactions> {
    const { id, type, board_id, user_id } = entity;

    try {
      const update = await this.prisma.$transaction(async () => {
        const { boardScore, userIdList, likeList, disLikeList } =
          await this.boardScore(board_id);
        const board: Boards = await this.prisma.boards.update({
          where: { id: board_id },
          data: { board_score: boardScore },
        });

        const reaction: Reactions = await this.prisma.reactions.upsert({
          where: { id },
          update: { type },
          create: { type, board_id, user_id },
        });

        return reaction;
      });

      return update;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async register(entity: {
    readonly type: Reactions['type'];
    readonly user_id: Reactions['user_id'];
    readonly board_id: Reactions['board_id'];
  }): Promise<Reactions> {
    const { type, user_id, board_id } = entity;
    const reactionFindByUserIdAndBoardId: Reactions =
      await this.prisma.reactions.findFirst({
        where: { AND: [{ user_id }, { board_id }] },
      });
    if (reactionFindByUserIdAndBoardId)
      throw new ConflictException(EXISTING_REACTION);

    try {
      const registerReaction: Reactions = await this.prisma.$transaction(
        async () =>
          await this.prisma.reactions.create({
            data: { type, board_id, user_id },
          }),
      );

      return registerReaction;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async reactionFindByUserIdAndBoardId(entity: {
    readonly user_id: Reactions['user_id'];
    readonly board_id: Reactions['board_id'];
  }): Promise<Reactions> {
    const { user_id, board_id } = entity;

    const reactionFindByUserIdAndBoardId: Reactions =
      await this.prisma.reactions.findFirst({
        where: { AND: [{ user_id }, { board_id }] },
      });

    return reactionFindByUserIdAndBoardId;
  }

  public async count(entity: {
    readonly board_id: Reactions['board_id'];
  }): Promise<{
    count: number;
    board_score: number;
  }> {
    const { board_id } = entity;

    const count: number = await this.prisma.reactions.count({
      where: { board_id },
    });

    const reactionList: Reactions[] = await this.prisma.reactions.findMany({
      where: { board_id },
      include: { board: true },
    });
    console.log('reactionList : ', reactionList);

    const { boardScore, likeList, disLikeList, userIdList } =
      await this.boardScore(board_id);
    return {
      count,
      board_score: boardScore,
    };
  }

  private async boardScore(board_id: string): Promise<{
    boardScore: number;
    likeList: string[];
    disLikeList: string[];
    userIdList: Users['id'][];
  }> {
    const reactionList: Reactions[] = await this.prisma.reactions.findMany({
      where: { board_id },
      include: { board: true },
    });

    const likeList: string[] = [];
    const disLikeList: string[] = [];
    const userIdList: Users['id'][] = [];
    for (let i: number = 0; i < reactionList.length; ++i) {
      const type = reactionList[i].type;
      userIdList.push(reactionList[i].user_id);

      if (type === 'LIKE') {
        likeList.push(reactionList[i].board_id);
      } else {
        disLikeList.push(reactionList[i].board_id);
      }
    }

    const boardScore: number = likeList.length - disLikeList.length;

    return {
      boardScore,
      likeList,
      disLikeList,
      userIdList,
    };
  }
}
