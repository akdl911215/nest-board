import { PickType } from '@nestjs/swagger';
import { RepliesBaseDto } from './replies.base.dto';
import { Replies } from '@prisma/client';

export class RepliesUpdateInputDto extends PickType(RepliesBaseDto, [
  'id',
  'nickname',
  'content',
  'commentId',
] as const) {}

export type RepliesUpdateOutputDto = Replies;
