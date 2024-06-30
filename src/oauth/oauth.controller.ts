import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OAuth } from './infrastructures/decorators/oauth.decorator';
import { Users } from '@prisma/client';
import { OauthServiceInterface } from './interfaces/oauth.service.interface';
import { UsersServiceInterface } from '../users/interfaces/users.service.interface';
import {
  EMAIL_REQUIRED,
  NICKNAME_REQUIRED,
  PASSWORD_REQUIRED,
  PHONE_REQUIRED,
} from '../_common/constant/errors/400';
import { CREATE_SUCCESS } from '../_common/constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../_common/constant/errors/500';
import {
  OAuthKakaoRegisterInputDto,
  OAuthKakaoRegisterOutputDto,
} from './dtos/oauth.kakao.register.dto';
import { EXISTING_MEMBER } from '../_common/constant/errors/409';

export type ExportGetFindByEmailType = 'NEW_USER' | 'EXITING_USER';
export type ReturnOAuthType = {
  readonly type: ExportGetFindByEmailType;
  readonly profile: Users | { readonly email: string };
};
@ApiTags('oauth')
@Controller('oauth')
export class OauthController {
  constructor(
    @Inject('SERVICE') private readonly service: OauthServiceInterface,
    @Inject('USERS_SERVICE')
    private readonly usersService: UsersServiceInterface,
  ) {}

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  private async naverAuth(@OAuth() profile): Promise<any> {
    const user: Users = await this.service.oauthUserFindByEmail({
      email: profile.email,
    });

    let res: ReturnOAuthType = {
      type: 'EXITING_USER',
      profile: user,
    };
    if (!user) {
      res = {
        type: 'NEW_USER',
        profile: { email: profile.email },
      };
    }

    return res;
  }

  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  private async kakaoAuth(@OAuth() profile): Promise<ReturnOAuthType> {
    const user: Users = await this.service.oauthUserFindByEmail({
      email: profile.email,
    });

    let res: ReturnOAuthType = {
      type: 'EXITING_USER',
      profile: user,
    };
    if (!user) {
      res = {
        type: 'NEW_USER',
        profile: { email: profile.email },
      };
    }

    return res;
  }

  @Get('/kakao/login')
  @UseGuards(AuthGuard('kakao'))
  private async kakaoOAuthLogin(@OAuth() profile) {
    const res: Users = await this.service.kakaoLogin({ email: profile.email });

    return res;
  }

  @Post('/')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'KAKAO OAUTH REGISTER API',
    description: '카카오 OAUTH 회원 가입 절차',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({
    status: 400,
    description: `${NICKNAME_REQUIRED}, ${EMAIL_REQUIRED}, ${PASSWORD_REQUIRED}, ${PHONE_REQUIRED}`,
  })
  @ApiResponse({ status: 409, description: `${EXISTING_MEMBER}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async kakaoOauthRegister(
    @Body() dto: OAuthKakaoRegisterInputDto,
  ): Promise<OAuthKakaoRegisterOutputDto> {
    console.log('kakaoOauthRegister dto : ', dto);
    if (!dto?.nickname) throw new BadRequestException(NICKNAME_REQUIRED);
    if (!dto?.email) throw new BadRequestException(EMAIL_REQUIRED);
    if (!dto?.password) throw new BadRequestException(PASSWORD_REQUIRED);
    if (!dto?.phone) throw new BadRequestException(PHONE_REQUIRED);

    return await this.usersService.register(dto);
  }
}
