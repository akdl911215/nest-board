import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../../_common/infrastructure/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RefreshTokenPayloadType } from '../type/refresh.token.payload.type';
import { Users } from '@prisma/client';
import { NOT_MATCH_REFRESH_TOKEN } from '../../../../_common/constant/errors/400';
import { NOTFOUND_USER } from '../../../../_common/constant/errors/404';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'JWT-REFRESH-TOKEN',
) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    console.log('JwtRefreshTokenStrategy');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: RefreshTokenPayloadType,
  ): Promise<Users> {
    const token: string = request?.headers?.authorization?.split('Bearer ')[1];
    console.log('token : ', token);
    console.log('payload : ', payload);
    console.log('request : ', request);

    const userFindById: Users = await this.prisma.users.findUnique({
      where: { id: payload?.id },
    });
    console.log('JwtRefreshTokenStrategy token : ', token);
    console.log('userFindById : ', userFindById);

    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    if (token !== userFindById.refresh_token)
      throw new BadRequestException(NOT_MATCH_REFRESH_TOKEN);

    return userFindById;
  }
}
