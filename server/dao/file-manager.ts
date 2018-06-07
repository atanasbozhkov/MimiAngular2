import {IFileManager, File} from './interfaces/ifile-manager';
import * as fs from 'fs';

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
    let cleanData = file.data.toString().replace(/^data:image\/png;base64,/, '');
    fs.writeFile('../' + file.id + '.' + file.fileExtension, cleanData, 'base64', (err) => {
      if (err !== null) {
        console.log(`there was an error ${err}`);
      }
    });
    console.log(`Saving File ${file.id}`)
  }

}
