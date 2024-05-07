import {
  BadRequestException,
  ConflictException,
  Dependencies,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { UsersRepositoryInterface } from './interfaces/users.repository.interface';
import { Boards, Prisma, Users } from '@prisma/client';
import {
  BaseCursorPaginationInputDto,
  BaseCursorPaginationOutputDto,
  BaseOffsetPaginationInputDto,
  BaseOffsetPaginationOutputDto,
} from '../_common/abstract/base.pagination.dto';
import { errorHandling } from '../_common/abstract/error.handling';
import { NOTFOUND_USER } from '../_common/constant/errors/404';
import {
  getListOffsetPagination,
  PageReturnType,
} from '../_common/abstract/get.list.page.nation';
import {
  NO_MATCH_EMAIL,
  NO_MATCH_PASSWORD,
} from '../_common/constant/errors/400';
import { TokenService, tokensType } from './infrastructure/token/token.service';
import { BcryptService } from './infrastructure/bcrypt/bcrypt.service';
import { AccessTokenPayloadType } from './infrastructure/token/type/access.token.payload.type';
import { RefreshTokenPayloadType } from './infrastructure/token/type/refresh.token.payload.type';
import { EXISTING_MEMBER } from '../_common/constant/errors/409';

@Injectable()
@Dependencies([PrismaService, BcryptService, TokenService])
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('BCRYPT_SERVICE') private readonly bcrypt: BcryptService,
    @Inject('TOKEN_SERVICE') private readonly jwtToken: TokenService,
  ) {}

  public async delete(entity: { readonly id: Users['id'] }): Promise<Users> {
    const { id } = entity;

    const userFindById: Users = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    try {
      const deleteUser: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.update({
            where: { id },
            data: { deleted_at: new Date() },
          }),
      );

      return deleteUser;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async inquiry(entity: {
    readonly nickname: Users['nickname'];
    readonly take: BaseCursorPaginationInputDto['take'];
    readonly last_id: Boards['id'];
  }): Promise<{
    readonly total_count: BaseCursorPaginationOutputDto<Boards>['total_count'];
    readonly current_list: BaseCursorPaginationOutputDto<Boards>['current_list'];
  }> {
    const { nickname, take, last_id } = entity;

    const userFindByNickname: Users = await this.prisma.users.findUnique({
      where: { nickname, deleted_at: null },
    });
    if (!userFindByNickname) throw new NotFoundException(NOTFOUND_USER);

    let idCheck = last_id;
    if (last_id === 'null') idCheck = null;

    const orderBy: Prisma.BoardsOrderByWithAggregationInput[] = [
      {
        created_at: 'desc',
      },
    ];

    const sql = {
      take,
      where: {
        nickname,
        deleted_at: null,
        comments: {
          every: {
            deleted_at: null,
          },
        },
      },
      orderBy,
      include: {
        comments: {
          where: {
            deleted_at: null,
          },
          orderBy,
          include: {
            replies: {
              where: {
                deleted_at: null,
              },
              orderBy,
            },
          },
        },
      },
    };

    if (idCheck) {
      sql['skip'] = 1;
      sql['cursor'] = {
        id: idCheck,
      };
    }

    const currentList: Boards[] = await this.prisma.boards.findMany(sql);

    const countSql = { deleted_at: null, nickname };
    const totalCount: number = await this.prisma.boards.count({
      where: countSql,
    });

    return {
      total_count: totalCount,
      current_list: currentList,
    };
  }

  public async list(entity: {
    readonly page: BaseOffsetPaginationInputDto['page'];
    readonly take: BaseOffsetPaginationInputDto['take'];
  }): Promise<BaseOffsetPaginationOutputDto<Users>> {
    const { page, take } = entity;

    const totalTake: number = await this.prisma.users.count({
      where: { deleted_at: null },
    });

    const pagination: PageReturnType = getListOffsetPagination({
      page,
      take,
      totalTake,
    });

    try {
      const currentList: Users[] = await this.prisma.users.findMany({
        orderBy: [{ created_at: 'desc' }],
        skip: pagination.skip,
        take: pagination.take,
        where: { deleted_at: null },
      });

      return {
        current_page: pagination.currentPage,
        total_pages: pagination.totalPages,
        total_take: totalTake,
        current_list: currentList,
      };
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async login(entity: {
    readonly email: Users['email'];
    readonly password: Users['password'];
  }): Promise<Users & { readonly access_token: string }> {
    const { email, password } = entity;

    const userFineByEmail: Users = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!userFineByEmail) throw new BadRequestException(NO_MATCH_EMAIL);

    const { decoded } = await this.bcrypt.decoded({
      password,
      hashPassword: userFineByEmail.password,
    });
    const comparePassword: boolean = decoded;
    if (!comparePassword) throw new BadRequestException(NO_MATCH_PASSWORD);

    const accessPayload: AccessTokenPayloadType = {
      id: userFineByEmail.id,
      email: userFineByEmail.email,
    };

    const refreshPayload: RefreshTokenPayloadType = {
      id: userFineByEmail.id,
      email: userFineByEmail.email,
      nickname: userFineByEmail.nickname,
    };

    const tokens: tokensType = {
      accessPayload,
      refreshPayload,
    };

    const { accessToken, refreshToken } =
      await this.jwtToken.generateTokens(tokens);

    try {
      const loginSuccess: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.update({
            where: { id: userFineByEmail.id },
            data: { refresh_token: refreshToken },
          }),
      );

      return {
        ...loginSuccess,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (e: any) {
      errorHandling(e);
    }
  }
  public async register(entity: {
    readonly nickname: Users['nickname'];
    readonly email: Users['email'];
    readonly password: Users['password'];
    readonly phone: Users['phone'];
  }): Promise<Users> {
    const { email, nickname, password, phone } = entity;

    // 자동 체크 기능 넣으면 제거해도 되는 부분
    const userFindByEntity: Users = await this.prisma.users.findFirst({
      where: { AND: [{ email }, { nickname }, { phone }] },
    });
    if (userFindByEntity) throw new ConflictException(EXISTING_MEMBER);

    const { encoded: hashPassword } = await this.bcrypt.encoded({ password });

    try {
      const registerUser: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.create({
            data: {
              email,
              nickname,
              password: hashPassword,
              phone,
            },
          }),
      );

      return registerUser;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async update(entity: {
    readonly id: Users['id'];
    readonly nickname: Users['nickname'];
    readonly email: Users['email'];
    readonly phone: Users['phone'];
  }): Promise<Users> {
    const { id, nickname, email, phone } = entity;

    // 자동 체크 기능 넣으면 제거해도 되는 부분
    const userFindById: Users = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    if (userFindById.nickname !== nickname) {
      const userFindByNickname: Users = await this.prisma.users.findUnique({
        where: { nickname },
      });
      if (userFindByNickname) throw new ConflictException(EXISTING_MEMBER);
    }

    if (userFindById.email !== email) {
      const userFindByEmail: Users = await this.prisma.users.findUnique({
        where: { email },
      });
      if (userFindByEmail) throw new ConflictException(EXISTING_MEMBER);
    }

    if (userFindById.phone !== phone) {
      const userFindByPhone: Users = await this.prisma.users.findUnique({
        where: { phone },
      });
      if (userFindByPhone) throw new ConflictException(EXISTING_MEMBER);
    }

    try {
      const updateUser: Users = await this.prisma.users.update({
        where: { id },
        data: {
          nickname,
          email,
          phone,
          updated_at: new Date(),
        },
      });

      return updateUser;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async profile(entity: { readonly id: Users['id'] }): Promise<Users> {
    const { id } = entity;

    const userFindById: Users = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!userFindById) throw new NotFoundException(NOTFOUND_USER);

    return userFindById;
  }

  public async refresh(entity: {
    readonly id: Users['id'];
    readonly email: Users['email'];
    readonly nickname: Users['nickname'];
  }): Promise<{
    readonly id: Users['id'];
    readonly email: Users['email'];
    readonly nickname: Users['nickname'];
    readonly access_token: string | null;
    readonly refresh_token: Users['refresh_token'];
  }> {
    const { id, email, nickname } = entity;

    const accessPayload: AccessTokenPayloadType = { id, email };
    const refreshPayload: RefreshTokenPayloadType = { id, email, nickname };

    try {
      const { accessToken, refreshToken } = await this.jwtToken.generateTokens({
        accessPayload,
        refreshPayload,
      });

      const refreshUpdateUser: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.update({
            where: { id },
            data: { refresh_token: refreshToken },
          }),
      );

      return {
        id: refreshUpdateUser.id,
        email: refreshUpdateUser.email,
        nickname: refreshUpdateUser.email,
        access_token: accessToken,
        refresh_token: refreshUpdateUser.refresh_token,
      };
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async existingEmail(entity: {
    readonly email: Users['email'];
  }): Promise<{ readonly existing_email: boolean }> {
    const userFindByEmail: Users = await this.prisma.users.findUnique({
      where: { email: entity.email },
    });

    return { existing_email: !userFindByEmail };
  }

  public async existingNickname(entity: {
    readonly nickname: Users['nickname'];
  }): Promise<{ readonly existing_nickname: boolean }> {
    const userFindByNickname: Users = await this.prisma.users.findUnique({
      where: { nickname: entity.nickname },
    });

    return { existing_nickname: !userFindByNickname };
  }

  public async existingPhone(entity: {
    readonly phone: Users['phone'];
  }): Promise<{ readonly existing_phone: boolean }> {
    const userFindByPhone: Users = await this.prisma.users.findUnique({
      where: { phone: entity.phone },
    });

    return { existing_phone: !userFindByPhone };
  }

  public async logout(entity: {
    readonly refresh_token: Users['refresh_token'];
  }): Promise<{ readonly logout: boolean }> {
    const { refresh_token } = entity;
    const userFindByRefreshToken: Users = await this.prisma.users.findFirst({
      where: { refresh_token },
    });

    if (!userFindByRefreshToken) throw new NotFoundException(NOTFOUND_USER);

    try {
      const logoutUser: Users = await this.prisma.$transaction(
        async () =>
          await this.prisma.users.update({
            where: { id: userFindByRefreshToken.id },
            data: { refresh_token: null },
          }),
      );

      return { logout: !!logoutUser };
    } catch (e: any) {
      errorHandling(e);
    }
  }
}
