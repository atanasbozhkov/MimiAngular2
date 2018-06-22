import { LiveEvent } from './live-event';

export class LivePageData {
  liveEvents: Array<LiveEvent>;

  constructor(livePage: Partial<LivePageData>) {
    Object.assign(this, livePage);
  }
}
