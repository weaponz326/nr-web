import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NurseFormComponent } from '../nurse-form/nurse-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { NursesApiService } from 'projects/hospital/src/app/services/modules-api/nurses-api/nurses-api.service';
// import { NursesPrintService } from 'projects/hospital/src/app/services/printing/nurses-print/nurses-print.service';

import { Nurse } from 'projects/hospital/src/app/models/modules/nurses/nurses.model';


@Component({
  selector: 'app-view-nurse',
  templateUrl: './view-nurse.component.html',
  styleUrls: ['./view-nurse.component.scss']
})
export class ViewNurseComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private nursesApi: NursesApiService,
    // private nursesPrint: NursesPrintService,
  ) { }

  @ViewChild('nurseFormComponentReference', { read: NurseFormComponent, static: false }) nurseForm!: NurseFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Nurses", url: "/home/nurses/all-nurses" },
    { text: "View Nurse", url: "/home/nurses/view-nurse" },
  ];

  nurseData: any;

  isNurseLoading = false;
  isNurseSaving = false;
  isNurseDeleting = false;

  ngOnInit(): void {
    this.getNurse();
  }

  getNurse(){
    this.isNurseLoading = true;

    this.nursesApi.getNurse()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.nurseData = res;
          this.isNurseLoading = false;

          this.nurseForm.nurseForm.controls.firstName.setValue(this.nurseData.first_name);
          this.nurseForm.nurseForm.controls.lastName.setValue(this.nurseData.last_name);
          this.nurseForm.nurseForm.controls.sex.setValue(this.nurseData.sex);
          this.nurseForm.nurseForm.controls.nurseCode.setValue(this.nurseData.nurse_code);
          this.nurseForm.nurseForm.controls.department.setValue(this.nurseData.department);
          this.nurseForm.nurseForm.controls.nationality.setValue(this.nurseData.nationality);
          this.nurseForm.nurseForm.controls.religion.setValue(this.nurseData.religion);
          this.nurseForm.nurseForm.controls.phone.setValue(this.nurseData.phone);
          this.nurseForm.nurseForm.controls.email.setValue(this.nurseData.email);
          this.nurseForm.nurseForm.controls.address.setValue(this.nurseData.address);
          this.nurseForm.nurseForm.controls.state.setValue(this.nurseData.state);
          this.nurseForm.nurseForm.controls.city.setValue(this.nurseData.city);
          this.nurseForm.nurseForm.controls.postCode.setValue(this.nurseData.post_code);

          if (this.nurseData.photo != null)
            this.nurseForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.nurseData.photo;
          else
            this.nurseForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
        },
        error: (err) => {
          console.log(err);
          this.isNurseLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putNurse(){
    console.log('u are saving a new nurse');

    var data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      first_name: this.nurseForm.nurseForm.controls.firstName.value,
      last_name: this.nurseForm.nurseForm.controls.lastName.value,
      sex: this.nurseForm.nurseForm.controls.sex.value,
      date_of_birth: this.nurseForm.bday.getValue(),
      nurse_code: this.nurseForm.nurseForm.controls.nurseCode.value as string,
      department: this.nurseForm.nurseForm.controls.department.value as string,
      nationality: this.nurseForm.nurseForm.controls.nationality.value,
      religion: this.nurseForm.nurseForm.controls.religion.value,
      phone: this.nurseForm.nurseForm.controls.phone.value,
      email: this.nurseForm.nurseForm.controls.email.value,
      address: this.nurseForm.nurseForm.controls.address.value,
      state: this.nurseForm.nurseForm.controls.state.value,
      city: this.nurseForm.nurseForm.controls.city.value,
      post_code: this.nurseForm.nurseForm.controls.postCode.value,
    }

    console.log(data);
    this.isNurseSaving = true;

    this.nursesApi.putNurse(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.nurseForm.photo.isImageChanged){
            this.putNurseImage();
          }
          else{
            this.isNurseSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isNurseSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteNurse(){
    this.isNurseDeleting = true;

    this.nursesApi.deleteNurse()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isNurseDeleting = false;
          this.router.navigateByUrl('/home/nurses/all-nurse');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isNurseDeleting = false;
        }
      })
  }

  putNurseImage(){
    this.nursesApi.putNursePhoto(this.nurseForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isNurseSaving = false;
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  getNurseCodeConfig(){
    this.nursesApi.getNurseCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.entry_mode == "Auto")
            this.nurseForm.nurseForm.controls.nurseCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.nursesPrint.printViewNurse();
  }

}
