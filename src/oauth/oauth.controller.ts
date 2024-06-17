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

  @Get('/kakao/login/page')
  @Header('Content-Type', 'text/html')
  private async kakaoRedirect() {
    // const KAKAO_CLIENT_ID: string = process.env.KAKAO_CLIENT_ID;
    // console.log('KAKAO_CLIENT_ID : ', KAKAO_CLIENT_ID);
    // const REDIRECTION_URI: string = `http://${process.env.HOST}:${Number(process.env.port)}/users/kakao/callback`;
    //
    // const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECTION_URI}`;

    const KAKAO_TEST_CLIENT_ID: string = process.env.KAKAO_TEST_CLIENT_ID;
    console.log('KAKAO_TEST_CLIENT_ID : ', KAKAO_TEST_CLIENT_ID);
    // const REDIRECTION_URI: string = `http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao`;
    const REDIRECTION_URI: string = `http://${process.env.HOST}:3000/kakao/login`;
    console.log('REDIRECTION_URI : ', REDIRECTION_URI);
    const url: string = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_TEST_CLIENT_ID}&redirect_uri=${REDIRECTION_URI}`;
    console.log('url : ', url);

    return { url };
  }

  @Get('/kakao')
  // @UseGuards(AuthGuard('kakao')) // kakao.strategy를 실행시켜 줍니다.
  @HttpCode(301)
  // @UseGuards(KakaoGuard)
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 404, description: `${NOT_MATCH_REFRESH_TOKEN}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    // Kakao 로그인 페이지로 리디렉션
    console.log('req : ', req);
    console.log('res : ', res);
  }

  @Get('/kakao/callback/')
  // @Redirect(
  //   `http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao/callback`,
  //   301,
  // )
  // @UseGuards(KakaoGuard)
  // @UseGuards(AuthGuard('kakao'))
  private async kakaoCallback(
    // @Req() req: Request & IOAuthUser, //
    // @Res() res: Response,
    @Query() { code }: { readonly code: string },
  ) {
    // console.log('req : ', req);
    // console.log('res : ', res);

    console.log('code : ', code);
    // return req.user;
    await this.service.kakaoOAuth({ code });

    return ' call back success';
  }
}
