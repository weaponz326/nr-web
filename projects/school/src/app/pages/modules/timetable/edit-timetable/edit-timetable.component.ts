import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { TimetableApiService } from 'projects/school/src/app/services/modules/timetable-api/timetable-api.service';


@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.scss']
})
export class EditTimetableComponent implements OnInit {

  constructor(
    // private timetableApi: TimetableApiService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  Object = Object;

  sheetData: any = {};

  ngOnInit(): void {
    this.getTimetableSheet();
  }

  getTimetableSheet(){
    // this.timetableApi.getTimetableSheet()
    //   .then(
    //     (res: any) => {
    //       console.log(res.data());
    //       this.sheetData = res.data();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
