import {
  UploadImageService as UploadImageServiceInterface,
  ImageRepository,
  Logger,
  FileConfig,
  S3Config,
} from '../interfaces';

export class UploadImageService implements UploadImageServiceInterface {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly fileConfig: FileConfig,
    private readonly s3Config: S3Config,
    private readonly logger: Logger,
  ) {}

  public async execute(url: string): Promise<void> {
    const imageExists = await this.imageRepository.findByOriginalUrl(url);

    if (imageExists) {
      throw Error('Image already exists');
    }

    this.logger.log(`Uploading image from url: ${url}`, 'UploadImageService');

    const filename = this.getFilenameFromUrl(url);
    const imagePath = `${this.fileConfig.tempDir}/${filename}.jpg`;
    await this.fileConfig.downloadFile({ fileUrl: url, filePath: imagePath });

    const s3Url = await this.s3Config.uploadFile({
      contentType: 'image/jpeg',
      filePath: imagePath,
    });

    await this.imageRepository.create({
      originalUrl: url,
      name: filename,
      url: s3Url,
    });

    this.fileConfig.deleteFile({ filePath: imagePath });

    this.logger.log(`Image uploaded`, 'UploadImageService');
  }

  private getFilenameFromUrl(url: string) {
    const randomNumber = Math.floor(Math.random() * 99999);
    return `${url.substring(url.lastIndexOf('/') + 1).split('.')[0]}-${randomNumber}`;
  }
}
