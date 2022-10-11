import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ClassFormComponent } from '../class-form/class-form.component';
import { ClassStudentsComponent } from '../class-students/class-students.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { ClassesApiService } from 'projects/school/src/app/services/modules/classes-api/classes-api.service';
// import { ClassesPrintService } from 'projects/school/src/app/services/printing/classes-print/classes-print.service';

// import { Clase } from 'projects/school/src/app/models/modules/classes/classes.model';


@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.scss']
})
export class ViewClassComponent implements OnInit {

  constructor(
    private router: Router,
    // private classesApi: ClassesApiService,
    // private classesPrint: ClassesPrintService,
  ) { }

  @ViewChild('classFormComponentReference', { read: ClassFormComponent, static: false }) classForm!: ClassFormComponent;
  @ViewChild('classStudentsComponentReference', { read: ClassStudentsComponent, static: false }) classStudents!: ClassStudentsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

  navHeading: any[] = [
    { text: "All Classes", url: "/home/classes/all-classes" },
    { text: "View Class", url: "/home/classes/view-class" },
  ];

  classData: any;

  isClassLoading = false;
  isClassSaving = false;
  isClassDeleting = false;

  ngOnInit(): void {
    this.getClass();
  }

  setStudentClass(){
    // this.classStudents.classCode = this.classForm.classForm.controls.classCode.value;
    // this.classStudents.className = this.classForm.classForm.controls.className.value;
  }

  getClass(){
    this.isClassLoading = true;

    // this.classesApi.getClass()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.classData = res;
    //       this.isClassLoading = false;

    //       this.classForm.classForm.controls.classCode.setValue(this.classData.data().class_code);
    //       this.classForm.classForm.controls.className.setValue(this.classData.data().class_name);
    //       this.classForm.classForm.controls.department.setValue(this.classData.data().department.data.department_name);
    //       this.classForm.classForm.controls.classTeacher.setValue(this.classData.data().class_teacher.data.teacher_name);
    //       this.classForm.classForm.controls.location.setValue(this.classData.data().location);

    //       this.classForm.selectedTeacherId = this.classData.data().class_teacher.id;
    //       this.classForm.selectedTeacherData = this.classData.data().class_teacher.data;
    //       this.classForm.selectedDepartmentId = this.classData.data().department.id;
    //       this.classForm.selectedDepartmentData = this.classData.data().department.data;

    //       this.setStudentClass();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isClassLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateClass(){
    console.log('u are saving a new class');

    var data = {
      class_code: this.classForm.classForm.controls.classCode.value,
      class_name: this.classForm.classForm.controls.className.value,
      location: this.classForm.classForm.controls.location.value,
      department: this.classForm.selectedDepartmentId,
      class_teacher: this.classForm.selectedTeacherId,
    }

    console.log(data);
    this.isClassSaving = true;

    // this.classesApi.updateClass(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.updateTerm();
    //       this.setStudentClass();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isClassSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateTerm(){
    console.log('u are adding new term to term');

    if (this.classData.data().terms.include({id: this.classForm.selectedTermId})){
      console.log('lets go ahead with term update');

      let data = {
        terms: {
          id: this.classForm.selectedTermId,
          data: this.classForm.selectedTermData,
        }
      }

      // this.classesApi.updateClass(data)
      //   .then(
      //     (res: any) => {
      //       console.log(res);
      //       this.isClassSaving = false;
      //     },
      //     (err: any) => {
      //       console.log(err);
      //       this.isClassSaving = false;
      //       this.connectionToast.openToast();
      //     }
      //   )
    }
    else{
      console.log('no need to update term');
      this.isClassSaving = false;
    }
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteClass(){
    this.isClassDeleting = true;

    // this.classesApi.deleteClass()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/classes/all-classes');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.classesPrint.printViewClass();
  }

}
