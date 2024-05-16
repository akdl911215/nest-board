import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { BoardsRepositoryInterface } from './interfaces/boards.repository.interface';
import { Boards, Categories, Prisma } from '@prisma/client';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../_common/abstract/base.pagination.dto';
import { NOTFOUND_BOARD } from '../_common/constant/errors/404';
import { errorHandling } from '../_common/abstract/error.handling';
import { subDays } from 'date-fns';

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
      const deletedBoard: Boards = await this.prisma.$transaction(
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
    const { id } = entity;
    // const boardFindById: Boards = await this.prisma.boards.findUnique({
    //   where: { AND: [{ id }, { deleted_at: null }] },
    //   include: {
    //     comments: {
    //       include: {
    //         replies: true,
    //       },
    //     },
    //   },
    // });

    const boardFindById: Boards[] = await this.prisma.boards.findMany({
      where: {
        id,
        deleted_at: null,
        comments: {
          every: {
            deleted_at: null,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        comments: {
          where: {
            deleted_at: null,
          },
          orderBy: {
            created_at: 'desc',
          },
          include: {
            replies: {
              where: {
                deleted_at: null,
              },
              orderBy: {
                created_at: 'desc',
              },
            },
          },
        },
      },
    });

    if (!boardFindById) throw new NotFoundException(NOTFOUND_BOARD);
    const returnBoard: Boards = boardFindById[0];

    return returnBoard;
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

    let categoryCheck = category;
    if (category === 'null') categoryCheck = null;

    let idCheck = last_id;
    if (last_id === 'null') idCheck = null;

    const whereSql = { deleted_at: null };
    const countSql = { deleted_at: null };
    if (categoryCheck) {
      whereSql['category'] = categoryCheck;
      countSql['category'] = categoryCheck;
    }

    const orderBy: Prisma.BoardsOrderByWithAggregationInput[] = [
      {
        board_score: 'desc',
      },
      {
        created_at: 'desc',
      },
    ];
    const sql = {
      take,
      where: whereSql,
      orderBy,
      include: { reactions: true },
    };
    if (idCheck) {
      sql['skip'] = 1;
      sql['cursor'] = {
        id: idCheck,
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

  public async allList(entity: {
    readonly category: Boards['category'];
    readonly take: BaseCursorPaginationInputDto['take'];
    readonly last_id: Boards['id'];
  }): Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }> {
    const { category, take, last_id } = entity;

    let categoryCheck = category;
    if (category === 'null') categoryCheck = null;

    let idCheck = last_id;
    if (last_id === 'null') idCheck = null;

    const whereSql = { deleted_at: null };
    const countSql = { deleted_at: null };
    if (categoryCheck) {
      whereSql['category'] = categoryCheck;
      countSql['category'] = categoryCheck;
    }

    const orderBy: Prisma.BoardsOrderByWithAggregationInput[] = [
      {
        created_at: 'desc',
      },
    ];
    const sql = {
      take,
      where: whereSql,
      orderBy,
      include: { reactions: true },
    };
    if (idCheck) {
      sql['skip'] = 1;
      sql['cursor'] = {
        id: idCheck,
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

  public async popularList(entity: {
    readonly category: Boards['category'];
    readonly take: BaseCursorPaginationInputDto['take'];
    readonly last_id: Boards['id'];
  }): Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }> {
    const { category, take, last_id } = entity;

    let categoryCheck = category;
    if (category === 'null') categoryCheck = null;

    let idCheck = last_id;
    if (last_id === 'null') idCheck = null;

    const threeDaysAgo = subDays(new Date(), 3);

    const whereSql = {
      deleted_at: null,
      created_at: {
        gte: threeDaysAgo,
      },
    };
    const countSql = {
      deleted_at: null,
      created_at: {
        gte: threeDaysAgo,
      },
    };
    if (categoryCheck) {
      whereSql['category'] = categoryCheck;
      countSql['category'] = categoryCheck;
    }

    const orderBy: Prisma.BoardsOrderByWithAggregationInput[] = [
      {
        board_score: 'desc',
      },
    ];
    const sql = {
      take,
      where: whereSql,
      orderBy,
      include: { reactions: true },
    };
    if (idCheck) {
      sql['skip'] = 1;
      sql['cursor'] = {
        id: idCheck,
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
    readonly nickname: Boards['nickname'];
    readonly identifier_id: Boards['identifier_id'];
    readonly content: Boards['content'];
  }): Promise<Boards> {
    const { category, title, nickname, content, identifier_id } = entity;

    try {
      const registerBoard: Boards = await this.prisma.$transaction(async () => {
        const categorySearch: Categories =
          await this.prisma.categories.findUnique({
            where: { name: category },
          });
        if (!categorySearch) {
          await this.prisma.categories.create({
            data: { name: category },
          });
        }

        return this.prisma.boards.create({
          data: { identifier_id, category, title, nickname, content },
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
    readonly content: Boards['content'];
  }): Promise<Boards> {
    const { id, category, title, nickname, content } = entity;

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
          await this.prisma.categories.create({
            data: { name: category },
          });
        }

        return this.prisma.boards.update({
          where: { id },
          data: {
            category,
            title,
            nickname,
            content,
          },
        });
      });

      return updateBoard;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async read(entity: {
    readonly id: Boards['id'];
    readonly title: Boards['title'];
  }): Promise<Boards> {
    const { id, title } = entity;

    const boardFindById: Boards[] = await this.prisma.boards.findMany({
      where: {
        AND: [{ id }, { title }],
        deleted_at: null,
        comments: {
          every: {
            deleted_at: null,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        comments: {
          where: {
            deleted_at: null,
          },
          orderBy: {
            created_at: 'desc',
          },
          include: {
            replies: {
              where: {
                deleted_at: null,
              },
              orderBy: {
                created_at: 'desc',
              },
            },
          },
        },
      },
    });

    if (!boardFindById) throw new NotFoundException(NOTFOUND_BOARD);
    const returnBoard: Boards = boardFindById[0];

    return returnBoard;
  }
}
