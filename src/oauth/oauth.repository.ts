import {
  ConflictException,
  Dependencies,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { OauthRepositoryInterface } from './interfaces/oauth.repository.interface';
import { Users } from '@prisma/client';
import { BcryptService } from '../users/infrastructure/bcrypt/bcrypt.service';
import { TokenService } from '../users/infrastructure/token/token.service';
import { EXISTING_MEMBER } from '../_common/constant/errors/409';
import { errorHandling } from '../_common/abstract/error.handling';

@Injectable()
@Dependencies([PrismaService, BcryptService, TokenService])
export class OauthRepository implements OauthRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('BCRYPT_SERVICE') private readonly bcrypt: BcryptService,
    @Inject('TOKEN_SERVICE') private readonly jwtToken: TokenService,
  ) {}

  public async getFindByEmail({
    email,
  }: {
    readonly email: string;
  }): Promise<Users> {
    return await this.prisma.users.findUnique({ where: { email } });
  }

  public async kakaoOAuthSignUp(entity: {
    readonly email: string;
    readonly phone: string;
    readonly nickname: string;
    readonly password: string;
  }): Promise<Users> {
    const { email, phone, nickname, password } = entity;

    const userFindByEntity: Users = await this.prisma.users.findFirst({
      where: { OR: [{ email }, { phone }, { nickname }] },
    });
    if (userFindByEntity) throw new ConflictException(EXISTING_MEMBER);

    const { encoded: hashPassword } = await this.bcrypt.encoded({ password });

    try {
      const registerUser: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.create({
            data: {
              email,
              nickname,
              password: hashPassword,
              phone,
            },
          }),
      );

      return registerUser;
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
