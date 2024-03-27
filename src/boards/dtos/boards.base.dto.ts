import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class BoardsBaseDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: string;
}
