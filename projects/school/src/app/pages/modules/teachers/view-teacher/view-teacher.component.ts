import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { TeachersApiService } from 'projects/school/src/app/services/modules/teachers-api/teachers-api.service';
// import { TeachersPrintService } from 'projects/school/src/app/services/printing/teachers-print/teachers-print.service';

// import { Teacher } from 'projects/school/src/app/models/modules/teachers/teachers.model';


@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  constructor(
    private router: Router,
    // private teachersApi: TeachersApiService,
    // private teachersPrint: TeachersPrintService,
  ) { }

  @ViewChild('teacherFormComponentReference', { read: TeacherFormComponent, static: false }) teacherForm!: TeacherFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

  navHeading: any[] = [
    { text: "All Teachers", url: "/home/teachers/all-teachers" },
    { text: "View Teacher", url: "/home/teachers/view-teacher" },
  ];

  storageBasePath = "/school/" + localStorage.getItem('school_id') + "/module_teachers/";

  teacherData: any;

  isTeacherLoading = false;
  isTeacherSaving = false;
  isTeacherDeleting = false;

  ngOnInit(): void {
    this.getTeacher();
  }

  getTeacher(){
    this.isTeacherLoading = true;

    // this.teachersApi.getTeacher()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.teacherData = res;
    //       this.isTeacherLoading = false;

    //       this.teacherForm.teacherForm.controls.teacherCode.setValue(this.teacherData.data().teacher_code);
    //       this.teacherForm.teacherForm.controls.firstName.setValue(this.teacherData.data().first_name);
    //       this.teacherForm.teacherForm.controls.lastName.setValue(this.teacherData.data().last_name);
    //       this.teacherForm.teacherForm.controls.sex.setValue(this.teacherData.data().sex);
    //       this.teacherForm.teacherForm.controls.teacherCode.setValue(this.teacherData.data().teacher_code);
    //       this.teacherForm.teacherForm.controls.grade.setValue(this.teacherData.data().grade);
    //       this.teacherForm.teacherForm.controls.nationality.setValue(this.teacherData.data().nationality);
    //       this.teacherForm.teacherForm.controls.religion.setValue(this.teacherData.data().religion);
    //       this.teacherForm.teacherForm.controls.phone.setValue(this.teacherData.data().phone);
    //       this.teacherForm.teacherForm.controls.email.setValue(this.teacherData.data().email);
    //       this.teacherForm.teacherForm.controls.address.setValue(this.teacherData.data().address);
    //       this.teacherForm.teacherForm.controls.state.setValue(this.teacherData.data().state);
    //       this.teacherForm.teacherForm.controls.city.setValue(this.teacherData.data().city);
    //       this.teacherForm.teacherForm.controls.postCode.setValue(this.teacherData.data().post_code);

    //       if (this.teacherData.data().photo != ""){
    //         this.teacherForm.photo.imgSrc = this.teacherData.data().photo;
    //         this.teacherForm.photo.isImageSet = true;
    //       }

    //       this.teacherForm.selectedTermId = this.teacherData.data().term.id;
    //       this.teacherForm.selectedTermData = this.teacherData.data().term.data;
    //       this.teacherForm.teacherForm.controls.term.setValue(this.teacherData.data().term?.data.term_name);
    //       this.teacherForm.selectedDepartmentId = this.teacherData.data().department.id;
    //       this.teacherForm.selectedDepartmentData = this.teacherData.data().department.data;
    //       this.teacherForm.teacherForm.controls.department.setValue(this.teacherData.data().department?.data.department_name);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTeacherLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateTeacher(){
    console.log('u are saving a new teacher');

    var data = {
      first_name: this.teacherForm.teacherForm.controls.firstName.value,
      last_name: this.teacherForm.teacherForm.controls.lastName.value,
      sex: this.teacherForm.teacherForm.controls.sex.value,
      // date_of_birth: this.teacherForm.bday.value,
      teacher_code: this.teacherForm.teacherForm.controls.teacherCode.value,
      grade: this.teacherForm.teacherForm.controls.grade.value,
      photo: "",
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

    // this.teachersApi.updateTeacher(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.updateTerm();
    //       this.updateImage();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTeacherSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteTeacher(){
    this.isTeacherDeleting = true;

    // this.teachersApi.deleteTeacher()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/teachers/all-teachers');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateTerm(){
    console.log('u are adding new term to term');

    // if (this.teacherData.data().terms.include({id: this.teacherForm.selectedTermId})){
    //   console.log('lets go ahead with term update');

    //   let data = {
    //     terms: {
    //       id: this.teacherForm.selectedTermId,
    //       data: arrayUnion(this.teacherForm.selectedTermData),
    //     }
    //   }

    //   this.teachersApi.updateTeacher(data)
    //     .then(
    //       (res: any) => {
    //         console.log(res);
    //         this.isTeacherSaving = false;
    //       },
    //       (err: any) => {
    //         console.log(err);
    //         this.isTeacherSaving = false;
    //         this.connectionToast.openToast();
    //       }
    //     )
    // }
    // else{
    //   console.log('no need to update term');
    //   this.isTeacherSaving = false;
    // }
  }

  onPrint(){
    console.log("lets start printing...");
    // this.teachersPrint.printViewTeacher();
  }

}
