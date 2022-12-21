import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { YearFormComponent } from '../year-form/year-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { FiscalYearApiService } from 'projects/enterprise/src/app/services/modules-api/fiscal-year-api/fiscal-year-api.service';

import { FiscalYear } from 'projects/enterprise/src/app/models/modules/fiscal-year/fiscal-year.model';


@Component({
  selector: 'app-add-year',
  templateUrl: './add-year.component.html',
  styleUrls: ['./add-year.component.scss']
})
export class AddYearComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private fiscalYearApi: FiscalYearApiService
  ) { }

  @ViewChild('yearFormComponentReference', { read: YearFormComponent, static: false }) yearForm!: YearFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Add Fiscal Year", url: "/home/fiscal-year/add-year" },
  ];

  isYearSaving = false;

  ngOnInit(): void {
    this.getNewYearCodeConfig();
  }

  postYear(){
    console.log('u are saving a new year');

    var data: FiscalYear = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      year_code: this.yearForm.yearForm.controls.yearCode.value as string,
      year_name: this.yearForm.yearForm.controls.yearName.value as string,
      start_date: this.yearForm.yearForm.controls.startDate.value,
      end_date: this.yearForm.yearForm.controls.endDate.value,
      year_status: this.yearForm.yearForm.controls.yearStatus.value as string,
    }

    console.log(data);
    this.isYearSaving = true;

    this.fiscalYearApi.postFiscalYear(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isYearSaving = false;

          sessionStorage.setItem('enterprise_fiscal_year_id', res.id);
          this.router.navigateByUrl('/home/fiscal-year/view-year');
        },
        error: (err) => {
          console.log(err);
          this.isYearSaving = false;
          this.connectionToast.openToast();
        }
      })        
  }

  getNewYearCodeConfig(){
    
    
  }

}
