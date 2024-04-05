import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Users } from '@prisma/client';

export class UsersRegisterInputDto extends PickType(UsersBaseDto, [
  'nickname',
  'email',
  'password',
  'phone',
] as const) {}

export type UsersRegisterOutputDto = Users;
