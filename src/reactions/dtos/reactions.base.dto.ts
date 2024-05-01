import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Reactions } from '@prisma/client';

export class ReactionsBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Reactions['id'];

  @IsEnum(['ZERO', 'LIKE', 'DISLIKE'])
  @IsNotEmpty()
  public readonly type!: Reactions['type'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly boardId!: Reactions['board_id'];
}
