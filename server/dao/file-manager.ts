import {IFileManager, File, AssetType, FileName} from './interfaces/ifile-manager';
import * as fs from 'fs';

export class FileManager implements IFileManager {

  private removeMe: File;
  // TODO: Read this from environment var
  private readonly ASSET_PATH: string = '../';

  public static sanitizeImageData(data: Buffer) {
    return data.toString().replace(/^data:image\/png;base64,/, '');
  }

  listFiles(assetType: AssetType): Array<FileName> {
    return fs.readdirSync(this.ASSET_PATH + assetType);
  }

  readFile(id: FileName, assetType: AssetType): File {
    const data = fs.readFileSync(this.ASSET_PATH + assetType + '/' + id);
    console.log(`Read data`);
    console.log(data);
    const [fileName, extension ] = id.split('.');
    return new File(fileName, extension, data);
  }

  saveFile(file: File): void {
    this.removeMe = file;
    const path = this.ASSET_PATH + file.id + '.' + file.fileExtension;
    fs.writeFile(path, FileManager.sanitizeImageData(file.data), 'base64', (err) => {
      if (err !== null) {
        console.log(`there was an error ${err}`);
      }
    });
    console.log(`Saved File ${file.id}`)
  }
}
