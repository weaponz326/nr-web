import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { DoctorsApiService } from 'projects/hospital/src/app/services/modules-api/doctors-api/doctors-api.service';
// import { DoctorsPrintService } from 'projects/hospital/src/app/services/printing/doctors-print/doctors-print.service';

import { Doctor } from 'projects/hospital/src/app/models/modules/doctors/doctors.model';


@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.scss']
})
export class ViewDoctorComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private doctorsApi: DoctorsApiService,
    // private doctorsPrint: DoctorsPrintService,
  ) { }

  @ViewChild('doctorFormComponentReference', { read: DoctorFormComponent, static: false }) doctorForm!: DoctorFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Doctors", url: "/home/doctors/all-doctors" },
    { text: "View Doctor", url: "/home/doctors/view-doctor" },
  ];

  doctorData: any;

  isDoctorLoading = false;
  isDoctorSaving = false;
  isDoctorDeleting = false;

  ngOnInit(): void {
    this.getDoctor();
  }

  getDoctor(){
    this.isDoctorLoading = true;

    this.doctorsApi.getDoctor()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.doctorData = res;
          this.isDoctorLoading = false;

          this.doctorForm.doctorForm.controls.firstName.setValue(this.doctorData.first_name);
          this.doctorForm.doctorForm.controls.lastName.setValue(this.doctorData.last_name);
          this.doctorForm.doctorForm.controls.sex.setValue(this.doctorData.sex);
          this.doctorForm.doctorForm.controls.doctorCode.setValue(this.doctorData.doctor_code);
          this.doctorForm.doctorForm.controls.department.setValue(this.doctorData.department);
          this.doctorForm.doctorForm.controls.speciality.setValue(this.doctorData.speciality);
          this.doctorForm.doctorForm.controls.nationality.setValue(this.doctorData.nationality);
          this.doctorForm.doctorForm.controls.religion.setValue(this.doctorData.religion);
          this.doctorForm.doctorForm.controls.phone.setValue(this.doctorData.phone);
          this.doctorForm.doctorForm.controls.email.setValue(this.doctorData.email);
          this.doctorForm.doctorForm.controls.address.setValue(this.doctorData.address);
          this.doctorForm.doctorForm.controls.state.setValue(this.doctorData.state);
          this.doctorForm.doctorForm.controls.city.setValue(this.doctorData.city);
          this.doctorForm.doctorForm.controls.postCode.setValue(this.doctorData.post_code);

          if (this.doctorData.photo != null)
            this.doctorForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.doctorData.photo;
          else
            this.doctorForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
        },
        error: (err) => {
          console.log(err);
          this.isDoctorLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putDoctor(){
    console.log('u are saving a new doctor');

    var data = {
      account: this.customCookie.getCookie('hospital_id') as string,
      first_name: this.doctorForm.doctorForm.controls.firstName.value,
      last_name: this.doctorForm.doctorForm.controls.lastName.value,
      sex: this.doctorForm.doctorForm.controls.sex.value,
      date_of_birth: this.doctorForm.bday.getValue(),
      doctor_code: this.doctorForm.doctorForm.controls.doctorCode.value as string,
      department: this.doctorForm.doctorForm.controls.department.value as string,
      speciality: this.doctorForm.doctorForm.controls.speciality.value as string,
      nationality: this.doctorForm.doctorForm.controls.nationality.value,
      religion: this.doctorForm.doctorForm.controls.religion.value,
      phone: this.doctorForm.doctorForm.controls.phone.value,
      email: this.doctorForm.doctorForm.controls.email.value,
      address: this.doctorForm.doctorForm.controls.address.value,
      state: this.doctorForm.doctorForm.controls.state.value,
      city: this.doctorForm.doctorForm.controls.city.value,
      post_code: this.doctorForm.doctorForm.controls.postCode.value,
    }

    console.log(data);
    this.isDoctorSaving = true;

    this.doctorsApi.putDoctor(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.doctorForm.photo.isImageChanged){
            this.putDoctorImage();
          }
          else{
            this.isDoctorSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isDoctorSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteDoctor(){
    this.isDoctorDeleting = true;

    this.doctorsApi.deleteDoctor()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isDoctorDeleting = false;
          this.router.navigateByUrl('/home/doctors/all-doctor');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isDoctorDeleting = false;
        }
      })
  }

  putDoctorImage(){
    this.doctorsApi.putDoctorPhoto(this.doctorForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isDoctorSaving = false;
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.doctorsPrint.printViewDoctor();
  }

}
