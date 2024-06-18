import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { KakaoStrategy } from './infrastructures/strategies/kakao.strategy';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { OauthRepository } from './oauth.repository';

@Module({
  controllers: [OauthController],
  providers: [
    // infrastructure
    PrismaService,
    KakaoStrategy,

    // service
    { provide: 'SERVICE', useClass: OauthService },

    // repository
    { provide: 'REPOSITORY', useClass: OauthRepository },
  ],
})
export class OauthModule {}
