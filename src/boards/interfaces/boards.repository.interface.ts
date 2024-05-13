import { Boards } from '@prisma/client';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';

export interface BoardsRepositoryInterface {
  readonly delete: (entity: {
    readonly id: Boards['id'];
    readonly nickname: Boards['nickname'];
  }) => Promise<Boards>;

  readonly inquiry: (entity: { readonly id: Boards['id'] }) => Promise<Boards>;

  readonly list: (entity: {
    readonly category: Boards['category'];
    readonly take: BaseCursorPaginationInputDto['take'];
    readonly last_id: Boards['id'];
  }) => Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }>;

  readonly allList: (entity: {
    readonly category: Boards['category'];
    readonly take: BaseCursorPaginationInputDto['take'];
    readonly last_id: Boards['id'];
  }) => Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }>;

  readonly popularList: (entity: {
    readonly category: Boards['category'];
    readonly take: BaseCursorPaginationInputDto['take'];
    readonly last_id: Boards['id'];
  }) => Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }>;

  readonly register: (entity: {
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly nickname: Boards['nickname'];
    readonly identifier_id: Boards['identifier_id'];
    readonly content: Boards['content'];
  }) => Promise<Boards>;

  readonly update: (entity: {
    readonly id: Boards['id'];
    readonly category: Boards['category'];
    readonly title: Boards['title'];
    readonly nickname: Boards['nickname'];
    readonly content: Boards['content'];
  }) => Promise<Boards>;

  readonly read: (entity: {
    readonly id: Boards['id'];
    readonly title: Boards['title'];
  }) => Promise<Boards>;
}
