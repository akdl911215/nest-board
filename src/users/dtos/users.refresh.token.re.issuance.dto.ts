import { Users } from '@prisma/client';
import { UsersDto } from '../../_common/inbound/users.dto';

export class UsersRefreshTokenReIssuanceInputDto extends UsersDto {}

export type UsersRefreshTokenReIssuanceOutputDto = {
  readonly id: Users['id'];
  readonly email: Users['email'];
  readonly nickname: Users['nickname'];
  readonly access_token: string | null;
  readonly refresh_token: Users['refresh_token'];
};
