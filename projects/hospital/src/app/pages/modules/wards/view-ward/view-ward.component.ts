import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { WardFormComponent } from '../ward-form/ward-form.component';
import { WardPatientsComponent } from '../ward-patients/ward-patients.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { WardsApiService } from 'projects/hospital/src/app/services/modules-api/wards-api/wards-api.service';
// import { WardsPrintService } from 'projects/hospital/src/app/services/modules-printing/wards-print/wards-print.service';

import { Ward } from 'projects/hospital/src/app/models/modules/wards/wards.model';


@Component({
  selector: 'app-view-ward',
  templateUrl: './view-ward.component.html',
  styleUrls: ['./view-ward.component.scss']
})
export class ViewWardComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private wardsApi: WardsApiService,
    // private wardsPrint: WardsPrintService,
  ) { }

  @ViewChild('wardFormComponentReference', { read: WardFormComponent, static: false }) wardForm!: WardFormComponent;
  @ViewChild('wardPatientsComponentReference', { read: WardPatientsComponent, static: false }) wardPatients!: WardPatientsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Wards", url: "/home/wards/all-wards" },
    { text: "View Ward", url: "/home/wards/view-ward" },
  ];

  wardData: any;

  isWardLoading = false;
  isWardSaving = false;
  isWardDeleting = false;

  ngOnInit(): void {
    this.getWard();
  }

  getWard(){
    this.isWardLoading = true;

    this.wardsApi.getWard()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.wardData = res;
          this.isWardLoading = false;

          this.wardForm.wardForm.controls.wardNumber.setValue(this.wardData.ward_code);
          this.wardForm.wardForm.controls.wardName.setValue(this.wardData.ward_name);
          this.wardForm.wardForm.controls.wardType.setValue(this.wardData.ward_type);
          this.wardForm.wardForm.controls.location.setValue(this.wardData.location);
          this.wardForm.wardForm.controls.capacity.setValue(this.wardData.capacity);
        },
        error: (err) => {
          console.log(err);
          this.isWardLoading = false;
          this.connectionToast.openToast();
        }
      }) 
  }

  putWard(){
    let data: Ward = {
      account: this.customCookie.getCookie('hospital_id') as string,
      ward_number: this.wardForm.wardForm.controls.wardNumber.value as string,
      ward_name: this.wardForm.wardForm.controls.wardName.value as string,
      ward_type: this.wardForm.wardForm.controls.wardType.value as string,
      location: this.wardForm.wardForm.controls.location.value as string,
      capacity: this.wardForm.wardForm.controls.capacity.value as number,
    }

    console.log(data);
    this.isWardSaving = true;

    this.wardsApi.putWard(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isWardSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isWardSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteWard(){
    this.isWardDeleting = true;

    this.wardsApi.deleteWard()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/wards/all-wards');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      }) 
  }

  onPrint(){
    console.log("lets start printing...");
    // this.wardsPrint.printViewWard();
  }

}
