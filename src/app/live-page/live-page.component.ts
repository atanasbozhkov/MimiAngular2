import {Component, OnInit} from '@angular/core';
import {LiveEvent} from "../common/LiveEvent";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.css']
})
export class LivePageComponent implements OnInit {

  events: LiveEvent[];
  futureEvents: LiveEvent[];
  pastEvents: LiveEvent[];

  constructor(dataService: DataServiceService) {

    this.events = this.sortEvents(dataService.getEvents());

    this.futureEvents = this.events.filter(event => {
      return event.date > Date.now();
    });

    this.pastEvents = this.events.filter(event => {
      return event.date < Date.now();
    });
  }

  sortEvents(events: LiveEvent[]): LiveEvent[] {
    return events.sort((d1, d2) => {
      if (d1.date > d2.date) {
        return 1;
      } else if (d1.date < d2.date) {
        return -1
      }
      return 0;
    });
  }


  ngOnInit() {
  }

}
