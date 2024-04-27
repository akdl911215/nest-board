import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';

export class UsersExistingNicknameInputDto extends PickType(UsersBaseDto, [
  'nickname',
] as const) {}

export type UsersExistingNicknameOutputDto = {
  readonly existing_nickname: boolean;
};
