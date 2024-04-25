import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../../_common/infrastructure/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Users } from '@prisma/client';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'JWT-ACCESS-TOKEN',
) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate({ id }): Promise<Users> {
    const user: Users = await this.prisma.users.findUnique({ where: { id } });

    return user;
  }
}
