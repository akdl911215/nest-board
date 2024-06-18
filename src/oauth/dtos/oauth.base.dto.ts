import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class OauthBaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly email!: Users['email'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  public readonly password!: Users['password'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  public readonly nickname!: Users['nickname'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  public readonly phone!: Users['phone'];
}
