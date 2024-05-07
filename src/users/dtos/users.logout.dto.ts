import { UsersBaseDto } from './users.base.dto';
import { PickType } from '@nestjs/swagger';

export class UsersLogoutInputDto extends PickType(UsersBaseDto, [
  'refreshToken',
  'id',
] as const) {}

export type UsersLogoutOutputDto = { readonly logout: boolean };
