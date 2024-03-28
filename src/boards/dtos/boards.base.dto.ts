import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { Boards } from '@prisma/client';

export class BoardsBaseDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly id!: Boards['id'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly title!: Boards['title'];

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  public readonly password?: Boards['password'];

  @IsString()
  @ApiProperty({
    type: String,
    default: '',
    required: true,
  })
  public readonly category!: Boards['category'];

  @IsDate()
  public readonly createdAt!: Boards['created_at'];

  @IsDate()
  public readonly updatedAt!: Boards['updated_at'];

  @IsDate()
  public readonly deletedAt?: Boards['deleted_at'];
}
