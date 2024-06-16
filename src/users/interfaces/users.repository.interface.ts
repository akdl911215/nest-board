import { Boards, Users } from '@prisma/client';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../../_common/abstract/base.pagination.dto';

export interface UsersRepositoryInterface {
  readonly delete: (entity: { readonly id: Users['id'] }) => Promise<Users>;

  readonly inquiry: (entity: {
    readonly nickname: Users['nickname'];
    readonly last_id: Boards['id'];
    readonly take: BaseCursorPaginationInputDto['take'];
  }) => Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }>;

  readonly list: (entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }) => Promise<BaseOffsetPaginationOutputDto<Users>>;

  readonly login: (entity: {
    readonly email: Users['email'];
    readonly password: Users['password'];
  }) => Promise<Users & { readonly access_token: string }>;

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
    readonly phone: Users['phone'];
  }) => Promise<Users>;

  readonly profile: (entity: { readonly id: Users['id'] }) => Promise<Users>;

  readonly refresh: (entity: {
    readonly id: Users['id'];
    readonly email: Users['email'];
    readonly nickname: Users['nickname'];
  }) => Promise<{
    readonly id: Users['id'];
    readonly email: Users['email'];
    readonly nickname: Users['nickname'];
    readonly access_token: string | null;
    readonly refresh_token: Users['refresh_token'];
  }>;

  readonly existingEmail: (entity: {
    readonly email: Users['email'];
  }) => Promise<{ readonly existing_email: boolean }>;

  readonly existingNickname: (entity: {
    readonly nickname: Users['nickname'];
  }) => Promise<{ readonly existing_nickname: boolean }>;

  readonly existingPhone: (entity: {
    readonly phone: Users['phone'];
  }) => Promise<{ readonly existing_phone: boolean }>;

  readonly logout: (entity: {
    readonly id: Users['id'];
  }) => Promise<{ readonly logout: boolean }>;

  readonly kakaoAuth: (entity: { readonly code: string }) => Promise<any>;
}
