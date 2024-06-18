import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { KakaoStrategy } from './infrastructures/strategies/kakao.strategy';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { OauthRepository } from './oauth.repository';
import { TokenService } from '../users/infrastructure/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [OauthController],
  providers: [
    // infrastructure
    PrismaService,
    KakaoStrategy,
    JwtService,

    // service
    { provide: 'SERVICE', useClass: OauthService },
    { provide: 'TOKEN_SERVICE', useClass: TokenService },
    { provide: 'USERS_SERVICE', useClass: UsersService },

    // repository
    { provide: 'REPOSITORY', useClass: OauthRepository },
  ],
})
export class OauthModule {}
