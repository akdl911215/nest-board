import {
  OauthUserFindByEmailInputDto,
  OauthUserFindByEmailOutputDto,
} from '../dtos/oauth.user.find.by.email.dto';
import {
  OAuthKakaoLoginInputDto,
  OAuthKakaoLoginOutputDto,
} from '../dtos/oauth.kakao.login.dto';

export interface OauthServiceInterface {
  readonly oauthUserFindByEmail: (
    dto: OauthUserFindByEmailInputDto,
  ) => Promise<OauthUserFindByEmailOutputDto>;

  readonly kakaoLogin: (
    dto: OAuthKakaoLoginInputDto,
  ) => Promise<OAuthKakaoLoginOutputDto>;
}
