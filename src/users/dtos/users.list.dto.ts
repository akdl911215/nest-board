import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';
import { Users } from '@prisma/client';

export class UsersListInputDto extends BaseOffsetPaginationInputDto {}

export type UsersListOutputDto = BaseOffsetPaginationOutputDto<Users>;
