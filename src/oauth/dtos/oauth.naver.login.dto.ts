import { OauthBaseDto } from './oauth.base.dto';
import { PickType } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class OAuthNaverLoginInputDto extends PickType(OauthBaseDto, [
  'email',
] as const) {}

export type OAuthNaverLoginOutputDto = Users;
