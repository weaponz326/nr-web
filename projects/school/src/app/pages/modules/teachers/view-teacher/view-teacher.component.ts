import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/school/src/environments/environment';

import { TeachersApiService } from 'projects/school/src/app/services/modules-api/teachers-api/teachers-api.service';
// import { TeachersPrintService } from 'projects/school/src/app/services/printing/teachers-print/teachers-print.service';

import { Teacher } from 'projects/school/src/app/models/modules/teachers/teachers.model';


@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  constructor(
    private router: Router,
    private teachersApi: TeachersApiService,
    // private teachersPrint: TeachersPrintService,
  ) { }

  @ViewChild('teacherFormComponentReference', { read: TeacherFormComponent, static: false }) teacherForm!: TeacherFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Teachers", url: "/home/teachers/all-teachers" },
    { text: "View Teacher", url: "/home/teachers/view-teacher" },
  ];

  teacherData: any;

  isTeacherLoading = false;
  isTeacherSaving = false;
  isTeacherDeleting = false;

  ngOnInit(): void {
    this.getTeacher();
    this.getTeacherCodeConfig();
  }

  getTeacher(){
    this.isTeacherLoading = true;

    this.teachersApi.getTeacher()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.teacherData = res;
          this.isTeacherLoading = false;

          this.teacherForm.teacherForm.controls.teacherCode.setValue(this.teacherData.teacher_code);
          this.teacherForm.teacherForm.controls.firstName.setValue(this.teacherData.first_name);
          this.teacherForm.teacherForm.controls.lastName.setValue(this.teacherData.last_name);
          this.teacherForm.teacherForm.controls.sex.setValue(this.teacherData.sex);
          this.teacherForm.teacherForm.controls.teacherCode.setValue(this.teacherData.teacher_code);
          this.teacherForm.teacherForm.controls.grade.setValue(this.teacherData.grade);
          this.teacherForm.teacherForm.controls.nationality.setValue(this.teacherData.nationality);
          this.teacherForm.teacherForm.controls.religion.setValue(this.teacherData.religion);
          this.teacherForm.teacherForm.controls.phone.setValue(this.teacherData.phone);
          this.teacherForm.teacherForm.controls.email.setValue(this.teacherData.email);
          this.teacherForm.teacherForm.controls.address.setValue(this.teacherData.address);
          this.teacherForm.teacherForm.controls.state.setValue(this.teacherData.state);
          this.teacherForm.teacherForm.controls.city.setValue(this.teacherData.city);
          this.teacherForm.teacherForm.controls.postCode.setValue(this.teacherData.post_code);

          if (this.teacherData.photo != null)
            this.teacherForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.teacherData.photo;
          else
            this.teacherForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';

          this.teacherForm.selectedTermId = this.teacherData.term.id;
          this.teacherForm.teacherForm.controls.term.setValue(this.teacherData.term?.term_name);
          this.teacherForm.selectedDepartmentId = this.teacherData.department.id;
          this.teacherForm.teacherForm.controls.department.setValue(this.teacherData.department?.department_name);
        },
        error: (err) => {
          console.log(err);
          this.isTeacherLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putTeacher(){
    console.log('u are saving a new teacher');

    var data = {
      first_name: this.teacherForm.teacherForm.controls.firstName.value,
      last_name: this.teacherForm.teacherForm.controls.lastName.value,
      sex: this.teacherForm.teacherForm.controls.sex.value,
      date_of_birth: this.teacherForm.bday.getValue(),
      teacher_code: this.teacherForm.teacherForm.controls.teacherCode.value,
      grade: this.teacherForm.teacherForm.controls.grade.value,
      nationality: this.teacherForm.teacherForm.controls.nationality.value,
      religion: this.teacherForm.teacherForm.controls.religion.value,
      phone: this.teacherForm.teacherForm.controls.phone.value,
      email: this.teacherForm.teacherForm.controls.email.value,
      address: this.teacherForm.teacherForm.controls.address.value,
      state: this.teacherForm.teacherForm.controls.state.value,
      city: this.teacherForm.teacherForm.controls.city.value,
      post_code: this.teacherForm.teacherForm.controls.postCode.value,
      department: this.teacherForm.selectedDepartmentId,
    }

    console.log(data);
    this.isTeacherSaving = true;

    this.teachersApi.putTeacher(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.teacherForm.photo.isImageChanged){
            this.putTeacherImage();
          }
          else{
            this.isTeacherSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isTeacherSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteTeacher(){
    this.isTeacherDeleting = true;

    this.teachersApi.deleteTeacher()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/teachers/all-teachers');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  putTeacherImage(){
    this.teachersApi.putTeacherPhoto(this.teacherForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isTeacherSaving = false;
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  getTeacherCodeConfig(){
    this.teachersApi.getTeacherCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.entry_mode == "Auto")
            this.teacherForm.teacherForm.controls.teacherCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.teachersPrint.printViewTeacher();
  }

}
