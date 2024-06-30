import {
  BadRequestException,
  Dependencies,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { OauthRepositoryInterface } from './interfaces/oauth.repository.interface';
import { Users } from '@prisma/client';
import {
  TokenService,
  tokensType,
} from '../users/infrastructure/token/token.service';
import { NO_MATCH_EMAIL } from '../_common/constant/errors/400';
import { AccessTokenPayloadType } from '../users/infrastructure/token/type/access.token.payload.type';
import { RefreshTokenPayloadType } from '../users/infrastructure/token/type/refresh.token.payload.type';
import { errorHandling } from '../_common/abstract/error.handling';

@Injectable()
@Dependencies([PrismaService, TokenService])
export class OauthRepository implements OauthRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('TOKEN_SERVICE') private readonly jwtToken: TokenService,
  ) {}

  public async oAuthLogin(entity: {
    readonly email: Users['email'];
  }): Promise<Users & { readonly access_token: string }> {
    const { email } = entity;
    console.log('email : ', email);

    const userFineByEmail: Users = await this.prisma.users.findUnique({
      where: { email },
    });
    console.log('userFineByEmail : ', userFineByEmail);
    if (!userFineByEmail) throw new BadRequestException(NO_MATCH_EMAIL);

    const accessPayload: AccessTokenPayloadType = {
      id: userFineByEmail.id,
      email: userFineByEmail.email,
    };

    const refreshPayload: RefreshTokenPayloadType = {
      id: userFineByEmail.id,
      email: userFineByEmail.email,
      nickname: userFineByEmail.nickname,
    };

    const tokens: tokensType = {
      accessPayload,
      refreshPayload,
    };

    const { accessToken, refreshToken } =
      await this.jwtToken.generateTokens(tokens);

    try {
      const loginSuccess: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.update({
            where: { id: userFineByEmail.id },
            data: { refresh_token: refreshToken },
          }),
      );

      return {
        ...loginSuccess,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async oauthUserFindByEmail({
    email,
  }: {
    readonly email: string;
  }): Promise<Users> {
    const userFindByEmail: Users = await this.prisma.users.findUnique({
      where: { email },
    });
    return userFindByEmail;
  }
}
