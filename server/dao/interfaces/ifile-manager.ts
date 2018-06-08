export class File {

  id: FileName;
  fileExtension: string;
  data: Buffer;

  constructor(id: FileName, fileExtension: string, data: Buffer) {
    this.id = id;
    this.fileExtension = fileExtension;
    this.data = data;
  }
}
export type FileName = string;
export enum AssetType {
  IMAGE = 'fullsize',
  THUMBNAIL = 'thumbnails'
}

export interface IFileManager {
  saveFile(file: File): void;
  readFile(id: FileName, assetType: AssetType): File;
  listFiles(assetType: AssetType): Array<FileName>
}
