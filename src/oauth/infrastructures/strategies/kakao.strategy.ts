import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { OauthServiceInterface } from '../../interfaces/oauth.service.interface';
import { errorHandling } from '../../../_common/abstract/error.handling';

const KAKAO_TEST_CLIENT_ID: string = process.env.KAKAO_TEST_CLIENT_ID;
console.log('KAKAO_TEST_CLIENT_ID : ', KAKAO_TEST_CLIENT_ID);
const KAKAO_HOST: string = process.env.HOST;
console.log('KAKAO_HOST : ', KAKAO_HOST);
const KAKAO_PORT: number = Number(process.env.PORT);
console.log('KAKAO_PORT : ', KAKAO_PORT);

type KakaoProfileType = {
  readonly email: string;
};

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject('SERVICE') private readonly service: OauthServiceInterface,
    private readonly configService: ConfigService,
  ) {
    super({
      // clientID: process.env.KAKAO_CLIENT_ID,
      clientID: process.env.KAKAO_TEST_CLIENT_ID,
      // clientSecret: process.env.KAKAO_TEST_CLIENT_SECRET,
      clientSecret: '',
      // clientSecret: process.env.KAKAO_CLIENT_SECRET,
      // callbackURL: `http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao/callback`,
      callbackURL: `http://${process.env.HOST}:9898/oauth/kakao`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
    console.log('ka 1');
  }

  async validate(profile: KakaoProfileType) {
    console.log('ka 3s');

    const obj: KakaoProfileType = {
      email: profile.email,
      // email: 'akdl913212@naver.ddd',
    };

    try {
      const userProfileCheck = await this.service.oauthUserFindByEmail(obj);

      if (userProfileCheck) {
        delete userProfileCheck['password'];
        return { profile: userProfileCheck };
      } else {
        return { profile: { email: obj.email } };
      }
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
