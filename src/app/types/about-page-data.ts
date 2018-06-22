export class AboutPageData {
  aboutText: string;
  photoUrl: string;

  constructor(aboutPageData: Partial<AboutPageData>) {
    Object.assign(this, aboutPageData);
  }
}
