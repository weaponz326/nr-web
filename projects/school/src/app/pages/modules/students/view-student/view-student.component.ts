import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StudentFormComponent } from '../student-form/student-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { DeleteModalComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal/delete-modal.component'

// import { StudentsApiService } from 'projects/school/src/app/services/modules/students-api/students-api.service';
// import { StudentsPrintService } from 'projects/school/src/app/services/printing/students-print/students-print.service';

// import { Student } from 'projects/school/src/app/models/modules/students/students.model';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  constructor(
    private router: Router,
    // private studentsApi: StudentsApiService,
    // private studentsPrint: StudentsPrintService,
  ) { }

  @ViewChild('studentFormComponentReference', { read: StudentFormComponent, static: false }) studentForm!: StudentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('deleteModalComponentReference', { read: DeleteModalComponent, static: false }) deleteModal!: DeleteModalComponent;

  navHeading: any[] = [
    { text: "All Students", url: "/home/students/all-students" },
    { text: "View Student", url: "/home/students/view-student" },
  ];

  storageBasePath = "/school/" + localStorage.getItem('school_id') + "/module_students/";

  studentData: any;

  isStudentLoading = false;
  isStudentSaving = false;
  isStudentDeleting = false;

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(){
    this.isStudentLoading = true;

    // this.studentsApi.getStudent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.studentData = res;
    //       this.isStudentLoading = false;

    //       this.studentForm.studentForm.controls.studentCode.setValue(this.studentData.data().student_code);
    //       this.studentForm.studentForm.controls.firstName.setValue(this.studentData.data().first_name);
    //       this.studentForm.studentForm.controls.lastName.setValue(this.studentData.data().last_name);
    //       this.studentForm.studentForm.controls.sex.setValue(this.studentData.data().sex);
    //       this.studentForm.studentForm.controls.studentCode.setValue(this.studentData.data().student_code);
    //       this.studentForm.studentForm.controls.admissionDate.setValue(this.studentData.data().admission_date);
    //       this.studentForm.studentForm.controls.previousSchool.setValue(this.studentData.data().previous_school);
    //       this.studentForm.studentForm.controls.nationality.setValue(this.studentData.data().nationality);
    //       this.studentForm.studentForm.controls.religion.setValue(this.studentData.data().religion);
    //       this.studentForm.studentForm.controls.phone.setValue(this.studentData.data().phone);
    //       this.studentForm.studentForm.controls.email.setValue(this.studentData.data().email);
    //       this.studentForm.studentForm.controls.address.setValue(this.studentData.data().address);
    //       this.studentForm.studentForm.controls.state.setValue(this.studentData.data().state);
    //       this.studentForm.studentForm.controls.city.setValue(this.studentData.data().city);
    //       this.studentForm.studentForm.controls.postCode.setValue(this.studentData.data().post_code);

    //       if (this.studentData.data().photo != ""){
    //         this.studentForm.photo.imgSrc = this.studentData.data().photo;
    //         this.studentForm.photo.isImageSet = true;
    //       }

    //       this.studentForm.selectedTermId = this.studentData.data().term.id;
    //       this.studentForm.selectedTermData = this.studentData.data().term.data;
    //       this.studentForm.studentForm.controls.term.setValue(this.studentData.data().term.term_name);
    //       this.studentForm.selectedClassId = this.studentData.data().clase.id;
    //       this.studentForm.selectedClassData = this.studentData.data().clase.data;
    //       this.studentForm.studentForm.controls.clase.setValue(this.studentData.data().clase.class_name);
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isStudentLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateStudent(){
    console.log('u are saving a new student');

    // var data = {
    //   first_name: this.studentForm.studentForm.controls.firstName.value,
    //   last_name: this.studentForm.studentForm.controls.lastName.value,
    //   sex: this.studentForm.studentForm.controls.sex.value,
    //   date_of_birth: this.studentForm.bday.value,
    //   student_code: this.studentForm.studentForm.controls.studentCode.value,
    //   admission_date: this.studentForm.studentForm.controls.admissionDate.value,
    //   previous_school: this.studentForm.studentForm.controls.previousSchool.value,
    //   photo: "",
    //   nationality: this.studentForm.studentForm.controls.nationality.value,
    //   religion: this.studentForm.studentForm.controls.religion.value,
    //   phone: this.studentForm.studentForm.controls.phone.value,
    //   email: this.studentForm.studentForm.controls.email.value,
    //   address: this.studentForm.studentForm.controls.address.value,
    //   state: this.studentForm.studentForm.controls.state.value,
    //   city: this.studentForm.studentForm.controls.city.value,
    //   post_code: this.studentForm.studentForm.controls.postCode.value,
    //   term: this.studentForm.selectedTermId,
    //   clase: this.studentForm.selectedClassId
    // }

    // console.log(data);
    this.isStudentSaving = true;

    // this.studentsApi.updateStudent(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       this.updateTerm();
    //       this.updateImage();
    //       this.updateClass();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isStudentSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  updateTerm(){
    console.log('u are adding new term to term');

    // if (this.studentData.data().terms.include({id: this.studentForm.selectedTermId})){
    //   console.log('lets go ahead with term update');

    //   let data = {
    //     terms: {
    //       id: this.studentForm.selectedTermId,
    //       data: arrayUnion(this.studentForm.selectedTermData),
    //     }
    //   }

    //   this.studentsApi.updateStudent(data)
    //     .then(
    //       (res: any) => {
    //         console.log(res);
    //         this.isStudentSaving = false;
    //       },
    //       (err: any) => {
    //         console.log(err);
    //         this.isStudentSaving = false;
    //         this.connectionToast.openToast();
    //       }
    //     )
    // }
    // else{
    //   console.log('no need to update term');
    //   this.isStudentSaving = false;
    // }
  }

  updateClass(){
    if(this.studentForm.selectedClassId != this.studentData.data().clase.id){
      // TODO: delete previous student class and crete new student class
    }
  }

  confirmDelete(){
    // this.deleteModal.openModal();
  }

  deleteStudent(){
    this.isStudentDeleting = true;

    // this.studentsApi.deleteStudent()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/students/all-students');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  onPrint(){
    console.log("lets start printing...");
    // this.studentsPrint.printViewStudent();
  }


}
