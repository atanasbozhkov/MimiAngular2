import { Component, OnInit } from '@angular/core';
import { LiveEvent } from '../types';
import { DataServiceService } from '../data-service.service';
import * as moment from 'moment';

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
    const observable = dataService.liveEvents().subscribe((data) => {
      this.events = data.liveEvents;
      this.futureEvents = this.sortEventAsc(this.events.filter(event => {
        let moment1 = moment(event.date);
        return moment1.isAfter(moment());
      }));

      this.pastEvents = this.sortEventsDesc(this.events.filter(event => {
        let moment1 = moment(event.date);
        return moment1.isBefore(moment())
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
