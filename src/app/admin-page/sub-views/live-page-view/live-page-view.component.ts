import {Component, OnInit, TemplateRef} from '@angular/core';
import {DataServiceService, IEventsResponse} from '../../../data-service.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import * as moment from 'moment';
import {LiveEvent} from '../../../types';
@Component({
  selector: 'app-live-page-view',
  templateUrl: './live-page-view.component.html',
  styleUrls: ['./live-page-view.component.css']
})
export class LivePageViewComponent implements OnInit {
  public events: Array<LiveEvent> = [];
  modalRef: BsModalRef;
  date: any;
  timePickerEnabled = true;

  // Form data;
  selectedDate: moment.Moment;
  name: string;
  location: string;
  fb: string;
  gmaps: string;

  constructor(public readonly dataService: DataServiceService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.dataService.liveEvents().subscribe((snapshot: IEventsResponse) => {
      this.events = snapshot.liveEvents.reverse();
    });
  }

  public deleteEvent(eventId: string): void {
    console.log(`Detelting event: ${eventId}`);
    this.dataService.removeEvent(eventId);
  }

  public timeChanged(date) {
    if (date.value !== null && date.value !== undefined) {
      this.timePickerEnabled = false;
      this.selectedDate = moment(date.value);
    }
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  public saveEvent() {
    console.log(`Saving event ${this.name}, ${this.location}, ${this.fb}, ${this.gmaps}, ${this.selectedDate}`);

    const partialEvent = {
      date: this.selectedDate.toDate(),
      eventName: this.name,
      eventLocation: this.location,
      facebookLink: this.fb,
      googleMapsLink: this.gmaps
    };

    this.dataService.addNewEvent(
      partialEvent)
      .then( hasSaved => {
        if (hasSaved) {
          console.log('Event saved successfully');
          this.modalRef.hide();
        }
      });

  }

  public changeDate() {
    this.date = undefined;
    this.selectedDate = undefined;
    this.timePickerEnabled = true;
  }

}
