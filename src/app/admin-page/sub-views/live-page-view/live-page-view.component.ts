import {Component, OnInit, TemplateRef} from '@angular/core';
import {DataServiceService, IEventsResponse} from "../../../data-service.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import * as moment from 'moment';
import {LiveEvent} from "../../../types";
@Component({
  selector: 'app-live-page-view',
  templateUrl: './live-page-view.component.html',
  styleUrls: ['./live-page-view.component.css']
})
export class LivePageViewComponent implements OnInit {
  public eventNames: Array<string> = [];
  modalRef: BsModalRef;
  date: any;
  timePickerEnabled: boolean = true;

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
      this.eventNames = snapshot.liveEvents.map(event => event.eventName).reverse();
    })
  }

  public deleteEvent(eventName: string): void {
    console.log(`Attempting to delete ${eventName}`);
  }

  public timeChanged(date) {
    console.log(date.value);
    if (date.value !== null && date.value !== undefined) {
      this.timePickerEnabled = false;
      this.selectedDate = moment(date.value);
    }
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  public saveEvent() {
    console.log(`Saving event ${this.name}`);
    console.log(`Saving event ${this.location}`);
    console.log(`Saving event ${this.fb}`);
    console.log(`Saving event ${this.gmaps}`);
    console.log(`Saving event ${this.selectedDate}`);
    this.dataService.addNewEvent(new LiveEvent(this.selectedDate.toDate(), this.name, this.location, this.fb, this.gmaps));

  }

  public changeDate() {
    this.date = undefined;
    this.selectedDate = undefined;
    this.timePickerEnabled = true;
  }

}
