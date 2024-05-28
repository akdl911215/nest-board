import { IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchesBaseDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: string;

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly query!: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    default: 1,
    required: true,
  })
  public readonly count!: number;
}
