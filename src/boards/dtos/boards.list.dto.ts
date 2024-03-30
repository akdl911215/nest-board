import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Boards } from '@prisma/client';

export class BoardsListInputDto extends BaseOffsetPaginationInputDto {}

export type BoardsListOutputDto = BaseOffsetPaginationOutputDto<Boards>;
