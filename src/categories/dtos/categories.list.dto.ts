import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Categories } from '@prisma/client';

export class CategoriesListInputDto extends BaseOffsetPaginationInputDto {}

export class CategoriesListOutputDto extends BaseOffsetPaginationOutputDto<Categories> {}
