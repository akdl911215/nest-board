import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CREATE_SUCCESS,
  LOGIN_SUCCESS,
} from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  UsersRegisterInputDto,
  UsersRegisterOutputDto,
} from './dtos/users.register.dto';
import {
  EMAIL_REQUIRED,
  NICKNAME_REQUIRED,
  NOT_MATCH_REFRESH_TOKEN,
  PASSWORD_REQUIRED,
  PHONE_REQUIRED,
  UNIQUE_ID_REQUIRED,
} from '../_common/constant/errors/400';
import {
  UsersLoginInputDto,
  UsersLoginOutputDto,
} from './dtos/users.login.dto';
import { TWO_HUNDRED_OK } from '../_common/constant/successes/200';
import {
  UsersInquiryInputDto,
  UsersInquiryOutputDto,
} from './dtos/users.inquiry.dto';
import {
  UsersDeleteInputDto,
  UsersDeleteOutputDto,
} from './dtos/users.delete.dto';
import {
  UsersUpdateInputDto,
  UsersUpdateOutputDto,
} from './dtos/users.update.dto';
import {
  UsersProfileInputDto,
  UsersProfileOutputDto,
} from './dtos/users.profile.dto';
import { PasswordCheckingInterceptor } from './infrastructure/interceptor/password.checking.interceptor';
import { RegisterRefreshTokenDeleteInterceptor } from './infrastructure/interceptor/register.refresh.token.delete.interceptor';
import {
  UsersRefreshTokenReIssuanceInputDto,
  UsersRefreshTokenReIssuanceOutputDto,
} from './dtos/users.refresh.token.re.issuance.dto';
import { JwtRefreshGuard } from './infrastructure/token/guards/jwt.refresh.guard';
import { JwtAccessGuard } from './infrastructure/token/guards/jwt.access.guard';
import {
  UsersExistingNicknameInputDto,
  UsersExistingNicknameOutputDto,
} from './dtos/users.existing.nickname.dto';
import {
  UsersExistingEmailInputDto,
  UsersExistingEmailOutputDto,
} from './dtos/users.existing.email.dto';
import {
  UsersExistingPhoneInputDto,
  UsersExistingPhoneOutputDto,
} from './dtos/users.existing.phone.dto';
import { User } from '../_common/decorators/user.decorator';
import { NOTFOUND_USER } from '../_common/constant/errors/404';
import {
  UsersLogoutInputDto,
  UsersLogoutOutputDto,
} from './dtos/users.logout.dto';
import { KakaoGuard } from './infrastructure/kakao/guards/kakak.guard';
import { AuthGuard } from '@nestjs/passport';

interface IOAuthUser {
  user: {
    readonly name: string;
    readonly email: string;
    readonly password: string;
  };
}

@ApiTags('users')
@Controller('users')
@UseInterceptors(PasswordCheckingInterceptor)
export class UsersController {
  constructor(
    @Inject('SERVICE') private readonly service: UsersServiceInterface,
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
    // const REDIRECTION_URI: string = `http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao/callback`;
    const REDIRECTION_URI: string = `http://${process.env.HOST}:3000/kakao/login`;
    console.log('REDIRECTION_URI : ', REDIRECTION_URI);
    const url: string = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_TEST_CLIENT_ID}&redirect_uri=${REDIRECTION_URI}`;
    console.log('url : ', url);

    return { url };
  }

  @Get('/kakao')
  // @UseGuards(KakaoGuard)
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 404, description: `${NOT_MATCH_REFRESH_TOKEN}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async kakaoLogin() {
    // Kakao 로그인 페이지로 리디렉션
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
    await this.service.kakaoAuth({ code });

    return ' call back success';
  }

