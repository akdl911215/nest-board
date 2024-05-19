import { PickType } from '@nestjs/swagger';
import { CommentsBaseDto } from './comments.base.dto';
import { Comments } from '@prisma/client';

export class CommentsListInputDto extends PickType(CommentsBaseDto, [
  'boardId',
] as const) {}

export type CommentsListOutputDto = Comments[];
