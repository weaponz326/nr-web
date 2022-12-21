import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TimetableFormComponent } from '../timetable-form/timetable-form.component'
import { TimetableSheetComponent } from '../timetable-sheet/timetable-sheet.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { TimetableApiService } from 'projects/school/src/app/services/modules-api/timetable-api/timetable-api.service';
// import { TimetablePrintService } from 'projects/school/src/app/services/printing/timetable-print/timetable-print.service';

import { Timetable } from 'projects/school/src/app/models/modules/timetable/timetable.model';


@Component({
  selector: 'app-full-timetable',
  templateUrl: './full-timetable.component.html',
  styleUrls: ['./full-timetable.component.scss']
})
export class FullTimetableComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private timetableApi: TimetableApiService,
    // private timetablePrint: TimetablePrintService
  ) { }

  @ViewChild('timetableFormComponentReference', { read: TimetableFormComponent, static: false }) timetableForm!: TimetableFormComponent;
  @ViewChild('timetableSheetComponentReference', { read: TimetableSheetComponent, static: false }) timetableSheet!: TimetableSheetComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Timetable", url: "/home/timetable/all-timetable" },
    { text: "Full Timetable", url: "/home/timetable/full-timetable" },
  ];

  timetableData: any;

  isTimetableLoading = false;
  isTimetableSaving = false;
  isTimetableDeleting = false;

  ngOnInit(): void {
    this.getTimetable();
  }

  getTimetable(){
    this.isTimetableLoading = true;

    this.timetableApi.getTimetable()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.timetableData = res;
          this.isTimetableLoading = false;

          this.timetableForm.timetableForm.controls.timetableCode.setValue(this.timetableData.timetable_code);
          this.timetableForm.timetableForm.controls.timetableName.setValue(this.timetableData.timetable_name);
        },
        error: (err) => {
          console.log(err);
          this.isTimetableLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putTimetable(){
    let data: Timetable = {
      account: this.customCookie.getCookie('school_id') as string,
      timetable_code: this.timetableForm.timetableForm.controls.timetableCode.value as string,
      timetable_name: this.timetableForm.timetableForm.controls.timetableName.value as string,
      term: this.timetableForm.selectedTermId,
    }

    console.log(data);
    this.isTimetableSaving = true;

    this.timetableApi.putTimetable(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isTimetableSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isTimetableSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteTimetable(){
    this.isTimetableDeleting = true;

    this.timetableApi.deleteTimetable()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/timetable/all-timetable');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.timetablePrint.printViewTimetable();
  }

}
