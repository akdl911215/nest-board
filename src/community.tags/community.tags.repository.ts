import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { CommunityTagsRepositoryInterface } from './interfaces/community.tags.repository.interface';
import { CommunitiesTags, Tags } from '@prisma/client';
import { NOTFOUND_BOARD_TAG } from '../_common/constant/errors/404';
import { errorHandling } from '../_common/abstract/error.handling';
import { CommunityTagsBaseDto } from './dtos/community.tags.base.dto';

@Injectable()
@Dependencies([PrismaService])
export class CommunityTagsRepository
  implements CommunityTagsRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  public async delete(entity: {
    readonly tag_id: CommunitiesTags['tag_id'];
    readonly community_id: CommunitiesTags['community_id'];
  }): Promise<{ readonly remove_tags: boolean }> {
    const { tag_id, community_id } = entity;
    try {
      const communityTagsFindByTagIdAndBoardId: CommunitiesTags =
        await this.prisma.communitiesTags.findFirst({
          where: { AND: [{ tag_id }, { community_id }] },
        });
      if (!communityTagsFindByTagIdAndBoardId)
        throw new NotFoundException(NOTFOUND_BOARD_TAG);

      await this.prisma.$transaction(
        async () =>
          await this.prisma.communitiesTags.deleteMany({
            where: { AND: [{ tag_id }, { community_id }] },
          }),
      );

      return { remove_tags: true };
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async inquiry(entity: {
    readonly tag_id: CommunitiesTags['tag_id'];
    readonly community_id: CommunitiesTags['community_id'];
  }): Promise<CommunitiesTags[]> {
    const { tag_id, community_id } = entity;

    const communityTagsList: CommunitiesTags[] =
      await this.prisma.communitiesTags.findMany({
        where: { AND: [{ tag_id }, { community_id }] },
        include: { community: true, tag: true },
      });

    return communityTagsList;
  }

  public async register(entity: {
    readonly community_id: CommunitiesTags['community_id'];
    readonly tags: CommunityTagsBaseDto['tags'];
  }): Promise<CommunitiesTags[]> {
    const { community_id, tags } = entity;

    const filterTags: string[] = tags.filter(
      (tag: string): boolean => tag !== '',
    );

    try {
      const registerBoardTags: CommunitiesTags[] =
        await this.prisma.$transaction(async () => {
          const arr: CommunitiesTags[] = [];
          for (let i = 0; i < filterTags.length; ++i) {
            const registerTag: Tags = await this.prisma.tags.upsert({
              where: { name: filterTags[i] },
              update: {},
              create: { name: filterTags[i] },
            });

            const tag_id: string = registerTag.id;

            const registerBoardTags: CommunitiesTags =
              await this.prisma.communitiesTags.upsert({
                where: {
                  community_id_tag_id: {
                    tag_id,
                    community_id,
                  },
                },
                update: {},
                create: { tag_id, community_id },
              });

            arr.push(registerBoardTags);
          }

          return arr;
        });
      return registerBoardTags;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
