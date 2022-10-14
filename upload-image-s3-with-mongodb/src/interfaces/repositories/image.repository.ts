import { Image } from '../models/image';

export interface ImageRepository {
  create(image: Image): Promise<Image>;
  findByOriginalUrl(originalUrl: string): Promise<Image | null>;
}
