import { fileConfig, loggerConfig, mongooseConfig, s3Config } from './configs';
import { ImageRepository } from './repositories';
import { UploadImageService } from './services';

let uploadImageService: UploadImageService;
let imageRepository: ImageRepository;

export const container = async () => {
  await mongooseConfig.connect();

  imageRepository = imageRepository || new ImageRepository();

  uploadImageService =
    uploadImageService ||
    new UploadImageService(imageRepository, fileConfig, s3Config, loggerConfig);

  return { uploadImageService };
};
