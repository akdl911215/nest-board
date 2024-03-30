import { Boards } from '@prisma/client';
import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';

export interface BoardsRepositoryInterface {
  readonly delete: (entity: {
    readonly id: Boards['id'];
    readonly nickname: Boards['nickname'];
  }) => Promise<Boards>;

  readonly inquiry: (entity: { readonly id: Boards['id'] }) => Promise<Boards>;

  readonly list: (entity: {
    readonly category: Boards['category'];
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }) => Promise<{
    readonly current_page: BaseOffsetPaginationOutputDto<Boards>['current_page'];
    readonly total_pages: BaseOffsetPaginationOutputDto<Boards>['total_pages'];
    readonly total_take: BaseOffsetPaginationOutputDto<Boards>['total_take'];
    readonly current_list: Boards;
  }>;

  readonly register: (entity: {
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly password: Boards['password'];
    readonly nickname: Boards['nickname'];
  }) => Promise<Boards>;

  readonly update: (entity: {
    readonly id: Boards['id'];
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly password: Boards['password'];
    readonly nickname: Boards['nickname'];
  }) => Promise<Boards>;
}
