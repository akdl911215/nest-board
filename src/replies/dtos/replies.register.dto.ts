import { PickType } from '@nestjs/swagger';
import { RepliesBaseDto } from './replies.base.dto';
import { Replies } from '@prisma/client';

export class RepliesRegisterInputDto extends PickType(RepliesBaseDto, [
  'nickname',
  'content',
  'commentId',
] as const) {}

export type RepliesRegisterOutputDto = Replies;
