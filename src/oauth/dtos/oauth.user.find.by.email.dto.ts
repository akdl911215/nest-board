import { PickType } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { OauthBaseDto } from './oauth.base.dto';

export class OauthUserFindByEmailInputDto extends PickType(OauthBaseDto, [
  'email',
] as const) {}

export type OauthUserFindByEmailOutputDto = Users;
