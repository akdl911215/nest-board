import { ApiProperty, PickType } from '@nestjs/swagger';
import { UsersBaseDto } from './users.base.dto';
import { Users } from '@prisma/client';
import { Type } from 'class-transformer';

export class UsersRegisterInputDto extends PickType(UsersBaseDto, [
  'nickname',
  'email',
  'password',
  'phone',
] as const) {
  @Type(() => String)
  @ApiProperty({
    type: String,
    default: '',
    format: 'password',
    required: true,
  })
  public readonly confirmPassword!: Users['password'];
}

export type UsersRegisterOutputDto = Users;
