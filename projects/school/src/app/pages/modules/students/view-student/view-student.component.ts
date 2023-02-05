import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StudentFormComponent } from '../student-form/student-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { StudentsApiService } from 'projects/school/src/app/services/modules-api/students-api/students-api.service';
// import { StudentsPrintService } from 'projects/school/src/app/services/printing/students-print/students-print.service';

import { Student } from 'projects/school/src/app/models/modules/students/students.model';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private studentsApi: StudentsApiService,
    // private studentsPrint: StudentsPrintService,
  ) { }

  @ViewChild('studentFormComponentReference', { read: StudentFormComponent, static: false }) studentForm!: StudentFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Students", url: "/home/students/all-students" },
    { text: "View Student", url: "/home/students/view-student" },
  ];

  studentData: any;

  isStudentLoading = false;
  isStudentSaving = false;
  isStudentDeleting = false;

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(){
    this.isStudentLoading = true;

    this.studentsApi.getStudent()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.studentData = res;
          this.isStudentLoading = false;

          this.studentForm.studentForm.controls.firstName.setValue(this.studentData.first_name);
          this.studentForm.studentForm.controls.lastName.setValue(this.studentData.last_name);
          this.studentForm.studentForm.controls.sex.setValue(this.studentData.sex);
          this.studentForm.studentForm.controls.studentCode.setValue(this.studentData.student_code);
          this.studentForm.studentForm.controls.admissionDate.setValue(this.studentData.admission_date);
          this.studentForm.studentForm.controls.previousSchool.setValue(this.studentData.previous_school);
          this.studentForm.studentForm.controls.nationality.setValue(this.studentData.nationality);
          this.studentForm.studentForm.controls.religion.setValue(this.studentData.religion);
          this.studentForm.studentForm.controls.phone.setValue(this.studentData.phone);
          this.studentForm.studentForm.controls.email.setValue(this.studentData.email);
          this.studentForm.studentForm.controls.address.setValue(this.studentData.address);
          this.studentForm.studentForm.controls.state.setValue(this.studentData.state);
          this.studentForm.studentForm.controls.city.setValue(this.studentData.city);
          this.studentForm.studentForm.controls.postCode.setValue(this.studentData.post_code);

          this.studentForm.selectedTermId = this.studentData.term?.id;
          this.studentForm.studentForm.controls.term.setValue(this.studentData.term?.term_name);
          this.studentForm.selectedClassId = this.studentData.clase?.id;
          this.studentForm.studentForm.controls.clase.setValue(this.studentData.clase?.class_name);

          if (this.studentData.photo != null)
            this.studentForm.photo.imgSrc = environment.apiUrl.slice(0, -1) + this.studentData.photo;
          else
            this.studentForm.photo.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
        },
        error: (err) => {
          console.log(err);
          this.isStudentLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putStudent(){
    console.log('u are saving a new student');

    var data = {
      account: this.customCookie.getCookie('school_id') as string,
      first_name: this.studentForm.studentForm.controls.firstName.value,
      last_name: this.studentForm.studentForm.controls.lastName.value,
      sex: this.studentForm.studentForm.controls.sex.value,
      date_of_birth: this.studentForm.bday.getValue(),
      student_code: this.studentForm.studentForm.controls.studentCode.value,
      term: this.studentForm.selectedTermId,
      admission_date: this.studentForm.studentForm.controls.admissionDate.value,
      previous_school: this.studentForm.studentForm.controls.previousSchool.value,
      nationality: this.studentForm.studentForm.controls.nationality.value,
      religion: this.studentForm.studentForm.controls.religion.value,
      phone: this.studentForm.studentForm.controls.phone.value,
      email: this.studentForm.studentForm.controls.email.value,
      address: this.studentForm.studentForm.controls.address.value,
      state: this.studentForm.studentForm.controls.state.value,
      city: this.studentForm.studentForm.controls.city.value,
      post_code: this.studentForm.studentForm.controls.postCode.value,
    }

    console.log(data);
    this.isStudentSaving = true;

    this.studentsApi.putStudent(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.studentForm.photo.isImageChanged){
            this.putStudentImage();
          }
          else{
            this.isStudentSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isStudentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteStudent(){
    this.isStudentDeleting = true;

    this.studentsApi.deleteStudent()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isStudentDeleting = false;
          this.router.navigateByUrl('/home/students/all-student');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isStudentDeleting = false;
        }
      })
  }

  putStudentImage(){
    this.studentsApi.putStudentPhoto(this.studentForm.photo.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isStudentSaving = false;
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.studentsPrint.printViewStudent();
  }

}
