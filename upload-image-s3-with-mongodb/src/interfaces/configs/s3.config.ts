export type UploadFileDto = {
  contentType: 'image/jpeg' | 'application/octet-stream';
  filePath: string;
};

export interface S3Config {
  uploadFile(dto: UploadFileDto): Promise<string>;
}
