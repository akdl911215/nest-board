import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Communities } from '@prisma/client';

export class CommunitiesListInputDto extends BaseOffsetPaginationInputDto {}

export class CommunitiesListOutputDto extends BaseOffsetPaginationOutputDto<Communities> {}
