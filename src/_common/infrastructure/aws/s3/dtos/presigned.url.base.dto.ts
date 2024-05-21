import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PresignedUrlBaseDto {
  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  readonly key!: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    default: 60,
    required: false,
  })
  @IsOptional()
  readonly expires?: number;
}
