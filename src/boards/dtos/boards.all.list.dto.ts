import { IntersectionType, PickType } from '@nestjs/swagger';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { BoardsBaseDto } from './boards.base.dto';
import { Boards } from '@prisma/client';

export class BoardsAllListInputDto extends IntersectionType(
  BaseCursorPaginationInputDto,
  PickType(BoardsBaseDto, ['category'] as const),
) {}

export type BoardsAllListOutputDto = BaseCursorPaginationOutputDto<Boards>;
