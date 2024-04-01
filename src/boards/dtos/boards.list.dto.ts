import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Boards } from '@prisma/client';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { BoardsBaseDto } from './boards.base.dto';

export class BoardsListInputDto extends IntersectionType(
  BaseCursorPaginationInputDto,
  PickType(BoardsBaseDto, ['category'] as const),
) {}

export type BoardsListOutputDto = BaseCursorPaginationOutputDto<Boards>;
