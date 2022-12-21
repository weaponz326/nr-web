import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TermFormComponent } from '../term-form/term-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { TermsApiService } from 'projects/school/src/app/services/modules-api/terms-api/terms-api.service';

import { Term } from 'projects/school/src/app/models/modules/terms/terms.model';


@Component({
  selector: 'app-new-term',
  templateUrl: './new-term.component.html',
  styleUrls: ['./new-term.component.scss']
})
export class NewTermComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private termsApi: TermsApiService
  ) { }

  @ViewChild('termFormComponentReference', { read: TermFormComponent, static: false }) termForm!: TermFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Term", url: "/home/terms/new-term" },
  ];

  isTermSaving = false;

  ngOnInit(): void {
    this.getNewTermCodeConfig();
  }

  postTerm(){
    console.log('u are saving a new term');

    var data: Term = {
      account: this.customCookie.getCookie('school_id') as string,
      term_code: this.termForm.termForm.controls.termCode.value as string,
      term_name: this.termForm.termForm.controls.termName.value as string,
      academic_year: this.termForm.termForm.controls.academicYear.value as string,
      start_date: this.termForm.termForm.controls.startDate.value,
      end_date: this.termForm.termForm.controls.endDate.value,
      term_status: this.termForm.termForm.controls.termStatus.value as string,
    }

    console.log(data);
    this.isTermSaving = true;

    this.termsApi.postTerm(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isTermSaving = false;

          sessionStorage.setItem('school_term_id', res.id);
          this.router.navigateByUrl('/home/terms/view-term');
        },
        error: (err) => {
          console.log(err);
          this.isTermSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  getNewTermCodeConfig(){
    this.termsApi.getNewTermCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.termForm.termForm.controls.termCode.disable();

          if(res.code)
            this.termForm.termForm.controls.termCode.setValue(res.code);
          else
            this.termForm.termForm.controls.termCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
