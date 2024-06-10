import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardTags } from '@prisma/client';

export class BoardTagsBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly tagId!: BoardTags['tag_id'];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly boardId!: BoardTags['board_id'];

  @IsArray()
  @ApiProperty({
    type: Array,
    default: [],
    required: true,
  })
  public readonly tags!: string[];
}
