import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { ReactionsRepositoryInterface } from './interfaces/reactions.repository.interface';
import { Reactions } from '@prisma/client';
import { errorHandling } from '../_common/abstract/error.handling';
import { NOTFOUND_REACTION } from '../_common/constant/errors/404';

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
    readonly board_id: Reactions['board_id'];
  }): Promise<Reactions> {
    const { id, type, board_id } = entity;

    try {
      const updateReaction: Reactions = await this.prisma.$transaction(
        async () =>
          await this.prisma.reactions.upsert({
            where: { id },
            update: { type },
            create: { type, board_id },
          }),
      );

      return updateReaction;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
