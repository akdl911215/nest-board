import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { OauthServiceInterface } from '../../interfaces/oauth.service.interface';
import process from 'node:process';

const CLIENT_ID:string = process.env.NVAER

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @Inject('SERVICE') private readonly service: OauthServiceInterface
  ) {
    super({
      clientID: CLIENT_ID
    });
  }
}

