import {
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import { NOT_MATCH_REFRESH_TOKEN } from '../_common/constant/errors/400';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import { OauthServiceInterface } from './interfaces/oauth.service.interface';

@ApiTags('oauth')
@Controller('oauth')
export class OauthController {
  constructor(
    @Inject('SERVICE') private readonly service: OauthServiceInterface,
  ) {}

  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  @Header('Content-Type', 'text/html')
  private async kakaoAuth(): Promise<void> {
    // 이 엔드포인트는 카카오 로그인 페이지로 리다이렉트
  }

  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao')) // kakao.strategy를 실행시켜 줍니다.
  private async kakaoAuthCallback(@Req() req: Request, @Res() res: Response) {
    // 여기서 인증 성공 후의 처리를 합니다.
    console.log('req : ', req);
    console.log('res : ', res);
  }

  // @Get('/kakao/callback/')
  // // @Redirect(
  // //   `http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao/callback`,
  // //   301,
  // // )
  // // @UseGuards(KakaoGuard)
  // // @UseGuards(AuthGuard('kakao'))
  // private async kakaoCallback(
  //   // @Req() req: Request & IOAuthUser, //
  //   // @Res() res: Response,
  //   @Query() { code }: { readonly code: string },
  // ) {
  //   // console.log('req : ', req);
  //   // console.log('res : ', res);
  //
  //   console.log('code : ', code);
  //   // return req.user;
  //   await this.service.kakaoOAuth({ code });
  //
  //   return ' call back success';
  // }
}
