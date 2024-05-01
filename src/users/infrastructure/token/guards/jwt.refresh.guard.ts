import {
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PrismaService } from '../../../../_common/infrastructure/prisma.service';
import { Users } from '@prisma/client';
import { NOTFOUND_USER } from '../../../../_common/constant/errors/404';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('JWT-REFRESH-TOKEN') {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // console.log('jwtRefreshGuard request : ', request);
    // console.log('JwtRefreshGuard context : ', context);

    const request = await context.switchToHttp().getRequest();
    const token: string =
      await request?.headers?.authorization?.split('Bearer ')[1];

    const userFindById: Users = await this.prisma.users.findFirst({
      where: { refresh_token: token },
    });
    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    request.user = userFindById;

    return true;
    // return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    console.log('JwtRefreshGuard user : ', user);

    return user;
  }
}
