import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Users } from '@prisma/client';

export class UsersLoginInputDto extends PickType(UsersBaseDto, [
  'email',
  'password',
] as const) {}

export type UsersLoginOutputDto = Users & { readonly access_token: string };
