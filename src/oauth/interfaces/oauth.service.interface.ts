export interface OauthServiceInterface {
  readonly kakaoOAuth: (dto: { readonly code: string }) => Promise<any>;
}
