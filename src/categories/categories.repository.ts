import { ConflictException, Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { CategoriesRepositoryInterface } from './interfaces/categories.repository.interface';
import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../_common/abstract/base.pagination.dto';
import { Categories } from '@prisma/client';
import { EXISTING_CATEGORY } from '../_common/constant/errors/409';
import { errorHandling } from '../_common/abstract/error.handling';
import {
  getListOffsetPagination,
  PageReturnType,
} from '../_common/abstract/get.list.page.nation';

@Injectable()
@Dependencies([PrismaService])
export class CategoriesRepository implements CategoriesRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async list(entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }): Promise<{
    readonly current_page: BaseOffsetPaginationOutputDto<Categories>['current_page'];
    readonly total_pages: BaseOffsetPaginationOutputDto<Categories>['total_pages'];
    readonly total_take: BaseOffsetPaginationOutputDto<Categories>['total_take'];
    readonly current_list: BaseOffsetPaginationOutputDto<Categories>['current_list'];
  }> {
    const { page, take } = entity;

    const count: number = await this.prisma.categories.count({
      where: { deleted_at: null },
    });

    const totalTake: PageReturnType = getListOffsetPagination({
      page,
      take,
      totalTake: count,
    });

    const currentList: Categories[] = await this.prisma.categories.findMany({
      where: { deleted_at: null },
      orderBy: [{ created_at: 'desc' }],
      skip: totalTake.skip,
      take: totalTake.take,
    });

    return {
      current_list: currentList,
      current_page: totalTake.currentPage,
      total_pages: totalTake.totalPages,
      total_take: totalTake.take,
    };
  }

  public async register(entity: {
    readonly name: Categories['name'];
    readonly description: Categories['description'];
  }): Promise<Categories> {
    const { name, description } = entity;

    const CategoryFindByName: Categories =
      await this.prisma.categories.findUnique({ where: { name } });
    if (!CategoryFindByName) throw new ConflictException(EXISTING_CATEGORY);

    try {
      const registerCategory: Categories = await this.prisma.categories.create({
        data: {
          name,
          description,
        },
      });

      return registerCategory;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
