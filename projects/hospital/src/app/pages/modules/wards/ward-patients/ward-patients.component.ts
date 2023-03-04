import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { AddWardPatientComponent } from '../add-ward-patient/add-ward-patient.component';
import { EditWardPatientComponent } from '../edit-ward-patient/edit-ward-patient.component';

import { WardsApiService } from 'projects/hospital/src/app/services/modules-api/wards-api/wards-api.service';
// import { WardPatient } from 'projects/hospital/src/app/models/modules/wards/wards.model';


@Component({
  selector: 'app-ward-patients',
  templateUrl: './ward-patients.component.html',
  styleUrls: ['./ward-patients.component.scss']
})
export class WardPatientsComponent implements OnInit {

  constructor(
    private router: Router,
    private wardsApi: WardsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addWardPatientComponentReference', { read: AddWardPatientComponent, static: false }) addWardPatient!: AddWardPatientComponent;
  @ViewChild('editWardPatientComponentReference', { read: EditWardPatientComponent, static: false }) editWardPatient!: EditWardPatientComponent;

  patientsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isWardPatientDeleting = false;

  ngOnInit(): void {
    this.getWardWardPatient();
  }

  getWardWardPatient(){
    this.isFetchingGridData = true;

    this.wardsApi.getWardWardPatient()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.patientsGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  createWardPatient(data: any){
    console.log(data);
    this.addWardPatient.isSaving = true;

    this.wardsApi.postWardPatient(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.addWardPatient.isSaving = false;
          this.addWardPatient.dismissButton.nativeElement.click();
          this.addWardPatient.resetForm();
          this.getWardWardPatient();
        },
        error: (err) => {
          console.log(err);
          this.addWardPatient.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateWardPatient(transaction: any){
    console.log(transaction);
    this.editWardPatient.isSaving = true;

    this.wardsApi.putWardPatient(transaction.data, transaction.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editWardPatient.dismissButton.nativeElement.click();
          this.editWardPatient.isSaving = false;
          this.getWardWardPatient();
        },
        error: (err) => {
          console.log(err);
          this.editWardPatient.isSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteWardPatient(){
    console.log(this.deleteId);
    this.isWardPatientDeleting = true;

    this.wardsApi.deleteWardPatient(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
        this.isWardPatientDeleting = false;
        this.getWardWardPatient();
        },
        error: (err) => {
          console.log(err);
          this.isWardPatientDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }
  
  openEditWardPatient(data: any){
    console.log(data);
    this.editWardPatient.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
