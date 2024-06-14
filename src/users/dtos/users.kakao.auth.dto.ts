import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Users } from '@prisma/client';

export class UsersKakaoAuthInputDto extends PickType(UsersBaseDto, [
  'id',
  'refreshToken',
] as const) {}

export type UsersKakaoAuthOutputDto = Users;
