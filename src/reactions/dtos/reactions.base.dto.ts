import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Reactions, ReactionType } from '@prisma/client';

export type ReactionTargetType = 'BOARD' | 'COMMENT' | 'REPLY';
export class ReactionsBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: string;

  @IsEnum(ReactionType)
  @IsNotEmpty()
  @ApiProperty({
    enum: ['LIKE', 'DISLIKE'],
  })
  public readonly type!: Reactions['type'];

  @IsNotEmpty()
  @ApiProperty({
    enum: ['BOARD', 'COMMENT', 'REPLY'],
  })
  public readonly reactionTarget!: ReactionTargetType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly boardId!: Reactions['board_id'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly userId!: string;
}
