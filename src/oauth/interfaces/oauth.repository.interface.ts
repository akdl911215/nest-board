import { Users } from '@prisma/client';

export interface OauthRepositoryInterface {
  readonly getFindByEmail: (entity: {
    readonly email: string;
  }) => Promise<Users>;
}
