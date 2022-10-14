export type FileConfigCreateFormDataDto = {
  filePath: string;
  key: string;
};

export type FileConfigDownloadFileDto = {
  filePath: string;
  fileUrl: string;
  ssl?: boolean;
};

export interface FileConfig {
  tempDir: string;
  downloadFile: (dto: FileConfigDownloadFileDto) => Promise<unknown>;
  deleteFile: ({ filePath }: { filePath: string }) => void;
}
