export class MusicPageData {
  songs: Array<Song>;
  videos: Array<string>;
  photoUrl: string;

  constructor(musicPageData: Partial<MusicPageData>) {
    Object.assign(this, musicPageData);
  }

}

export class Song {
  title: string;
  author: string;
  url: string;
  pic: string;

  constructor(song: Partial<Song>) {
    Object.assign(this, song);
  }
}
