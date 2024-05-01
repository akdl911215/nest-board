import { IsDate, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UsersBaseDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  public readonly id!: Users['id'];

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  public readonly email!: Users['email'];

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    default: '',
    format: 'password',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      '비밀번호는 최소 8자, 하나 이상의 문자, 하나의 숫자 및 하나의 특수문자입니다.',
  })
  public readonly password!: Users['password'];

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  public readonly phone!: Users['phone'];

  @IsString()
  @Matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,12}$/, {
    message: '닉네임은 2자리 이상 12자리 이하입니다.',
  })
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  public readonly nickname!: Users['nickname'];

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    default: '',
  })
  public readonly refreshToken?: Users['refresh_token'];

  @IsDate()
  public readonly createdAt!: Users['created_at'];

  @IsDate()
  public readonly updatedAt!: Users['updated_at'];

  @IsDate()
  public readonly deletedAt?: Users['deleted_at'];
}
