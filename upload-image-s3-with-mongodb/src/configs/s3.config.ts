import { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';

import { S3Config as S3ConfigInterface, UploadFileDto } from '../interfaces';
import { envConfig } from './env.config';
import { loggerConfig } from './logger.config';

export class S3Config implements S3ConfigInterface {
  private readonly client: S3;

  constructor() {
    this.client = new S3();
  }

  public async uploadFile({ contentType, filePath }: UploadFileDto) {
    loggerConfig.log(`Uploading: ${filePath}`, 'S3Config');

    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: envConfig.BUCKET_NAME,
      Key: path.basename(filePath),
      Body: fileStream,
      ContentType: contentType,
      ACL: 'public-read',
    };

    const data = await this.client.upload(uploadParams).promise();

    loggerConfig.log(`Uploaded: ${data.Location}`, 'S3Config');

    return data.Location;
  }
}

export const s3Config = new S3Config();
