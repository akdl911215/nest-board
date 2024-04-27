import { PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';

export class UsersExistingPhoneInputDto extends PickType(UsersBaseDto, [
  'phone',
] as const) {}

export type UsersExistingPhoneOutputDto = { readonly existing_phone: boolean };