  @Get('/existing/nickname/:nickname')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER EXISTING NICKNAME INQUIRY API',
    description: '유저 닉네임 존재 여부 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${NICKNAME_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async existingNickname(
    @Param() dto: UsersExistingNicknameInputDto,
  ): Promise<UsersExistingNicknameOutputDto> {
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.existingNickname(dto);
  }

  @Get('/existing/email/:email')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER EXISTING EMAIL INQUIRY API',
    description: `유저 E-MAIL 존재 여부 절차`,
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${EMAIL_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async existingEmail(
    @Param() dto: UsersExistingEmailInputDto,
  ): Promise<UsersExistingEmailOutputDto> {
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);

    return await this.service.existingEmail(dto);
  }

  @Get('/existing/phone/:phone')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER EXISTING PHONE INQUIRY API',
    description: `유저  핸드폰 존재 여부 절차`,
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${EMAIL_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async existingPhone(
    @Param() dto: UsersExistingPhoneInputDto,
  ): Promise<UsersExistingPhoneOutputDto> {
    if (!dto?.phone) throw new BadRequestException(PHONE_REQUIRED);

    return await this.service.existingPhone(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @UseInterceptors(RegisterRefreshTokenDeleteInterceptor)
  @Get('/profile/:id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER PROFILE API',
    description: '유저 프로필 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async profile(
    @Param() dto: UsersProfileInputDto,
  ): Promise<UsersProfileOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.profile(dto);
  }

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'USER REGISTER API', description: '회원 가입 절차' })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${NICKNAME_REQUIRED}, ${EMAIL_REQUIRED}, ${PASSWORD_REQUIRED}, ${PHONE_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async register(
    @Body() dto: UsersRegisterInputDto,
  ): Promise<UsersRegisterOutputDto> {
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!dto?.password) throw new BadRequestException(PASSWORD_REQUIRED);
    if (!dto?.phone) throw new BadRequestException(PHONE_REQUIRED);

    return await this.service.register(dto);
  }

  @Post('/login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'USER LOGIN API', description: '로그인 절차' })
  @ApiResponse({ status: 201, description: `${LOGIN_SUCCESS}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async login(
    @Body() dto: UsersLoginInputDto,
  ): Promise<UsersLoginOutputDto> {
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!dto?.password) throw new BadRequestException(PASSWORD_REQUIRED);

    return await this.service.login(dto);
  }

  @UseInterceptors(RegisterRefreshTokenDeleteInterceptor)
  @Get('/inquiry')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER INQUIRY API',
    description: '유저 관련 정보 조회 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${NICKNAME_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async inquiry(
    @Query() dto: UsersInquiryInputDto,
  ): Promise<UsersInquiryOutputDto> {
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.inquiry(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @Patch('/delete')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER DELETE API',
    description: '유저 삭제 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async delete(
    @Body() dto: UsersDeleteInputDto,
  ): Promise<UsersDeleteOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.delete(dto);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('access_token')
  @UseInterceptors(RegisterRefreshTokenDeleteInterceptor)
  @Patch('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER UPDATE API',
    description: '유저 수정 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${UNIQUE_ID_REQUIRED}, ${NICKNAME_REQUIRED}, ${EMAIL_REQUIRED}, ${PHONE_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async update(
    @Body() dto: UsersUpdateInputDto,
  ): Promise<UsersUpdateOutputDto> {
    if (!dto?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!dto?.phone) throw new BadRequestException(PHONE_REQUIRED);

    return await this.service.update(dto);
  }

  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth('refresh_token')
  @Get('/refresh/token')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER REFRESH TOKEN RE ISSUANCE API',
    description: '유저 리프레쉬 토큰 재발급 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({
    status: 400,
    description: `${NICKNAME_REQUIRED}, ${EMAIL_REQUIRED}, ${NICKNAME_REQUIRED}`,
  })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async refresh(
    @User() user: UsersRefreshTokenReIssuanceInputDto,
  ): Promise<UsersRefreshTokenReIssuanceOutputDto> {
    if (!user?.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);
    if (!user?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!user?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);

    return await this.service.refresh(user);
  }

  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth('refresh_token')
  @Patch('/logout')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'USER LOGOUT API',
    description: '유저 로그아웃 절차',
  })
  @ApiResponse({ status: 200, description: `${TWO_HUNDRED_OK}` })
  @ApiResponse({ status: 400, description: `${UNIQUE_ID_REQUIRED}` })
  @ApiResponse({ status: 404, description: `${NOTFOUND_USER}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async logout(
    @User() user: UsersLogoutInputDto,
  ): Promise<UsersLogoutOutputDto> {
    if (!user.id) throw new BadRequestException(UNIQUE_ID_REQUIRED);

    return await this.service.logout(user);
  }
}
