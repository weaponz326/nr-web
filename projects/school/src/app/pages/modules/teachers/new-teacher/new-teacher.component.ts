import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
// import { TeachersApiService } from 'projects/school/src/app/services/modules/teachers-api/teachers-api.service';

// import { Teacher } from 'projects/school/src/app/models/modules/teachers/teachers.model';


@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.scss']
})
export class NewTeacherComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private teachersApi: TeachersApiService
  ) { }

  @ViewChild('teacherFormComponentReference', { read: TeacherFormComponent, static: false }) teacherForm!: TeacherFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Teacher", url: "/home/teachers/new-teacher" },
  ];

  storageBasePath = "/school/" + this.customCookie.getCookie('restaurant_id') + "/module_teachers/";

  isTeacherSaving = false;

  ngOnInit(): void {
  }

  createTeacher(){
    console.log('u are saving a new teacher');

    // var data: Teacher = {
    //   account: this.customCookie.getCookie('restaurant_id') as string,
    //   first_name: this.teacherForm.teacherForm.controls.firstName.value,
    //   last_name: this.teacherForm.teacherForm.controls.lastName.value,
    //   sex: this.teacherForm.teacherForm.controls.sex.value,
    //   // date_of_birth: this.teacherForm.bday.value,
    //   teacher_code: this.teacherForm.teacherForm.controls.teacherCode.value,
    //   grade: this.teacherForm.teacherForm.controls.grade.value,
    //   photo: "",
    //   nationality: this.teacherForm.teacherForm.controls.nationality.value,
    //   religion: this.teacherForm.teacherForm.controls.religion.value,
    //   phone: this.teacherForm.teacherForm.controls.phone.value,
    //   email: this.teacherForm.teacherForm.controls.email.value,
    //   address: this.teacherForm.teacherForm.controls.address.value,
    //   state: this.teacherForm.teacherForm.controls.state.value,
    //   city: this.teacherForm.teacherForm.controls.city.value,
    //   post_code: this.teacherForm.teacherForm.controls.postCode.value,
    //   department: this.teacherForm.selectedDepartmentId,
    //   terms: [this.teacherForm.selectedTermId],
    // }

    // console.log(data);
    this.isTeacherSaving = true;

    // this.teachersApi.createTeacher(data)
    //   .then(
    //     async (res: any) => {
    //       console.log(res);
    //       sessionStorage.setItem('school_teacher_id', res.id);

    //       this.updateImage();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTeacherSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
