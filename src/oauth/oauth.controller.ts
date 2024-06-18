import { Controller, Get, Header, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { OAuth } from './infrastructures/decorators/oauth.decorator';
import { Users } from '@prisma/client';

export type ExportGetFindByEmailType = 'NEW_USER' | 'EXITING_USER';
export type ReturnOAuthType = {
  readonly type: ExportGetFindByEmailType;
  readonly profile: Users | { readonly email: string };
};
@ApiTags('oauth')
@Controller('oauth')
export class OauthController {
  constructor() {}

  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  @Header('Content-Type', 'text/html')
  private async kakaoAuth(@OAuth() profile): Promise<ReturnOAuthType> {
    let res: ReturnOAuthType = {
      type: 'NEW_USER',
      profile: { email: profile.email },
    };
    if (profile) {
      res = {
        type: 'EXITING_USER',
        profile,
      };
    }

    return res;
  }

  // @Get('/kakao/callback')
  // @UseGuards(KakaoGuard) // kakao.strategy를 실행
  // private async kakaoAuthCallback(@OAuth() req) {
  //   // 여기서 인증 성공 후의 처리를 합니다.
  //   console.log('req : ', req);
  //
  //   console.log('');
  // }
}
