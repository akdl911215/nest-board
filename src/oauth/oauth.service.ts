import { Inject, Injectable } from '@nestjs/common';
import { OauthServiceInterface } from './interfaces/oauth.service.interface';
import { OauthRepositoryInterface } from './interfaces/oauth.repository.interface';
import {
  OauthUserFindByEmailInputDto,
  OauthUserFindByEmailOutputDto,
} from './dtos/oauth.user.find.by.email.dto';
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

  public async oauthUserFindByEmail(
    dto: OauthUserFindByEmailInputDto,
  ): Promise<OauthUserFindByEmailOutputDto> {
    const user: Users = await this.repository.oauthUserFindByEmail(dto);
    console.log('oauthUserFindByEmail user : ', user);

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
