import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
import { ClassFormComponent } from '../class-form/class-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { ClassesApiService } from 'projects/school/src/app/services/modules/classes-api/classes-api.service';
// import { Clase } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.scss']
})
export class NewClassComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private classesApi: ClassesApiService
  ) { }

  @ViewChild('classFormComponentReference', { read: ClassFormComponent, static: false }) classForm!: ClassFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Class", url: "/home/classes/new-class" },
  ];

  isClassSaving = false;

  ngOnInit(): void {
  }

  createClass(){
    // let data: Clase = {
    //   account: this.customCookie.getCookie('restaurant_id') as string,
    //   class_code: this.classForm.classForm.controls.classCode.value,
    //   class_name: this.classForm.classForm.controls.className.value,
    //   location: this.classForm.classForm.controls.location.value,
    //   terms: [this.classForm.selectedTermId],
    //   department: this.classForm.selectedDepartmentId,
    //   class_teacher: this.classForm.selectedTeacherId,
    // }

    this.isClassSaving = true;

    // this.classesApi.createClass(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       sessionStorage.setItem('school_class_id', res.id);
    //       this.router.navigateByUrl('/home/classes/view-class');
    //       this.isClassSaving = true;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isClassSaving = true;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
