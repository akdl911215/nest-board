import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { OauthRepositoryInterface } from './interfaces/oauth.repository.interface';
import process from 'process';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
@Dependencies([PrismaService])
export class OauthRepository implements OauthRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  public async kakaoOAuth(entity: { readonly code: string }): Promise<any> {
    const { code } = entity;

    const ADMIN_KEY: string = process.env.KAKAO_TEST_ADMIN_KEY;
    console.log('ADMIN_KEY : ', ADMIN_KEY);

    const headers = {
      Authorization: ADMIN_KEY,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const url = 'https://kauth.kakao.com/oauth/token';
    // const headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // };
    const CLIENT_ID: string = process.env.KAKAO_TEST_CLIENT_ID;

    const data = new URLSearchParams({
      // grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      // refresh_token: '',
      //redirect_uri:`http://${process.env.HOST}:${Number(process.env.PORT)}/users/kakao/callback`,
      grant_type: 'authorization_code',
      code,
      scope: 'account_email profile_nickname phone_number name',
    });

    const response = await firstValueFrom(
      this.http.post(url, data.toString(), { headers }),
    );

    console.log('response : ', response);

    const {
      access_token,
      token_type,
      refresh_token,
      id_token,
      expires_in,
      refresh_token_expires_in,
    } = response.data;
    console.log('access_token : ', access_token);
    console.log('refresh_token : ', refresh_token);
    console.log('id_token : ', id_token);

    // const profileUrl = 'https://kapi.kakao.com/v2/user/me';
    //
    // const profileHeaders = {
    //   Authorization: `Bearer ${access_token}`,
    //   'Custom-Header': 'CustomHeaderValue',
    // };
    //
    // const profile = await firstValueFrom(
    //   this.http.get(profileUrl, { headers: profileHeaders }),
    // );
    // console.log('profile : ', profile);
    // const userFindByIdAndRefreshToken: Users =
    //   await this.prisma.users.findFirst({
    //     where: { AND: [{ id }, { refresh_token }] },
    //   });
    // if (!userFindByIdAndRefreshToken)
    //   throw new NotFoundException(NOT_MATCH_REFRESH_TOKEN);

    return null;
  }
}
