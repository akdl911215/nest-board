import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { UsersRepository } from './users.repository';
import { BcryptService } from './infrastructure/bcrypt/bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './infrastructure/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [
    // infrastructure
    PrismaService,
    ConfigService,
    JwtService,

    // service
    { provide: 'SERVICE', useClass: UsersService },
    { provide: 'BCRYPT_SERVICE', useClass: BcryptService },
    { provide: 'TOKEN_SERVICE', useClass: TokenService },

    // repository
    { provide: 'REPOSITORY', useClass: UsersRepository },
  ],
})
export class UsersModule {}
