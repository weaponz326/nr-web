import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TimetableFormComponent } from '../timetable-form/timetable-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { TimetableApiService } from 'projects/school/src/app/services/modules/timetable-api/timetable-api.service';
// import { Timetable } from 'projects/school/src/app/models/modules/timetable/timetable.model';


@Component({
  selector: 'app-new-timetable',
  templateUrl: './new-timetable.component.html',
  styleUrls: ['./new-timetable.component.scss']
})
export class NewTimetableComponent implements OnInit {

  constructor(
    private router: Router,
    // private timetableApi: TimetableApiService
  ) { }

  @ViewChild('timetableFormComponentReference', { read: TimetableFormComponent, static: false }) timetableForm!: TimetableFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Timetable", url: "/home/timetable/new-timetable" },
  ];

  isTimetableSaving = false;

  ngOnInit(): void {
  }

  createTimetable(){
    // let data: Timetable = {
    //   account: localStorage.getItem('school_id') as string,
    //   timetable_code: this.timetableForm.timetableForm.controls.timetableCode.value,
    //   timetable_name: this.timetableForm.timetableForm.controls.timetableName.value,
    //   term: this.timetableForm.selectedTermId,
    // }

    this.isTimetableSaving = true;

    // this.timetableApi.createTimetable(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       sessionStorage.setItem('school_timetable_id', res.id);
    //       this.createTimetableSheet();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTimetableSaving = true;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createTimetableSheet(){
    let data = {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
    }

    // this.timetableApi.createTimetableSheet(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/timetable/full-timetable');
    //       this.isTimetableSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTimetableSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
