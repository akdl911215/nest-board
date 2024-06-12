import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ViewedBoards } from '@prisma/client';

export class ViewedBoardsBaseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: ViewedBoards['id'];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly userId!: ViewedBoards['user_id'];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly boardId!: ViewedBoards['board_id'];

  @IsDate()
  public readonly viewedAt!: ViewedBoards['viewed_at'];
}
