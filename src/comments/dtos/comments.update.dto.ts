import { PickType } from '@nestjs/swagger';
import { CommentsBaseDto } from './comments.base.dto';
import { Comments } from '@prisma/client';

export class CommentsUpdateInputDto extends PickType(CommentsBaseDto, [
  'id',
  'authorId',
  'content',
] as const) {}

export type CommentsUpdateOutputDto = Comments;
