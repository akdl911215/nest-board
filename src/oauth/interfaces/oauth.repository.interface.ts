export interface OauthRepositoryInterface {
  readonly kakaoOAuth: (entity: { readonly code: string }) => Promise<any>;
}
