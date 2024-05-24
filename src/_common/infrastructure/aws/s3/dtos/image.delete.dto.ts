import { PickType } from '@nestjs/swagger';
import { PresignedUrlBaseDto } from './presigned.url.base.dto';

export class ImageDeleteInputDto extends PickType(PresignedUrlBaseDto, [
  'key',
] as const) {}

export type ImageDeleteOutputDto = { readonly delete: string };
