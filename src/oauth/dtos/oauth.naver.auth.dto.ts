import { PickType } from '@nestjs/swagger';
import { OauthBaseDto } from './oauth.base.dto';
import { Users } from '@prisma/client';

export class OAuthNaverAuthInputDto extends PickType(OauthBaseDto, [
  'email',
] as const) {}

export type OAuthNaverAuthOutputDto = Users;
