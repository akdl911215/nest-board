import {
  OAuthKakaoAuthInputDto,
  OAuthKakaoAuthOutputDto,
} from '../dtos/oauth.kakao.auth.dto';

export interface OauthServiceInterface {
  readonly kakaoOAuth: (
    dto: OAuthKakaoAuthInputDto,
  ) => Promise<OAuthKakaoAuthOutputDto>;
}
