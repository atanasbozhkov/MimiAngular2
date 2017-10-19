import { Component, OnInit } from '@angular/core';
import { LiveEvent } from '../../../types';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: [ './live-page.component.css' ]
})
export class LivePageComponent implements OnInit {

  events: LiveEvent[];
  futureEvents: LiveEvent[];
  pastEvents: LiveEvent[];

  constructor(dataService: DataServiceService) {
    const observable = dataService.getEvents().subscribe((data) => {
      this.events = data.liveEvents;
      console.log(this.events[0].date);
      this.futureEvents = this.sortEventAsc(this.events.filter(event => {
        return event.date.getTime() > Date.now();
      }));

      this.pastEvents = this.sortEventsDesc(this.events.filter(event => {
        return event.date.getTime() < Date.now();
      }));

    });

  }


  sortEventAsc(events: LiveEvent[]): LiveEvent[] {
    return events.sort((d1, d2) => {
      return d1.date.getTime() - d2.date.getTime();
    });
  }

  sortEventsDesc(events: LiveEvent[]): LiveEvent[] {
    return events.sort((d1, d2) => {
      return d2.date.getTime() - d1.date.getTime();
    });
  }

  ngOnInit() {
  }

}
