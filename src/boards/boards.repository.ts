import {
  BadRequestException,
  Dependencies,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { BoardsRepositoryInterface } from './interfaces/BoardsRepositoryInterface';
import { Boards } from '@prisma/client';
import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
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
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }): Promise<{
    readonly current_page: BaseOffsetPaginationOutputDto<Boards>['current_page'];
    readonly total_pages: BaseOffsetPaginationOutputDto<Boards>['total_pages'];
    readonly total_take: BaseOffsetPaginationOutputDto<Boards>['total_take'];
    readonly current_list: Boards;
  }> {
    return Promise.resolve({
      current_list: undefined,
      current_page: undefined,
      total_pages: undefined,
      total_take: undefined,
    });
  }

  public async register(entity: {
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly password: Boards['password'];
    readonly nickname: Boards['nickname'];
  }): Promise<Boards> {
    return Promise.resolve(undefined);
  }

  public async update(entity: {
    readonly id: Boards['id'];
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly password: Boards['password'];
    readonly nickname: Boards['nickname'];
  }): Promise<Boards> {
    return Promise.resolve(undefined);
  }
}
