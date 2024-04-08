import { Dependencies, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { BoardsRepositoryInterface } from './interfaces/boards.repository.interface';
import {
  Boards,
  BoardsIAV,
  BoardsL,
  BoardsT,
  Categories,
  Prisma,
} from '@prisma/client';
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

    // BoardsOrderByWithAggregationInput
    const orderBy:
      | Prisma.BoardsTOrderByWithAggregationInput[]
      | Prisma.BoardsIAVOrderByWithAggregationInput[]
      | Prisma.BoardsLOrderByWithAggregationInput[] = [
      {
        created_at: 'desc',
      },
    ];
    const sql = {
      take,
      where: whereSql,
      orderBy,
    };
    if (idCheck) {
      sql['skip'] = 1;
      sql['cursor'] = {
        id: idCheck,
      };
    }

    const currentTextList: BoardsT[] = await this.prisma.boardsT.findMany(sql);
    const textTotalCount: number = await this.prisma.boardsT.count({
      where: countSql,
    });

    const currentIAVList: BoardsIAV[] =
      await this.prisma.boardsIAV.findMany(sql);
    const imageAndVideoTotalCount: number = await this.prisma.boardsIAV.count({
      where: countSql,
    });

    const currentLinkList: BoardsL[] = await this.prisma.boardsL.findMany(sql);
    const linkTotalCount: number = await this.prisma.boardsL.count({
      where: countSql,
    });

    const totalCount: number =
      textTotalCount + imageAndVideoTotalCount + linkTotalCount;

    let tPivot: number = 0;
    let iavPivot: number = 0;
    let lPivot: number = 0;
    const currentList: BoardsT[] & BoardsIAV[] & BoardsL[] = [];
    while (tPivot + iavPivot + lPivot < totalCount) {
      const ct: Date = currentTextList[tPivot].created_at;
      const ciav: Date = currentIAVList[iavPivot].created_at;
      const cl: Date = currentLinkList[lPivot].created_at;

      const min: Date = mathMin(ct, ciav, cl);

      if (min === ct) currentList.push(currentTextList[tPivot++]);

      if (min === ciav) currentList.push(currentIAVList[iavPivot++]);
      if (min === cl) currentList.push(currentLinkList[lPivot++]);
    }

    function mathMin(...parameters: Date[]): Date {
      let min: Date = new Date();

      for (let i = 0; i < parameters.length; ++i) {
        if (parameters[i] < min) {
          min = parameters[i];
        }
      }

      return min;
    }

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
    readonly content: Boards['content'];
  }): Promise<Boards> {
    const { category, title, password, nickname, content } = entity;

    let passwordCheck = null;
    if (password) passwordCheck = passwordCheck;

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
          data: {
            category,
            title,
            password: passwordCheck,
            nickname,
            content,
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
}
