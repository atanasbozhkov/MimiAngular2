export class AboutPageData {
  aboutText: string;

  constructor(aboutPageData: Partial<AboutPageData>) {
    Object.assign(this, aboutPageData);
  }
}
