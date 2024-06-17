import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersServiceInterface } from '../../../users/interfaces/users.service.interface';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RefreshTokenPayloadType } from '../../../users/infrastructure/token/type/refresh.token.payload.type';
import { Users } from '@prisma/client';

const KAKAO_TEST_CLIENT_ID: string = process.env.KAKAO_TEST_CLIENT_ID;
console.log('KAKAO_TEST_CLIENT_ID : ', KAKAO_TEST_CLIENT_ID);
const KAKAO_HOST: string = process.env.HOST;
console.log('KAKAO_HOST : ', KAKAO_HOST);
const KAKAO_PORT: number = Number(process.env.PORT);
console.log('KAKAO_PORT : ', KAKAO_PORT);

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject('SERVICE') private readonly service: UsersServiceInterface,
    private readonly configService: ConfigService,
  ) {
    super({
      // clientID: process.env.KAKAO_CLIENT_ID,
      clientID: process.env.KAKAO_TEST_CLIENT_ID,
      // clientSecret: process.env.KAKAO_TEST_CLIENT_SECRET,
      clientSecret: '',
      // clientSecret: process.env.KAKAO_CLIENT_SECRET,
      // callbackURL: `http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao/callback`,
      callbackURL: `http://${process.env.HOST}:9898/users/kakao/`,
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      // secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
    console.log('ka 1');
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('ka 3s');
    console.log('accessToken : ', accessToken);
    console.log('refreshToken : ', refreshToken);
    console.log('profile : ', profile);
    // const token: string = request?.headers?.authorization?.split('Bearer ')[1];
    // console.log('token : ', token);
    // console.log('payload : ', payload);
    // const user: Users = await this.service.kakaoAuth({
    //   refreshToken: token,
    //   id: payload?.id,
    // });

    const obj = {
      name: profile.displayName,
      email: profile.email,
      hashedPassword: '',
    };

    console.log('obj : ', obj);

    return obj;
  }
}
