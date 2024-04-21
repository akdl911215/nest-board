import { PickType } from '@nestjs/swagger';
import { CommentsBaseDto } from './comments.base.dto';
import { Comments } from '@prisma/client';

export class CommentsRegisterInputDto extends PickType(CommentsBaseDto, [
  'boardId',
  'content',
  'nickname',
] as const) {}

export type CommentsRegisterOutputDto = Comments;
