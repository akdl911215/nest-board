import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class OAuthKakaoAuthInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly email!: string;
}

export type OAuthKakaoAuthOutputDto = Users;
