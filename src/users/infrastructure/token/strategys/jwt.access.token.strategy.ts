import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../../_common/infrastructure/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Users } from '@prisma/client';
import { NOTFOUND_USER } from '../../../../_common/constant/errors/404';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'JWT-ACCESS-TOKEN',
) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate({ id }: { readonly id: Users['id'] }): Promise<Users> {
    const userFindById: Users = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    return userFindById;
  }
}
