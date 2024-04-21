import { PickType } from '@nestjs/swagger';
import { CommentsBaseDto } from './comments.base.dto';
import { Comments } from '@prisma/client';

export class CommentsDeleteInputDto extends PickType(CommentsBaseDto, [
  'id',
] as const) {}

export type CommentsDeleteOutputDto = Comments;
