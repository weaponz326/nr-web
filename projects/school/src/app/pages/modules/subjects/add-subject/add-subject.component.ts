import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { SubjectsApiService } from 'projects/school/src/app/services/modules/subjects-api/subjects-api.service';
// import { Subject } from 'projects/school/src/app/models/modules/subjects/subjects.model';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  constructor(
    private router: Router,
    // private subjectsApi: SubjectsApiService
  ) { }

  @ViewChild('subjectFormComponentReference', { read: SubjectFormComponent, static: false }) subjectForm!: SubjectFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Add Subject", url: "/home/subjects/add-subject" },
  ];

  isSubjectSaving = false;

  ngOnInit(): void {
  }

  createSubject(){
    console.log('u are saving a new subject');

    // let data: Subject = {
    //   account: localStorage.getItem('school_id') as string,
    //   subject_code: this.subjectForm.subjectForm.controls.subjectCode.value,
    //   subject_name: this.subjectForm.subjectForm.controls.subjectName.value,
    //   description: this.subjectForm.subjectForm.controls.description.value,
    //   department: this.subjectForm.selectedDepartmentId,
    //   terms: [{id: this.subjectForm.selectedTermId}],
    // }

    // console.log(data);
    this.isSubjectSaving = true;

    // this.subjectsApi.createSubject(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isSubjectSaving = false;

    //       sessionStorage.setItem('school_subject_id', res.id);
    //       this.router.navigateByUrl('/home/subjects/view-subject');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isSubjectSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
