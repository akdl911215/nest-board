import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Boards } from '@prisma/client';

export class BoardsListInputDto extends BaseCursorPaginationInputDto {}

export type BoardsListOutputDto = BaseCursorPaginationOutputDto<Boards>;
