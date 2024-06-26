import { ApiProperty, PickType } from '@nestjs/swagger';
import { OauthBaseDto } from './oauth.base.dto';
import { Type } from 'class-transformer';
import { Users } from '@prisma/client';

export class OauthNaverRegisterInputDto extends PickType(OauthBaseDto, [
  'email',
  'nickname',
  'password',
  'phone',
] as const) {
  @Type(() => String)
  @ApiProperty({
    type: String,
    default: '',
    format: 'password',
    required: true,
  })
  public readonly confirmPassword!: Users['password'];
}

export type OAuthNaverRegisterOutputDto = Users;
