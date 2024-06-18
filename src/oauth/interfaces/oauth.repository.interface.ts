import { Users } from '@prisma/client';

export interface OauthRepositoryInterface {
  readonly kakaoOAuthSignUp: (entity: {
    readonly email: string;
    readonly phone: string;
    readonly nickname: string;
    readonly password: string;
  }) => Promise<Users>;

  readonly getFindByEmail: (entity: {
    readonly email: string;
  }) => Promise<Users>;
}
