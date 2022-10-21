import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ClassFormComponent } from '../class-form/class-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { ClassesApiService } from 'projects/school/src/app/services/modules-api/classes-api/classes-api.service';
import { Clase } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.scss']
})
export class NewClassComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private classesApi: ClassesApiService
  ) { }

  @ViewChild('classFormComponentReference', { read: ClassFormComponent, static: false }) classForm!: ClassFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Class", url: "/home/classes/new-class" },
  ];

  isClassSaving = false;

  ngOnInit(): void {
  }

  postClass(){
    let data = {
      account: this.customCookie.getCookie('school_id') as string,
      class_name: this.classForm.classForm.controls.className.value as string,
      class_abbreviation: this.classForm.classForm.controls.classAbbreviation.value as string,
      grade: this.classForm.classForm.controls.grade.value as string,
      location: this.classForm.classForm.controls.location.value as string,
      department: this.classForm.selectedDepartmentId,
      class_teacher: this.classForm.selectedTeacherId,
    }

    this.isClassSaving = true;

    this.classesApi.postClass(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          sessionStorage.setItem('school_class_id', res.id);
          this.router.navigateByUrl('/home/classes/view-class');
          this.isClassSaving = true;
        },
        error: (err) => {
          console.log(err);
          this.isClassSaving = true;
          this.connectionToast.openToast();
        }
      })
  }

}
