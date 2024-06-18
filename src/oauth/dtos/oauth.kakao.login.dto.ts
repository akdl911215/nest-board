import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from '../../users/dtos/users.base.dto';
import { Users } from '@prisma/client';

export class OAuthKakaoLoginInputDto extends PickType(UsersBaseDto, [
  'email',
] as const) {}

export type OAuthKakaoLoginOutputDto = Users;
