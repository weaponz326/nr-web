import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { AddShiftComponent } from '../add-shift/add-shift.component'
import { EditShiftComponent } from '../edit-shift/edit-shift.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  constructor(
    private rosterApi: RosterApiService
  ) { }

  @ViewChild('addShiftComponentReference', { read: AddShiftComponent, static: false }) addShift!: AddShiftComponent;
  @ViewChild('editShiftComponentReference', { read: EditShiftComponent, static: false }) editShift!: EditShiftComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  shiftsGridData: any[] = [];

  isFetchingGridData = false;

  deleteId: any;

  ngOnInit(): void {
    this.getRosterShift();
  }

  getRosterShift(){
    this.isFetchingGridData = true;

    this.rosterApi.getRosterShift()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.shiftsGridData = res;
          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postShift(data: any){
    console.log(data);
    this.addShift.isSaving = true;

    this.rosterApi.postShift(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getRosterShift();
            this.addShift.isSaving = false;
            this.addShift.dismissButton.nativeElement.click();
            this.addShift.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addShift.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putShift(data: any){
    console.log(data);
    this.editShift.isSaving = true;

    this.rosterApi.putShift(data.id, data.shift)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.getRosterShift();
          this.editShift.isSaving = false;
          this.editShift.dismissButton.nativeElement.click();
        },
        error: (err) => {
          console.log(err);
          this.editShift.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteShift(){
    console.log(this.deleteId);

    this.rosterApi.deleteShift(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getRosterShift();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openEditShift(data: any){
    console.log(data);
    this.editShift.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
