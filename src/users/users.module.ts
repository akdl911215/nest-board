import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { UsersRepository } from './users.repository';
import { BcryptService } from './infrastructure/bcrypt/bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './infrastructure/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from './infrastructure/token/strategies/jwt.access.token.strategy';
import { JwtRefreshTokenStrategy } from './infrastructure/token/strategies/jwt.refresh.token.strategy';
import { TokenModule } from './infrastructure/token/token.module';

@Module({
  controllers: [UsersController],
  imports: [TokenModule],
  providers: [
    // infrastructure
    PrismaService,
    ConfigService,
    JwtService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,

    // service
    { provide: 'SERVICE', useClass: UsersService },
    { provide: 'BCRYPT_SERVICE', useClass: BcryptService },
    { provide: 'TOKEN_SERVICE', useClass: TokenService },

    // repository
    { provide: 'REPOSITORY', useClass: UsersRepository },
  ],
})
export class UsersModule {}
