import { PickType } from '@nestjs/swagger';
import { CommentsBaseDto } from './comments.base.dto';
import { Comments } from '@prisma/client';

export class CommentsInquiryInputDto extends PickType(CommentsBaseDto, [
  'userId',
] as const) {}
export type CommentsInquiryOutputDto = Comments[];
