import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { SubjectsApiService } from 'projects/school/src/app/services/modules-api/subjects-api/subjects-api.service';

import { Subject } from 'projects/school/src/app/models/modules/subjects/subjects.model';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private subjectsApi: SubjectsApiService
  ) { }

  @ViewChild('subjectFormComponentReference', { read: SubjectFormComponent, static: false }) subjectForm!: SubjectFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Add Subject", url: "/home/subjects/add-subject" },
  ];

  isSubjectSaving = false;

  ngOnInit(): void {
    this.getNewSubjectCodeConfig();
  }

  ngAfterViewInit(): void {
    let activeTerm = JSON.parse(String(localStorage.getItem('schoolActiveTerm')));
    
    this.subjectForm.selectedTermId = activeTerm.term.id
    this.subjectForm.subjectForm.controls.term.setValue(activeTerm.term.term_name);
  }

  postSubject(){
    console.log('u are saving a new subject');

    let data: Subject = {
      account: this.customCookie.getCookie('school_id') as string,
      subject_code: this.subjectForm.subjectForm.controls.subjectCode.value as string,
      subject_name: this.subjectForm.subjectForm.controls.subjectName.value as string,
      description: this.subjectForm.subjectForm.controls.description.value as string,
      department: this.subjectForm.selectedDepartmentId,
      term: this.subjectForm.selectedTermId,
    }

    console.log(data);
    this.isSubjectSaving = true;

    this.subjectsApi.postSubject(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isSubjectSaving = false;

          sessionStorage.setItem('school_subject_id', res.id);
          this.router.navigateByUrl('/home/subjects/view-subject');
        },
        error: (err) => {
          console.log(err);
          this.isSubjectSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewSubjectCodeConfig(){
    this.subjectsApi.getNewSubjectCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subjectForm.subjectForm.controls.subjectCode.disable();

          if(res.code)
            this.subjectForm.subjectForm.controls.subjectCode.setValue(res.code);
          else
            this.subjectForm.subjectForm.controls.subjectCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
