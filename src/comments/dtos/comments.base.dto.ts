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
  public readonly authorId!: Comments['author_id'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly content!: Comments['content'];
}
