import { IntersectionType, PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Boards } from '@prisma/client';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';

export class UsersInquiryInputDto extends IntersectionType(
  BaseCursorPaginationInputDto,
  PickType(UsersBaseDto, ['nickname'] as const),
) {}

export type UsersInquiryOutputDto = BaseCursorPaginationOutputDto<Boards>;
