import {IFileManager, File} from './interfaces/ifile-manager';

export class FileManager implements IFileManager {

  private removeMe: File;
  listFiles(): Array<File> {
    return [];
  }

  readFile(id: String): File {
    return this.removeMe;
  }

  saveFile(file: File): void {
    this.removeMe = file;
    console.log(`Saving File ${file.id}`)
  }

}
