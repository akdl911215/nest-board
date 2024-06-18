import { Inject, Injectable } from '@nestjs/common';
import { OauthServiceInterface } from './interfaces/oauth.service.interface';
import { OauthRepositoryInterface } from './interfaces/oauth.repository.interface';
import {
  OAuthKakaoAuthInputDto,
  OAuthKakaoAuthOutputDto,
} from './dtos/oauth.kakao.auth.dto';
import {
  OAuthKakaoLoginInputDto,
  OAuthKakaoLoginOutputDto,
} from './dtos/oauth.kakao.login.dto';
import { Users } from '@prisma/client';

@Injectable()
export class OauthService implements OauthServiceInterface {
  constructor(
    @Inject('REPOSITORY') private readonly repository: OauthRepositoryInterface,
  ) {}

  public async kakaoOAuth(
    dto: OAuthKakaoAuthInputDto,
  ): Promise<OAuthKakaoAuthOutputDto> {
    const user: Users = await this.repository.getFindByEmail(dto);

    return user;
  }

  public async kakaoLogin(
    dto: OAuthKakaoLoginInputDto,
  ): Promise<OAuthKakaoLoginOutputDto> {
    const login: Users = await this.repository.oAuthLogin({
      email: dto.email,
    });

    return login;
  }
}
