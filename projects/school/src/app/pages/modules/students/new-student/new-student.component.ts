import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StudentFormComponent } from '../student-form/student-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { StudentsApiService } from 'projects/school/src/app/services/modules-api/students-api/students-api.service';
// import { ClassesApiService } from 'projects/school/src/app/services/modules/classes-api/classes-api.service';

import { Student } from 'projects/school/src/app/models/modules/students/students.model';
// import { ClassStudent } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private studentsApi: StudentsApiService,
    // private classesApi: ClassesApiService
  ) { }

  @ViewChild('studentFormComponentReference', { read: StudentFormComponent, static: false }) studentForm!: StudentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Student", url: "/home/students/new-student" },
  ];

  storageBasePath = "/school/" + this.customCookie.getCookie('restaurant_id') + "/module_students/";

  isStudentSaving = false;

  ngOnInit(): void {
    this.getNewStudentCodeConfig();
  }

  postStudent(){
    console.log('u are saving a new student');

    var data = {
      account: this.customCookie.getCookie('school_id') as string,
      first_name: this.studentForm.studentForm.controls.firstName.value as string,
      last_name: this.studentForm.studentForm.controls.lastName.value as string,
      sex: this.studentForm.studentForm.controls.sex.value as string,
      date_of_birth: this.studentForm.bday.getValue(),
      student_code: this.studentForm.studentForm.controls.studentCode.value as string,
      admission_date: this.studentForm.studentForm.controls.admissionDate.value,
      previous_school: this.studentForm.studentForm.controls.previousSchool.value as string,
      nationality: this.studentForm.studentForm.controls.nationality.value as string,
      religion: this.studentForm.studentForm.controls.religion.value as string,
      phone: this.studentForm.studentForm.controls.phone.value as string,
      email: this.studentForm.studentForm.controls.email.value as string,
      address: this.studentForm.studentForm.controls.address.value as string,
      state: this.studentForm.studentForm.controls.state.value as string,
      city: this.studentForm.studentForm.controls.city.value as string,
      post_code: this.studentForm.studentForm.controls.postCode.value as string,
    }

    console.log(data);
    this.isStudentSaving = true;

    this.studentsApi.postStudent(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('school_student_id', res.id);

          if(this.studentForm.photo.isImageChanged){
            this.putStudentImage();
          }
          else{
            this.router.navigateByUrl('/home/students/view-student');                    
          }
        },
        error: (err) => {
          console.log(err);
          this.isStudentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putStudentImage(){
    this.studentsApi.putStudentPhoto(this.studentForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/students/view-student');                    
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  getNewStudentCodeConfig(){
    this.studentsApi.getNewStudentCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.studentForm.studentForm.controls.studentCode.disable();

          if(res.code)
            this.studentForm.studentForm.controls.studentCode.setValue(res.code);
          else
            this.studentForm.studentForm.controls.studentCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
