import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Users } from '@prisma/client';

export class UsersProfileInputDto extends PickType(UsersBaseDto, [
  'id',
] as const) {}

export type UsersProfileOutputDto = Users;
