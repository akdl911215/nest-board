import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../_common/infrastructure/prisma.service';
import { TokenService } from './token.service';

const PASSPORT_MODULE = PassportModule.register({ session: false });
const JWT_MODULE = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
  }),
});

@Module({
  imports: [JWT_MODULE, PASSPORT_MODULE, ConfigModule],
  providers: [
    PrismaService,
    { provide: 'TOKEN_SERVICE', useClass: TokenService },
  ],
  exports: [{ provide: 'TOKEN_SERVICE', useClass: TokenService }],
})
export class TokenModule {}
