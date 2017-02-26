/**
 * Created by atanasbozhkov on 08/11/2016.
 */
export class LiveEvent {

  day: number;
  month: string;
  year: number;
  hour: string;
  date: number;

  eventName: string;
  eventLocation: string;

  facebookLink: string;
  googleMapsLink: string;


  constructor(date: number,
              eventName: string,
              eventLocation: string,
              facebookLink: string,
              googleMapsLink: string) {
    this.date = date;
    var dateParse = new Date(date);
    this.day = dateParse.getDay();
    this.month = this.monthNumberToString(dateParse.getMonth());
    this.year = dateParse.getFullYear();
    this.hour = dateParse.getHours().toString();
    this.eventName = eventName;
    this.eventLocation = eventLocation;
    this.facebookLink = facebookLink;
    this.googleMapsLink = googleMapsLink;
  }

  private monthNumberToString(monthNumber): string{
    switch (monthNumber){
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }
}
