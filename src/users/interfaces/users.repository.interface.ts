import { Users } from '@prisma/client';
import {
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';

export interface UsersRepositoryInterface {
  readonly delete: (entity: { readonly id: Users['id'] }) => Promise<Users>;

  readonly inquiry: (entity: { readonly id: Users['id'] }) => Promise<Users>;

  readonly list: (entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }) => Promise<BaseOffsetPaginationOutputDto<Users>>;

  readonly login: (entity: {
    readonly email: Users['email'];
    readonly password: Users['password'];
  }) => Promise<Users>;

  readonly register: (entity: {
    readonly nickname: Users['nickname'];
    readonly email: Users['email'];
    readonly password: Users['password'];
    readonly phone: Users['phone'];
  }) => Promise<Users>;

  readonly update: (entity: {
    readonly id: Users['id'];
    readonly nickname: Users['nickname'];
    readonly email: Users['email'];
    readonly password: Users['password'];
    readonly phone: Users['phone'];
  }) => Promise<Users>;
}
