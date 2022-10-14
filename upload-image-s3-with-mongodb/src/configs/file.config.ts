import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';

import {
  FileConfig as FileConfigInterface,
  FileConfigDownloadFileDto,
} from '../interfaces';
import { envConfig } from './env.config';

class FileConfig implements FileConfigInterface {
  public tempDir =
    envConfig.STAGE === 'prod' ? '/tmp' : path.resolve(__dirname, '..', 'tmp');

  constructor() {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  public async downloadFile({
    filePath,
    fileUrl,
    ssl = true,
  }: FileConfigDownloadFileDto) {
    const file = this.createWriteStream(filePath);

    await new Promise(resolve =>
      (ssl ? https : http).get(fileUrl, response => {
        console.log('[UploadConfig] Downloading file...');
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log('[UploadConfig] Download completed');
          resolve({ success: true });
        });
      }),
    );
  }

  public deleteFile({ filePath }) {
    fs.unlinkSync(filePath);
  }

  private createWriteStream(filePath: string): fs.WriteStream {
    return fs.createWriteStream(filePath);
  }
}

export const fileConfig = new FileConfig();
