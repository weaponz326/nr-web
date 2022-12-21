import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TimetableFormComponent } from '../timetable-form/timetable-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { TimetableApiService } from 'projects/school/src/app/services/modules-api/timetable-api/timetable-api.service';

import { Timetable } from 'projects/school/src/app/models/modules/timetable/timetable.model';


@Component({
  selector: 'app-new-timetable',
  templateUrl: './new-timetable.component.html',
  styleUrls: ['./new-timetable.component.scss']
})
export class NewTimetableComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private timetableApi: TimetableApiService
  ) { }

  @ViewChild('timetableFormComponentReference', { read: TimetableFormComponent, static: false }) timetableForm!: TimetableFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Timetable", url: "/home/timetable/new-timetable" },
  ];

  isTimetableSaving = false;

  ngOnInit(): void {
    this.getNewTimetableCodeConfig();
  }

  ngAfterViewInit(): void {
    let activeTerm = JSON.parse(String(localStorage.getItem('schoolActiveTerm')));
    
    this.timetableForm.selectedTermId = activeTerm.term.id
    this.timetableForm.timetableForm.controls.term.setValue(activeTerm.term.term_name);
  }

  postTimetable(){
    let data: Timetable = {
      account: this.customCookie.getCookie('school_id') as string,
      timetable_code: this.timetableForm.timetableForm.controls.timetableCode.value as string,
      timetable_name: this.timetableForm.timetableForm.controls.timetableName.value as string,
      term: this.timetableForm.selectedTermId,
    }

    this.isTimetableSaving = true;

    this.timetableApi.postTimetable(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('school_timetable_id', res.id);
          this.router.navigateByUrl('/home/timetable/full-timetable');
        },
        error: (err) => {
          console.log(err);
          this.isTimetableSaving = true;
          this.connectionToast.openToast();
        }
      })
  }

  getNewTimetableCodeConfig(){
    this.timetableApi.getNewTimetableCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.timetableForm.timetableForm.controls.timetableCode.disable();

          if(res.code)
            this.timetableForm.timetableForm.controls.timetableCode.setValue(res.code);
          else
            this.timetableForm.timetableForm.controls.timetableCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
