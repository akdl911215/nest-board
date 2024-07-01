import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { OauthServiceInterface } from '../../interfaces/oauth.service.interface';
import process from 'node:process';
import { errorHandling } from '../../../_common/abstract/error.handling';

const NAVER_CLIENT_ID: string = process.env.NAVER_CLIENT_ID;
console.log('NAVER_CLIENT_ID : ', NAVER_CLIENT_ID);
const NAVER_CLIENT_SECRET: string = process.env.NAVER_CLIENT_SECRET;
console.log('NAVER_CLIENT_SECRET : ', NAVER_CLIENT_SECRET);
const NAVER_CALLBACK_URL: string = `http://${process.env.HOST}:${process.env.PORT}/oauth/naver`;
console.log('NAVER_CALLBACK_URL : ', NAVER_CALLBACK_URL);

type NaverProfileType = {
  readonly email: string;
};

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @Inject('SERVICE') private readonly service: OauthServiceInterface,
  ) {
    super({
      clientID: NAVER_CLIENT_ID,
      clientSecret: NAVER_CLIENT_SECRET,
      callbackURL: NAVER_CALLBACK_URL,
    });
  }

  async validate(profile: any) {
    console.log('naver 3s');

    const obj: NaverProfileType = {
      email: profile.email,
    };

    try {
      const getFindByUser = await this.service.oauthUserFindByEmail(obj);
      console.log('getFindByUser : ', getFindByUser);

      if (getFindByUser) {
        delete getFindByUser['password'];
        return { profile: getFindByUser };
      } else {
        return { profile: { email: obj.email } };
      }
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
