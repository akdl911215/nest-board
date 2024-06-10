import { BoardTagsRepositoryInterface } from './interfaces/board.tags.repository.interface';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { BoardTags, Tags } from '@prisma/client';
import { BoardTagsBaseDto } from './dtos/board.tags.base.dto';
import { errorHandling } from '../_common/abstract/error.handling';
import { NOTFOUND_BOARD_TAG } from '../_common/constant/errors/404';

@Injectable()
@Dependencies([PrismaService])
export class BoardTagsRepository implements BoardTagsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async delete(entity: {
    readonly tag_id: BoardTags['tag_id'];
    readonly board_id: BoardTags['board_id'];
  }): Promise<{
    readonly remove_tags: boolean;
  }> {
    const { tag_id, board_id } = entity;
    try {
      const boardTagsFindByTagIdAndBoardId: BoardTags =
        await this.prisma.boardTags.findFirst({
          where: { AND: [{ tag_id }, { board_id }] },
        });
      if (!boardTagsFindByTagIdAndBoardId)
        throw new NotFoundException(NOTFOUND_BOARD_TAG);

      await this.prisma.$transaction(
        async () =>
          await this.prisma.boardTags.deleteMany({
            where: { AND: [{ tag_id }, { board_id }] },
          }),
      );

      return { remove_tags: true };
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async inquiry(entity: {
    readonly tag_id: BoardTags['tag_id'];
    readonly board_id: BoardTags['board_id'];
  }): Promise<BoardTags[]> {
    const { tag_id, board_id } = entity;

    const boardTagsList: BoardTags[] = await this.prisma.boardTags.findMany({
      where: { AND: [{ tag_id }, { board_id }] },
      include: { board: true, tag: true },
    });

    return boardTagsList;
  }

  public async register(entity: {
    readonly board_id: BoardTags['board_id'];
    readonly tags: BoardTagsBaseDto['tags'];
  }): Promise<BoardTags[]> {
    const { board_id, tags } = entity;

    try {
      const registerBoardTags: BoardTags[] = await this.prisma.$transaction(
        async () => {
          const arr: BoardTags[] = [];
          for (let i = 0; i < tags.length; ++i) {
            const registerTag: Tags = await this.prisma.tags.upsert({
              where: { name: tags[i] },
              update: { name: tags[i] },
              create: { name: tags[i] },
            });

            const tag_id: BoardTags['tag_id'] = registerTag.id;

            const registerBoardTags: BoardTags =
              await this.prisma.boardTags.upsert({
                where: {
                  board_id_tag_id: {
                    tag_id,
                    board_id,
                  },
                },
                update: { tag_id, board_id },
                create: { tag_id, board_id },
              });

            arr.push(registerBoardTags);
          }

          return arr;
        },
      );
      return registerBoardTags;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
