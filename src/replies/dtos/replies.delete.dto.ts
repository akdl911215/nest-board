import { PickType } from '@nestjs/swagger';
import { RepliesBaseDto } from './replies.base.dto';
import { Replies } from '@prisma/client';

export class RepliesDeleteInputDto extends PickType(RepliesBaseDto, [
  'id',
  'commentId',
] as const) {}

export type RepliesDeleteOutputDto = Replies;
