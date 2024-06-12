import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWSACCESSKEYID,
      secretAccessKey: process.env.AWSSECRETACCESSKEY,
      region: process.env.AWSREGION,
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

    const res = await this.s3.getSignedUrlPromise('putObject', params);

    return res;
  }

  async deleteImage({
    keys,
  }: {
    readonly keys: string[];
  }): Promise<{ readonly delete: boolean }> {
    console.log('keys : ', keys);
    const params = {
      Bucket: 'jaychbucket',
      Delete: {
        Objects: keys.map((key: string) => ({ Key: key })),
        Quiet: false,
      },
    };
    console.log('params : ', params);

    const response = await this.s3.deleteObjects(params).promise();

    console.log('response : ', response);

    if (response.Deleted.length > 0) {
      console.log('Successfully deleted objects:', response.Deleted);
    }
    if (response.Errors.length > 0) {
      console.error('Failed to delete objects:', response.Errors);
    }

    return { delete: true };
  }
}
