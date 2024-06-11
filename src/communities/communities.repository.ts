import { PrismaService } from '../_common/infrastructure/prisma.service';
import {
  ConflictException,
  Dependencies,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommunitiesRepositoryInterface } from './interfaces/communities.repository.interface';
import { Communities } from '@prisma/client';
import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../_common/abstract/base.pagination.dto';
import { NOTFOUND_COMMUNITY } from '../_common/constant/errors/404';
import { errorHandling } from '../_common/abstract/error.handling';
import {
  getListOffsetPagination,
  PageReturnType,
} from '../_common/abstract/get.list.page.nation';
import { EXISTING_COMMUNITY } from '../_common/constant/errors/409';

@Injectable()
@Dependencies([PrismaService])
export class CommunitiesRepository implements CommunitiesRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async delete(entity: {
    readonly id: Communities['id'];
  }): Promise<Communities> {
    const { id } = entity;

    const communityFindById: Communities =
      await this.prisma.communities.findFirst({
        where: { AND: [{ id }, { deleted_at: null }] },
      });
    if (!communityFindById) throw new NotFoundException(NOTFOUND_COMMUNITY);

    try {
      const communityDeletedAt: Communities =
        await this.prisma.communities.update({
          data: { deleted_at: new Date() },
          where: { id },
        });

      return communityDeletedAt;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async inquiry(entity: {
    readonly id: Communities['id'];
  }): Promise<Communities> {
    const { id } = entity;

    const communityFindById: Communities =
      await this.prisma.communities.findFirst({
        where: { AND: [{ id }, { deleted_at: null }] },
      });

    return communityFindById;
  }

  public async list(entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }): Promise<{
    readonly current_page: BaseOffsetPaginationOutputDto<Communities>['current_page'];
    readonly total_pages: BaseOffsetPaginationOutputDto<Communities>['total_pages'];
    readonly total_take: BaseOffsetPaginationOutputDto<Communities>['total_take'];
    readonly current_list: BaseOffsetPaginationOutputDto<Communities>['current_list'];
  }> {
    const { page, take } = entity;

    const totalTake: number = await this.prisma.communities.count({
      where: { deleted_at: null },
    });
    const pagination: PageReturnType = getListOffsetPagination({
      page,
      take,
      totalTake,
    });

    const currentList: Communities[] = await this.prisma.communities.findMany({
      where: { deleted_at: null },
    });

    return {
      current_list: currentList,
      total_take: totalTake,
      current_page: pagination.currentPage,
      total_pages: pagination.totalPages,
    };
  }

  public async register(entity: {
    readonly name: Communities['name'];
    readonly description: Communities['description'];
    readonly banner: Communities['banner'];
    readonly icon: Communities['icon'];
    readonly visibility: Communities['visibility'];
  }): Promise<Communities> {
    const { name, description, banner, icon, visibility } = entity;

    const communityFindByName: Communities =
      await this.prisma.communities.findUnique({
        where: { name },
      });
    if (communityFindByName) throw new ConflictException(EXISTING_COMMUNITY);

    try {
      const communityRegister: Communities =
        await this.prisma.communities.create({
          data: { name, description, banner, icon, visibility },
        });

      return communityRegister;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async update(entity: {
    readonly id: Communities['id'];
    readonly name: Communities['name'];
    readonly description: Communities['description'];
    readonly banner: Communities['banner'];
    readonly icon: Communities['icon'];
    readonly visibility: Communities['visibility'];
  }): Promise<Communities> {
    const { id, name, description, banner, icon, visibility } = entity;

    const communityFindByIdOrName: Communities =
      await this.prisma.communities.findFirst({
        where: {
          OR: [
            { AND: [{ id }, { deleted_at: null }] },
            { AND: [{ name }, { deleted_at: null }] },
          ],
        },
      });
    if (!communityFindByIdOrName)
      throw new NotFoundException(NOTFOUND_COMMUNITY);

    try {
      const updateCommunity: Communities = await this.prisma.communities.update(
        {
          where: { id },
          data: {
            name,
            description,
            banner,
            icon,
            visibility,
            updated_at: new Date(),
          },
        },
      );

      return updateCommunity;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
