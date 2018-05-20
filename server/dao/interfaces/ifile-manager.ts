export interface File {
  id: string;
  fileExtension: string;
  data: Buffer;
}
export interface IFileManager {
  saveFile(file: File): void;
  readFile(id: String): File;
  listFiles(): Array<File>
}
