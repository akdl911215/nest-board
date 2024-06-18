import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Users } from '@prisma/client';
import { OauthBaseDto } from './oauth.base.dto';

export class OAuthKakaoRegisterInputDto extends PickType(OauthBaseDto, [
  'nickname',
  'email',
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

export type OAuthKakaoRegisterOutputDto = Users;
