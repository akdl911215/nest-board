import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Users } from '@prisma/client';

export class UsersRefreshTokenReIssuanceInputDto extends PickType(
  UsersBaseDto,
  ['id', 'email', 'nickname'] as const,
) {}

export type UsersRefreshTokenReIssuanceOutputDto = {
  readonly id: Users['id'];
  readonly email: Users['email'];
  readonly nickname: Users['nickname'];
  readonly access_token: string | null;
  readonly refresh_token: Users['refresh_token'];
};
