import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { KakaoStrategy } from './infrastructures/strategies/kakao.strategy';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { OauthRepository } from './oauth.repository';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from '../users/infrastructure/token/token.module';
import { BcryptService } from '../users/infrastructure/bcrypt/bcrypt.service';
import { TokenService } from '../users/infrastructure/token/token.service';

@Module({
  controllers: [OauthController],
  imports: [PassportModule, TokenModule],
  providers: [
    // infrastructure
    PrismaService,
    KakaoStrategy,

    // service
    { provide: 'SERVICE', useClass: OauthService },
    { provide: 'BCRYPT_SERVICE', useClass: BcryptService },
    { provide: 'TOKEN_SERVICE', useClass: TokenService },

    // repository
    { provide: 'REPOSITORY', useClass: OauthRepository },
  ],
})
export class OauthModule {}
