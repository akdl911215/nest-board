import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersServiceInterface } from '../../interfaces/users.service.interface';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject('SERVICE') private readonly service: UsersServiceInterface,
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '', // 카카오는 clientSecret을 사용하지 않습니다.
      callbackURL: 'http://localhost:3000/auth/kakao/callback',
    });
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
    const user = await this.service.kakaoAuth(profile);

    done(null, user);
  }
}
