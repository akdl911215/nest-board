import { IsDate, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Replies } from '@prisma/client';

export class RepliesBaseDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Replies['id'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly nickname!: Replies['nickname'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly content!: Replies['content'];

  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly commentId!: Replies['comment_id'];

  @IsDate()
  public readonly createdAt!: Replies['created_at'];

  @IsDate()
  public readonly updatedAt!: Replies['updated_at'];

  @IsDate()
  public readonly deletedAt?: Replies['deleted_at'];
}
