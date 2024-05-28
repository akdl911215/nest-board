import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Categories } from '@prisma/client';

export interface CategoriesRepositoryInterface {
  readonly list: (entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }) => Promise<{
    readonly current_page: BaseOffsetPaginationOutputDto<Categories>['current_page'];
    readonly total_pages: BaseOffsetPaginationOutputDto<Categories>['total_pages'];
    readonly total_take: BaseOffsetPaginationOutputDto<Categories>['total_take'];
    readonly current_list: BaseOffsetPaginationOutputDto<Categories>['current_list'];
  }>;

  readonly register: (entity: {
    readonly name: Categories['name'];
    readonly description: Categories['description'];
  }) => Promise<Categories>;
}
