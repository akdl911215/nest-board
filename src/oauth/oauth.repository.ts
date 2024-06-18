import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { OauthRepositoryInterface } from './interfaces/oauth.repository.interface';
import { Users } from '@prisma/client';

@Injectable()
@Dependencies([PrismaService])
export class OauthRepository implements OauthRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async getFindByEmail({
    email,
  }: {
    readonly email: string;
  }): Promise<Users> {
    const userFindByEmail: Users = await this.prisma.users.findUnique({
      where: { email },
    });
    return userFindByEmail;
  }
}
