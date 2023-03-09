import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { SubjectTeachersComponent } from '../subject-teachers/subject-teachers.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { SubjectsApiService } from 'projects/school/src/app/services/modules-api/subjects-api/subjects-api.service';
// import { SubjectsPrintService } from 'projects/school/src/app/services/printing/subjects-print/subjects-print.service';

import { Subject } from 'projects/school/src/app/models/modules/subjects/subjects.model';


@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss']
})
export class ViewSubjectComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private subjectsApi: SubjectsApiService,
    // private subjectsPrint: SubjectsPrintService,
  ) { }

  @ViewChild('subjectFormComponentReference', { read: SubjectFormComponent, static: false }) subjectForm!: SubjectFormComponent;
  @ViewChild('subjectTeachersComponentReference', { read: SubjectTeachersComponent, static: false }) subjectTeachers!: SubjectTeachersComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Subjects", url: "/home/subjects/all-subjects" },
    { text: "View Subject", url: "/home/subjects/view-subject" },
  ];

  subjectData: any;

  isSubjectLoading = false;
  isSubjectSaving = false;
  isSubjectDeleting = false;

  ngOnInit(): void {
    this.getSubject();
    this.getSubjectCodeConfig();
  }

  getSubject(){
    this.isSubjectLoading = true;

    this.subjectsApi.getSubject()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subjectData = res;
          this.isSubjectLoading = false;


          this.subjectForm.subjectForm.controls.term.setValue(this.subjectData.term?.term_name);
          this.subjectForm.subjectForm.controls.subjectCode.setValue(this.subjectData.subject_code);
          this.subjectForm.subjectForm.controls.subjectName.setValue(this.subjectData.subject_name);
          this.subjectForm.subjectForm.controls.department.setValue(this.subjectData.department.department_name);
          this.subjectForm.subjectForm.controls.description.setValue(this.subjectData.description);

          this.subjectForm.selectedTermId = this.subjectData.term?.id;
          this.subjectForm.selectedDepartmentId = this.subjectData.department.id;
        },
        error: (err) => {
          console.log(err);
          this.isSubjectLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putSubject(){
    console.log('u are saving a new subject');

    var data: Subject = {
      account: this.customCookie.getCookie('school_id') as string,
      subject_code: this.subjectForm.subjectForm.controls.subjectCode.value as string,
      subject_name: this.subjectForm.subjectForm.controls.subjectName.value as string,
      description: this.subjectForm.subjectForm.controls.description.value as string,
      department: this.subjectForm.selectedDepartmentId,
      term: this.subjectForm.selectedTermId,
    }

    console.log(data);
    this.isSubjectSaving = true;

    this.subjectsApi.putSubject(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isSubjectSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isSubjectSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteSubject(){
    this.isSubjectDeleting = true;

    this.subjectsApi.deleteSubject()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/subjects/all-subjects');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getSubjectCodeConfig(){
    this.subjectsApi.getSubjectCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.entry_mode == "Auto")
            this.subjectForm.subjectForm.controls.subjectCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
  onPrint(){
    console.log("lets start printing...");
    // this.subjectsPrint.printViewSubject();
  }

}
