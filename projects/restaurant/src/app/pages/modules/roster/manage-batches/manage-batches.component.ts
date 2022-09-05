import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ManagePersonnelComponent } from '../manage-personnel/manage-personnel.component';
import { AddBatchComponent } from '../add-batch/add-batch.component'
import { EditBatchComponent } from '../edit-batch/edit-batch.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-manage-batches',
  templateUrl: './manage-batches.component.html',
  styleUrls: ['./manage-batches.component.scss']
})
export class ManageBatchesComponent implements OnInit {

  constructor(
    private router: Router,
    private rosterApi: RosterApiService
  ) { }

  @ViewChild('managePersonnelComponentReference', { read: ManagePersonnelComponent, static: false }) managePersonnel!: ManagePersonnelComponent;
  @ViewChild('addBatchComponentReference', { read: AddBatchComponent, static: false }) addBatch!: AddBatchComponent;
  @ViewChild('editBatchComponentReference', { read: EditBatchComponent, static: false }) editBatch!: EditBatchComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Roster", url: "/home/roster/all-roster" },
    { text: "View Roster", url: "/home/roster/view-roster" },
    { text: "Manage Batches", url: "/home/roster/manage-batches" },
  ];

  batchesGridData: any[] = [];
  isFetchingGridData: boolean = false;

  deleteId: any;

  rosterForm = new FormGroup({
    rosterCode: new FormControl({value: "", disabled: true}),
    rosterName: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
    this.getRoster();
    this.getRosterBatch();
  }

  getRoster(){
    this.rosterApi.getRoster()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.rosterForm.controls.rosterCode.setValue(res.roster_code);
          this.rosterForm.controls.rosterName.setValue(res.roster_name);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  // --------------------------------------------------------------------------------------
  // grid

  getRosterBatch(){
    this.isFetchingGridData = true;

    this.rosterApi.getRosterBatch()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.batchesGridData = res
          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postBatch(data: any){
    console.log(data);
    this.addBatch.isSaving = true;

    this.rosterApi.postBatch(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getRosterBatch();
            this.addBatch.isSaving = false;
            this.addBatch.dismissButton.nativeElement.click();
            this.addBatch.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addBatch.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putBatch(data: any){
    console.log(data);
    this.editBatch.isSaving = true;

    this.rosterApi.putBatch(data.id, data.batch)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.getRosterBatch();
          this.editBatch.isSaving = false;
          this.editBatch.dismissButton.nativeElement.click();
        },
        error: (err) => {
          console.log(err);
          this.editBatch.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteBatch(){
    this.rosterApi.deleteBatch(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getRosterBatch();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openEditBatch(data: any){
    console.log(data);
    this.editBatch.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
  }

}
