import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersServiceInterface } from '../../../users/interfaces/users.service.interface';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RefreshTokenPayloadType } from '../../../users/infrastructure/token/type/refresh.token.payload.type';
import { Users } from '@prisma/client';
import { PrismaService } from '../../../_common/infrastructure/prisma.service';
import { OauthServiceInterface } from '../../interfaces/oauth.service.interface';
import { errorHandling } from '../../../_common/abstract/error.handling';

const KAKAO_TEST_CLIENT_ID: string = process.env.KAKAO_TEST_CLIENT_ID;
console.log('KAKAO_TEST_CLIENT_ID : ', KAKAO_TEST_CLIENT_ID);
const KAKAO_HOST: string = process.env.HOST;
console.log('KAKAO_HOST : ', KAKAO_HOST);
const KAKAO_PORT: number = Number(process.env.PORT);
console.log('KAKAO_PORT : ', KAKAO_PORT);

type KakaoProfileType = {
  readonly id: string;
  readonly email: string;
};

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject('SERVICE') private readonly service: OauthServiceInterface,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      // clientID: process.env.KAKAO_CLIENT_ID,
      clientID: process.env.KAKAO_TEST_CLIENT_ID,
      // clientSecret: process.env.KAKAO_TEST_CLIENT_SECRET,
      clientSecret: '',
      // clientSecret: process.env.KAKAO_CLIENT_SECRET,
      // callbackURL: `http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao/callback`,
      callbackURL: `http://${process.env.HOST}:9898/oauth/kakao/callback`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
    console.log('ka 1');
  }

  async validate(profile: KakaoProfileType) {
    console.log('ka 3s');

    const obj: KakaoProfileType = {
      ...profile,
      // email: 'akdl913212@naver.coc',
    };

    try {
      const userProfileCheck = await this.service.kakaoOAuth(obj);

      if (userProfileCheck) {
        return { profile: userProfileCheck };
      } else {
        return { profile: obj.email };
      }
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
