import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TimetableFormComponent } from '../timetable-form/timetable-form.component'
import { EditTimetableComponent } from '../edit-timetable/edit-timetable.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { TimetableApiService } from 'projects/school/src/app/services/modules/timetable-api/timetable-api.service';
// import { TimetablePrintService } from 'projects/school/src/app/services/printing/timetable-print/timetable-print.service';

// import { Timetable } from 'projects/school/src/app/models/modules/timetable/timetable.model';


@Component({
  selector: 'app-full-timetable',
  templateUrl: './full-timetable.component.html',
  styleUrls: ['./full-timetable.component.scss']
})
export class FullTimetableComponent implements OnInit {

  constructor(
    private router: Router,
    // private timetableApi: TimetableApiService,
    // private timetablePrint: TimetablePrintService
  ) { }

  @ViewChild('timetableFormComponentReference', { read: TimetableFormComponent, static: false }) timetableForm!: TimetableFormComponent;
  @ViewChild('editTimetableComponentReference', { read: EditTimetableComponent, static: false }) editTimetable!: EditTimetableComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

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

    // this.timetableApi.getTimetable()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.timetableData = res;
    //       this.isTimetableLoading = false;

    //       this.timetableForm.timetableForm.controls.timetableCode.setValue(this.timetableData.data().timetable_code);
    //       this.timetableForm.timetableForm.controls.timetableName.setValue(this.timetableData.data().timetable_name);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTimetableLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateTimetable(){
    let data = {
      timetable_code: this.timetableForm.timetableForm.controls.timetableCode.value,
      timetable_name: this.timetableForm.timetableForm.controls.timetableName.value,
      term: this.timetableForm.selectedTermId,
    }

    console.log(data);
    this.isTimetableSaving = true;

    // this.timetableApi.updateTimetable(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isTimetableSaving = false;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTimetableSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteTimetable(){
    this.isTimetableDeleting = true;

    // this.timetableApi.deleteTimetable()
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.router.navigateByUrl('/home/timetable/all-timetable');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.timetablePrint.printViewTimetable();
  }

}
