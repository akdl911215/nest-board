import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { fromAsyncIterable } from 'rxjs/internal/observable/innerFrom';

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
