import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersServiceInterface } from '../../../interfaces/users.service.interface';

const KAKAO_CLIENT_ID: string = process.env.KAKAO_CLIENT_ID;
console.log('KAKAO_CLIENT_ID : ', KAKAO_CLIENT_ID);
const KAKAO_HOST: string = process.env.host;
console.log('KAKAO_HOST : ', KAKAO_HOST);
const KAKAO_PORT: number = Number(process.env.port);
console.log('KAKAO_PORT : ', KAKAO_PORT);

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'KAKAO') {
  constructor(
    @Inject('SERVICE') private readonly service: UsersServiceInterface,
  ) {
    super({
      clientID: KAKAO_CLIENT_ID,
      clientSecret: '', // 카카오는 clientSecret을 사용하지 않습니다.
      callbackURL: `http://${KAKAO_HOST}:${KAKAO_PORT}/users/kakao/callback`,
    });
    console.log('ka 1');
  }

  async validate({
    accessToken,
    refreshToken,
    profile,
    done,
  }: {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly profile: any;
    readonly done: Function;
  }) {
    console.log('ka 3s');
    const user = await this.service.kakaoAuth(profile);

    done(null, user);
  }
}
