import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TermFormComponent } from '../term-form/term-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { TermsApiService } from 'projects/school/src/app/services/modules/terms-api/terms-api.service';
// import { Term } from 'projects/school/src/app/models/modules/terms/terms.model';


@Component({
  selector: 'app-new-term',
  templateUrl: './new-term.component.html',
  styleUrls: ['./new-term.component.scss']
})
export class NewTermComponent implements OnInit {

  constructor(
    private router: Router,
    // private termsApi: TermsApiService
  ) { }

  @ViewChild('termFormComponentReference', { read: TermFormComponent, static: false }) termForm!: TermFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Term", url: "/home/terms/new-term" },
  ];

  isTermSaving = false;

  ngOnInit(): void {
  }

  createTerm(){
    console.log('u are saving a new term');

    // var data: Term = {
    //   account: localStorage.getItem('school_id') as string,
    //   term_code: this.termForm.termForm.controls.termCode.value,
    //   term_name: this.termForm.termForm.controls.termName.value,
    //   academic_year: this.termForm.termForm.controls.academicYear.value,
    //   start_date: this.termForm.termForm.controls.startDate.value,
    //   end_date: this.termForm.termForm.controls.endDate.value,
    //   term_status: this.termForm.termForm.controls.termStatus.value,
    // }

    // console.log(data);
    this.isTermSaving = true;

    // this.termsApi.createTerm(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isTermSaving = false;

    //       sessionStorage.setItem('school_term_id', res.id);
    //       this.router.navigateByUrl('/home/terms/view-term');
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isTermSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
