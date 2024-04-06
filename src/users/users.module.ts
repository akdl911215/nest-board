import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { UsersRepository } from './users.repository';
import { BcryptService } from './infrastructure/bcrypt/bcrypt.service';

@Module({
  controllers: [UsersController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: UsersService },
    { provide: 'BCRYPT_SERVICE', useClass: BcryptService },

    // repository
    { provide: 'REPOSITORY', useClass: UsersRepository },
  ],
})
export class UsersModule {}
