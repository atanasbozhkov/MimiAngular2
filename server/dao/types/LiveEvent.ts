/**
 * Created by atanasbozhkov on 08/11/2016.
 */
export class LiveEvent {

  day: number;
  month: string;
  year: number;
  hour: string;
  date: Date;

  eventName: string;
  eventLocation: string;

  facebookLink: string;
  googleMapsLink: string;

  constructor(date: Date,
              eventName: string,
              eventLocation: string,
              facebookLink: string,
              googleMapsLink: string) {
    this.date = date;
    this.day = date.getDate();
    this.month = this.monthNumberToString(date.getMonth());
    this.year = date.getFullYear();
    this.hour = this.formatHours(date);
    this.eventName = eventName;
    this.eventLocation = eventLocation;
    this.facebookLink = facebookLink;
    this.googleMapsLink = googleMapsLink;
  }

  private formatHours(date: Date): string {
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (minutes !== '00') {
      return hours + ':' + minutes + ampm;
    }
    return hours + ampm;
  }

  private monthNumberToString(monthNumber): string {
    switch (monthNumber) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
    }
  }
}
