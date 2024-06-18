import {
  OAuthKakaoAuthInputDto,
  OAuthKakaoAuthOutputDto,
} from '../dtos/oauth.kakao.auth.dto';
import {
  OAuthKakaoLoginInputDto,
  OAuthKakaoLoginOutputDto,
} from '../dtos/oauth.kakao.login.dto';

export interface OauthServiceInterface {
  readonly kakaoOAuth: (
    dto: OAuthKakaoAuthInputDto,
  ) => Promise<OAuthKakaoAuthOutputDto>;

  readonly kakaoLogin: (
    dto: OAuthKakaoLoginInputDto,
  ) => Promise<OAuthKakaoLoginOutputDto>;
}
