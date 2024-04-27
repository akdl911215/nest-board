import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';

export class UsersExistingEmailInputDto extends PickType(UsersBaseDto, [
  'email',
] as const) {}

export type UsersExistingEmailOutputDto = { readonly existing_email: boolean };
