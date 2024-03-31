import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { BoardsRepositoryInterface } from './interfaces/BoardsRepositoryInterface';
import { Boards, Categories } from '@prisma/client';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../_common/abstract/base.pagination.dto';
import { NOTFOUND_BOARD } from '../_common/constant/errors/404';
import { errorHandling } from '../_common/abstract/error.handling';

@Injectable()
@Dependencies([PrismaService])
export class BoardsRepository implements BoardsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  public async delete(entity: {
    readonly id: Boards['id'];
    readonly nickname: Boards['nickname'];
  }): Promise<Boards> {
    const { id, nickname } = entity;

    const boardFindByIdAndNickname: Boards = await this.prisma.boards.findFirst(
      { where: { AND: [{ id, nickname }] } },
    );
    if (!boardFindByIdAndNickname) throw new NotFoundException(NOTFOUND_BOARD);

    try {
      const deletedBoard: Boards = await this.prisma.boards.$transaction(
        async () =>
          await this.prisma.boards.update({
            where: { id },
            data: { deleted_at: new Date() },
          }),
      );

      return deletedBoard;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async inquiry(entity: { readonly id: Boards['id'] }): Promise<Boards> {
    const boardFindById: Boards = await this.prisma.boards.findUnique({
      where: entity,
    });
    if (!boardFindById) throw new NotFoundException(NOTFOUND_BOARD);

    return boardFindById;
  }

  public async list(entity: {
    readonly category: Boards['category'];
    readonly take: BaseCursorPaginationInputDto['take'];
    readonly last_id: Boards['id'];
  }): Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }> {
    const { category, take, last_id } = entity;

    const whereSql = { deleted_at: null };
    const countSql = { deleted_at: null };
    if (category) {
      whereSql['category'] = category;
      countSql['category'] = category;
    }

    const sql = {
      take,
      where: whereSql,
      orderBy: {
        created_at: 'des',
      },
    };
    if (last_id) {
      sql['skip'] = 1;
      sql['cursor'] = {
        id: last_id,
      };
    }

    const currentList: Boards[] = await this.prisma.boards.findMany(sql);
    const totalCount: number = await this.prisma.boards.count({
      where: countSql,
    });

    return {
      total_count: totalCount,
      current_list: currentList,
    };
  }

  public async register(entity: {
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly password: Boards['password'];
    readonly nickname: Boards['nickname'];
  }): Promise<Boards> {
    const { category, title, password, nickname } = entity;

    let passwordCheck = null;
    if (password) passwordCheck = passwordCheck;

    try {
      const registerBoard: Boards = await this.prisma.$transaction(async () => {
        const categorySearch: Categories =
          await this.prisma.categories.findUnique({
            where: { name: category },
          });
        if (!categorySearch) {
          await this.prisma.categorites.create({
            data: { name: category },
          });
        }

        return await this.prisma.boards.create({
          data: {
            category,
            title,
            password: passwordCheck,
            nickname,
          },
        });
      });

      return registerBoard;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async update(entity: {
    readonly id: Boards['id'];
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly nickname: Boards['nickname'];
  }): Promise<Boards> {
    const { id, category, title, nickname } = entity;

    const boardFindByIdAndNickname = await this.prisma.boards.findFirst({
      where: { AND: [{ id }, { nickname }] },
    });
    if (!boardFindByIdAndNickname) throw new NotFoundException(NOTFOUND_BOARD);

    try {
      const updateBoard: Boards = await this.prisma.$transaction(async () => {
        const categorySearch: Categories =
          await this.prisma.categories.findUnique({
            where: { name: category },
          });
        if (!categorySearch) {
          await this.prisma.categorites.create({
            data: { name: category },
          });
        }

        return await this.prisma.boards.update({
          where: { id },
          data: {
            category,
            title,
            nickname,
          },
        });
      });

      return updateBoard;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
