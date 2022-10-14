import { Image, ImageRepository as ImageRepositoryInterface } from '../interfaces';
import { ImageModel } from '../models';

export class ImageRepository implements ImageRepositoryInterface {
  constructor(private readonly mongooseRepository = ImageModel) {}

  public async create({ url, name, originalUrl }: Image): Promise<Image> {
    const image = await this.mongooseRepository.create({
      createdAt: new Date().toISOString(),
      originalUrl,
      name,
      url,
    });

    return image;
  }

  public async findByOriginalUrl(originalUrl: string): Promise<Image | null> {
    const image = await this.mongooseRepository.findOne({ originalUrl }).lean();
    return image || null;
  }
}
