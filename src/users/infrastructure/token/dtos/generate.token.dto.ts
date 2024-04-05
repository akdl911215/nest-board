import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenInputDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'access-token',
    type: String,
    required: false,
    default: '',
  })
  public readonly accessToken?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'refresh-token',
    type: String,
    required: false,
    default: '',
  })
  public readonly refreshToken?: string;
}

export type GenerateTokenOutputDto = {
  readonly accessToken: string;
  readonly refreshToken: string;
};
