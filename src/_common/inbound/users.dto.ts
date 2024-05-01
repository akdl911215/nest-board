import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { Users } from '@prisma/client';

export class UsersDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  public readonly id!: Users['id'];

  @IsString()
  @IsNotEmpty()
  public readonly email!: Users['email'];

  @IsString()
  @IsNotEmpty()
  @Matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,12}$/, {
    message: '닉네임은 2자리 이상 12자리 이하입니다.',
  })
  public readonly nickname!: Users['nickname'];
}
