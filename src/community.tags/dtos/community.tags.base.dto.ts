import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommunitiesTags } from '@prisma/client';

export class CommunityTagsBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly tagId!: CommunitiesTags['tag_id'];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly communityId!: CommunitiesTags['community_id'];

  @IsArray()
  @ApiProperty({
    type: Array,
    default: [],
    required: true,
  })
  public readonly tags!: string[];
}
