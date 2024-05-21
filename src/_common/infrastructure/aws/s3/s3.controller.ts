import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { S3Service } from './s3.service';
import * as process from 'process';
import { CREATE_SUCCESS } from '../../../constant/successes/201';
import { INTERNAL_SERVER_ERROR } from '../../../constant/errors/500';
import {
  PresignedUrlInputDto,
  PresignedUrlOutputDto,
} from './dtos/presigned.url.dto';

@ApiTags('s3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('presigned-url')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({
    summary: 'GET AWS PRESIGNED URL',
    description: 'GET AWS PRESIGNED URL',
  })
  @ApiResponse({ status: 201, description: `${CREATE_SUCCESS}` })
  @ApiResponse({ status: 500, description: `${INTERNAL_SERVER_ERROR}` })
  private async getPresignedUrl(
    @Body() body: PresignedUrlInputDto,
  ): Promise<PresignedUrlOutputDto> {
    const { key, expires } = body;
    // 프리사인드 URL을 생성할 때,
    // key는 S3 버킷 내에서 파일을 업로드하거나 다운로드할 위치를 지정한다.
    // 예를 들어, 사용자가 images/profile.jpg라는 파일을 업로드하려면
    // key 값으로 images/profile.jpg를 사용한다.

    const bucket: string = process.env.S3_BUCKET_NAME;

    const url: string = await this.s3Service.generatePresignedUrl(
      bucket,
      key,
      expires,
    );

    return { url };
  }
}
