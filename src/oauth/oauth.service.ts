import { Inject, Injectable } from '@nestjs/common';
import { OauthServiceInterface } from './interfaces/oauth.service.interface';
import { OauthRepositoryInterface } from './interfaces/oauth.repository.interface';

@Injectable()
export class OauthService implements OauthServiceInterface {
  constructor(
    @Inject('REPOSITORY') private readonly repository: OauthRepositoryInterface,
  ) {}

  public async kakaoOAuth(dto: { readonly code: string }): Promise<any> {
    return await this.repository.kakaoOAuth(dto);
  }
}
