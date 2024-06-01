import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from '@prisma/client';

export class CommentsBaseDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Comments['id'];

  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly boardId!: Comments['board_id'];

  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly userId!: Comments['user_id'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly content!: Comments['content'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly nickname!: Comments['nickname'];
}
