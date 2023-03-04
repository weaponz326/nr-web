import { Component, OnInit, ViewChild } from '@angular/core';

import { AddChecklistComponent } from '../add-checklist/add-checklist.component'
import { EditChecklistComponent } from '../edit-checklist/edit-checklist.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { HousekeepingApiService } from 'projects/hotel/src/app/services/modules-api/housekeeping-api/housekeeping-api.service';


@Component({
  selector: 'app-housekeeping-checklist',
  templateUrl: './housekeeping-checklist.component.html',
  styleUrls: ['./housekeeping-checklist.component.scss']
})
export class HousekeepingChecklistComponent implements OnInit {

  constructor(
    private housekeepingApi: HousekeepingApiService
  ) { }

  @ViewChild('addChecklistComponentReference', { read: AddChecklistComponent, static: false }) addChecklist!: AddChecklistComponent;
  @ViewChild('editChecklistComponentReference', { read: EditChecklistComponent, static: false }) editChecklist!: EditChecklistComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  checklistsGridData: any[] = [];

  lastChecklist = 0;

  deleteId = "";
  isChecklistDeleting = false;

  isFetchingGridData = false;

  ngOnInit(): void {
    this.getHousekeepingChecklist();
  }

  getHousekeepingChecklist(){
    this.isFetchingGridData = true;

    this.housekeepingApi.getHousekeepingChecklist()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.checklistsGridData = res;

          try { this.lastChecklist = Number((res[res.length - 1]).checklist_number) }
          catch{ this.lastChecklist = 0 }

          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postChecklist(data: any){
    console.log(data);
    this.addChecklist.isItemSaving = true;

    this.housekeepingApi.postChecklist(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getHousekeepingChecklist();

            this.addChecklist.isItemSaving = false;
            this.addChecklist.dismissButton.nativeElement.click();
            this.addChecklist.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addChecklist.isItemSaving = false;
          this.addChecklist.dismissButton.nativeElement.click();
          this.connectionToast.openToast();
        }
      })
  }

  putChecklist(housekeeping_checklist: any){
    console.log(housekeeping_checklist);
    this.editChecklist.isItemSaving = true;

    this.housekeepingApi.putChecklist(housekeeping_checklist.id, housekeeping_checklist.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.editChecklist.isItemSaving = false;
          this.editChecklist.dismissButton.nativeElement.click();
          this.getHousekeepingChecklist();
        },
        error: (err) => {
          console.log(err);
          this.editChecklist.isItemSaving = false;
          this.editChecklist.dismissButton.nativeElement.click();
          this.connectionToast.openToast();
        }
      })
  }

  deleteChecklist(){
    this.isChecklistDeleting = true;

    this.housekeepingApi.deleteChecklist(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isChecklistDeleting = false;
          this.getHousekeepingChecklist();
        },
        error: (err) => {
          console.log(err);
          this.isChecklistDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditChecklist(data: any){
    console.log(data);
    this.editChecklist.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
