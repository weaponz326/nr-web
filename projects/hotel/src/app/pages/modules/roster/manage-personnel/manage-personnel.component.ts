import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { AddPersonnelComponent } from '../add-personnel/add-personnel.component'
import { EditPersonnelComponent } from '../edit-personnel/edit-personnel.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

// import { RosterApiService } from 'projects/hotel/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-manage-personnel',
  templateUrl: './manage-personnel.component.html',
  styleUrls: ['./manage-personnel.component.scss']
})
export class ManagePersonnelComponent implements OnInit {

  constructor(
    private router: Router,
    // private rosterApi: RosterApiService
  ) { }

  @ViewChild('addPersonnelComponentReference', { read: AddPersonnelComponent, static: false }) addPersonnel!: AddPersonnelComponent;
  @ViewChild('editPersonnelComponentReference', { read: EditPersonnelComponent, static: false }) editPersonnel!: EditPersonnelComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  personnelGridData: any[] = [];
  isFetchingGridData = false;

  deleteId = "";

  ngOnInit(): void {
    this.getRosterPersonnel();
  }

  getRosterPersonnel(){
    this.isFetchingGridData = true;

    // this.rosterApi.getRosterPersonnel()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.personnelGridData = res;
    //       this.isFetchingGridData = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  postPersonnel(data: any){
    console.log(data);
    this.addPersonnel.isSaving = true;

    // this.rosterApi.postPersonnel(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getRosterPersonnel();
    //         this.addPersonnel.isSaving = false;
    //         this.addPersonnel.dismissButton.nativeElement.ckick();
    //         this.addPersonnel.resetForm();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //         this.addPersonnel.isSaving = false;
    //         this.connectionToast.openToast();
    //     }
    //   })
  }

  putPersonnel(data: any){
    console.log(data);
    this.editPersonnel.isSaving = true;

    // this.rosterApi.putPersonnel(data.id, data.personnel)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
          
    //       this.getRosterPersonnel();
    //       this.editPersonnel.isSaving = false;
    //       this.editPersonnel.dismissButton.nativeElement.ckick();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.editPersonnel.isSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deletePersonnel(){
    // this.rosterApi.deletePersonnel(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);        
    //       this.getRosterPersonnel();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  openEditPersonnel(data: any){
    console.log(data);
    this.editPersonnel.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
