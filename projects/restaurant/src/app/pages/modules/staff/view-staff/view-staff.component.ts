import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { StaffFormComponent } from '../staff-form/staff-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { StaffApiService } from 'projects/restaurant/src/app/services/modules-api/staff-api/staff-api.service';
import { StaffPrintService } from 'projects/restaurant/src/app/services/modules-printing/staff-print/staff-print.service';

import { Staff } from 'projects/restaurant/src/app/models/modules/staff/staff.model';
import { environment } from 'projects/personal/src/environments/environment';


@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss']
})
export class ViewStaffComponent implements OnInit {

  constructor(
    private router: Router,
    private staffApi: StaffApiService,
    private staffPrint: StaffPrintService
  ) { }

  @ViewChild('staffFormComponentReference', { read: StaffFormComponent, static: false }) staffForm!: StaffFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Staff", url: "/home/staff/all-staff" },
    { text: "View Staff", url: "/home/staff/view-staff" },
  ];

  storageBasePath = "/restaurant/" + localStorage.getItem('restaurant_id') + "/module_staff/";

  staffFormData: any;

  isStaffLoading = false;
  isStaffSaving = false;
  isStaffDeleting = false;

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff(){
    this.isStaffLoading = true;

    this.staffApi.getStaff()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.staffFormData = res;
          this.isStaffLoading = false;

          this.staffForm.staffForm.controls.firstName.setValue(this.staffFormData.first_name);
          this.staffForm.staffForm.controls.lastName.setValue(this.staffFormData.last_name);
          this.staffForm.staffForm.controls.sex.setValue(this.staffFormData.sex);
          this.staffForm.bday.setValue(this.staffFormData.date_of_birth);
          this.staffForm.staffForm.controls.nationality.setValue(this.staffFormData.nationality);
          this.staffForm.staffForm.controls.religion.setValue(this.staffFormData.religion);
          this.staffForm.staffForm.controls.phone.setValue(this.staffFormData.phone);
          this.staffForm.staffForm.controls.email.setValue(this.staffFormData.email);
          this.staffForm.staffForm.controls.address.setValue(this.staffFormData.address);
          this.staffForm.staffForm.controls.state.setValue(this.staffFormData.state);
          this.staffForm.staffForm.controls.city.setValue(this.staffFormData.city);
          this.staffForm.staffForm.controls.postCode.setValue(this.staffFormData.post_code);
          this.staffForm.staffForm.controls.staffCode.setValue(this.staffFormData.staff_code);
          this.staffForm.staffForm.controls.department.setValue(this.staffFormData.department);
          this.staffForm.staffForm.controls.job.setValue(this.staffFormData.job);
          
          if (this.staffFormData.photo != null)
            this.staffForm.photo.imgSrc = environment.restaurantApi + this.staffFormData.photo;
          else
            this.staffForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
        },
        error: (err) => {
          console.log(err);
          this.isStaffLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateStaff(){
    console.log('u are saving a new staff');

    var data = {
      first_name: this.staffForm.staffForm.controls.firstName.value,
      last_name: this.staffForm.staffForm.controls.lastName.value,
      sex: this.staffForm.staffForm.controls.sex.value,
      date_of_birth: this.staffForm.bday.getValue(),
      nationality: this.staffForm.staffForm.controls.nationality.value,
      religion: this.staffForm.staffForm.controls.religion.value,
      phone: this.staffForm.staffForm.controls.phone.value,
      email: this.staffForm.staffForm.controls.email.value,
      address: this.staffForm.staffForm.controls.address.value,
      state: this.staffForm.staffForm.controls.state.value,
      city: this.staffForm.staffForm.controls.city.value,
      post_code: this.staffForm.staffForm.controls.postCode.value,
      staff_code: this.staffForm.staffForm.controls.staffCode.value,
      department: this.staffForm.staffForm.controls.department.value,
      job: this.staffForm.staffForm.controls.job.value,
    }

    console.log(data);
    this.isStaffSaving = true;

    this.staffApi.putStaff(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.staffForm.photo.isImageChanged){
            this.putMenuItemImage();
          }
          else{
            this.isStaffSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isStaffSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteStaff(){
    this.isStaffDeleting = true;

    this.staffApi.deleteStaff()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isStaffDeleting = false;
          this.router.navigateByUrl('/home/staff/all-staff');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isStaffDeleting = false;
        }
      })
  }

  putMenuItemImage(){
    this.staffApi.putStaffPhoto(this.staffForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isStaffSaving = false;
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    this.staffPrint.printViewStaff();
  }

}
