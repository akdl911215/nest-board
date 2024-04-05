import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Users } from '@prisma/client';

export class UsersUpdateInputDto extends PickType(UsersBaseDto, [
  'id',
  'nickname',
  'email',
  'password',
  'phone',
] as const) {}

export type UsersUpdateOutputDto = Users;
