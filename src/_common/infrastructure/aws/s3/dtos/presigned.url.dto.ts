import { PickType } from '@nestjs/swagger';
import { PresignedUrlBaseDto } from './presigned.url.base.dto';

export class PresignedUrlInputDto extends PickType(PresignedUrlBaseDto, [
  'key',
  'expires',
] as const) {}

export type PresignedUrlOutputDto = { readonly url: string };
