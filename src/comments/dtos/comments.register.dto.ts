import { PickType } from '@nestjs/swagger';
import { CommentsBaseDto } from './comments.base.dto';
import { Comments } from '@prisma/client';

export class CommentsRegisterInputDto extends PickType(CommentsBaseDto, [
  'authorId',
  'content',
] as const) {}

export type CommentsRegisterOutputDto = Comments;
