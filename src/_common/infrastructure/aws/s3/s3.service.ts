import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      // accessKeyId: process.env.AWS_ACCEESS_KEY_ID,
      // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async generatePresignedUrl(
    bucketName: string,
    key: string,
    expires: number = 60,
  ): Promise<string> {
    const params: {
      Bucket: string;
      Key: string;
      Expires: number;
      ACL: string;
    } = {
      Bucket: bucketName,
      Key: key,
      Expires: expires,
      ACL: 'public-read',
    };

    return this.s3.getSignedUrlPromise('putObject', params);
  }

  async deleteImage(key: string): Promise<{ readonly delete: boolean }> {
    const params = {
      Bucket: 'jaychbucket',
      Key: key,
    };

    const response = await this.s3.deleteObject(params).promise();

    console.log('response : ', response);

    return { delete: true };
  }
}
