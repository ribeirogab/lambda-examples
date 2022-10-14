export interface UploadImageService {
  execute(url: string): Promise<void>;
}
