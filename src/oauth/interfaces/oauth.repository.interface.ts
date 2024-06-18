import { Users } from '@prisma/client';

export interface OauthRepositoryInterface {
  readonly getFindByEmail: (entity: {
    readonly email: string;
  }) => Promise<Users>;

  readonly oAuthLogin: (entity: {
    readonly email: Users['email'];
  }) => Promise<Users & { readonly access_token: string }>;
}
