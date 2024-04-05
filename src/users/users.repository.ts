import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { UsersRepositoryInterface } from './interfaces/users.repository.interface';
import { Users } from '@prisma/client';
import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../_common/abstract/base.pagination.dto';
import { errorHandling } from '../_common/abstract/error.handling';
import { NOTFOUND_USER } from '../_common/constant/errors/404';
import {
  getListOffsetPagination,
  PageReturnType,
} from '../_common/abstract/get.list.page.nation';

@Injectable()
@Dependencies([PrismaService])
export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async delete(entity: { readonly id: Users['id'] }): Promise<Users> {
    const { id } = entity;

    const userFindById: Users = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    try {
      const deleteUser: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.update({
            where: { id },
            data: { deleted_at: new Date() },
          }),
      );

      return deleteUser;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async inquiry(entity: { readonly id: Users['id'] }): Promise<Users> {
    const { id } = entity;

    const userFindById: Users = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    return userFindById;
  }

  public async list(entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }): Promise<BaseOffsetPaginationOutputDto<Users>> {
    const { page, take } = entity;

    const totalTake: number = await this.prisma.users.count({
      where: { deleted_at: null },
    });

    const pagination: PageReturnType = getListOffsetPagination({
      page,
      take,
      totalTake,
    });

    try {
      const currentList: Users[] = await this.prisma.users.findMany({
        orderBy: [{ created_at: 'desc' }],
        skip: pagination.skip,
        take: pagination.take,
        where: { deleted_at: null },
      });

      return {
        current_page: pagination.currentPage,
        total_pages: pagination.totalPages,
        total_take: totalTake,
        current_list: currentList,
      };
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async login(entity: {
    readonly email: Users['email'];
    readonly password: Users['password'];
  }): Promise<Users> {
    return Promise.resolve(undefined);
  }
  public async register(entity: {
    readonly nickname: Users['nickname'];
    readonly email: Users['email'];
    readonly password: Users['password'];
    readonly phone: Users['phone'];
  }): Promise<Users> {
    return Promise.resolve(undefined);
  }

  public async update(entity: {
    readonly id: Users['id'];
    readonly nickname: Users['nickname'];
    readonly email: Users['email'];
    readonly password: Users['password'];
    readonly phone: Users['phone'];
  }): Promise<Users> {
    return Promise.resolve(undefined);
  }
}
