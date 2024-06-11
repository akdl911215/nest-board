import { Communities } from '@prisma/client';
import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';

export interface CommunitiesRepositoryInterface {
  readonly delete: (entity: {
    readonly id: Communities['id'];
  }) => Promise<Communities>;

  readonly inquiry: (entity: {
    readonly id: Communities['id'];
  }) => Promise<Communities>;

  readonly list: (entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }) => Promise<{
    readonly current_page: BaseOffsetPaginationOutputDto<Communities>['current_page'];
    readonly total_pages: BaseOffsetPaginationOutputDto<Communities>['total_pages'];
    readonly total_take: BaseOffsetPaginationOutputDto<Communities>['total_take'];
    readonly current_list: BaseOffsetPaginationOutputDto<Communities>['current_list'];
  }>;

  readonly register: (entity: {
    readonly name: Communities['name'];
    readonly description: Communities['description'];
    readonly banner: Communities['banner'];
    readonly icon: Communities['icon'];
    readonly visibility: Communities['visibility'];
  }) => Promise<Communities>;

  readonly update: (entity: {
    readonly id: Communities['id'];
    readonly name: Communities['name'];
    readonly description: Communities['description'];
    readonly banner: Communities['banner'];
    readonly icon: Communities['icon'];
    readonly visibility: Communities['visibility'];
  }) => Promise<Communities>;
}
