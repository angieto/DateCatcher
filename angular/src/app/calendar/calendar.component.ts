import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  UserId;
  UserDate;
  _currentUser;
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.parent.params.subscribe((params: Params) => {
      console.log(params);
      let observer = this._httpService.getUser(params.id);
      observer.subscribe(data => {
        if(data['errors']) {
          console.log("Can't grab user:", data['errors']);
        } else {
          console.log("Current user:", data);
          this._currentUser = data;
        }
      })
      this.UserId = params.id;
      console.log(this.UserId);
    });
    this.GetUserDate();
  }

  GetUserDate(){
    let obs = this._httpService.getUser(this.UserId);
    obs.subscribe(data=>{
      console.log("Current User data");
      this.UserDate = data['Date'];
      console.log(this.UserDate);
      console.log(this.UserDate[0]['date']);
    })
  }
  // GetUserDate(){
  //   let obs = this._httpService.getUser(this.UserId);
  //   obs.subscribe(data=>{
  //     console.log("Current User data");
  //     this.UserDate = data['Date'];
  //     console.log(this.UserDate);
  //     console.log(this.UserDate[0]['date']);
  //   })
  // }
  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(this.UserDate[0]['date'], 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event'
  //   }
  // ]


  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     this.viewDate = date;
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //   }
  // }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   event.start = newStart;
  //   event.end = newEnd;
  //   this.refresh.next();
  // }
}
