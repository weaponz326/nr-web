import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { YearFormComponent } from '../year-form/year-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { FiscalYearApiService } from 'projects/enterprise/src/app/services/modules-api/fiscal-year-api/fiscal-year-api.service';

import { FiscalYear } from 'projects/enterprise/src/app/models/modules/fiscal-year/fiscal-year.model';


@Component({
  selector: 'app-view-year',
  templateUrl: './view-year.component.html',
  styleUrls: ['./view-year.component.scss']
})
export class ViewYearComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private fiscalYearApi: FiscalYearApiService
  ) { }

  @ViewChild('yearFormComponentReference', { read: YearFormComponent, static: false }) yearForm!: YearFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Fiscal Years", url: "/home/fiscal-year/all-years" },
    { text: "View Fiscal Year", url: "/home/fiscal-year/view-year" },
  ];

  yearData: any;

  isYearLoading = false;
  isYearSaving = false;
  isYearDeleting = false;

  isActiveYearSaving = false;

  ngOnInit(): void {
    this.getYear();
    this.getFiscalYearCodeConfig();
  }

  getYear(){
    this.isYearLoading = true;

    this.fiscalYearApi.getFiscalYear()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.yearData = res;
          this.isYearLoading = false;

          this.yearForm.yearForm.controls.yearCode.setValue(this.yearData.year_code);
          this.yearForm.yearForm.controls.yearName.setValue(this.yearData.year_name);
          this.yearForm.yearForm.controls.startDate.setValue(this.yearData.start_date);
          this.yearForm.yearForm.controls.endDate.setValue(this.yearData.end_date);
          this.yearForm.yearForm.controls.yearStatus.setValue(this.yearData.year_status);
        },
        error: (err) => {
          console.log(err);
          this.isYearLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateYear(){
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

    this.fiscalYearApi.putFiscalYear(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isYearSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isYearSaving = false;
          this.connectionToast.openToast();
        }
      }) 
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteYear(){
    this.isYearDeleting = true;

    this.fiscalYearApi.deleteFiscalYear()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/home/fiscal-year/all-years');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  putActiveYear(){
    this.isActiveYearSaving = true;

    let data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      year: sessionStorage.getItem('enterprise_fiscal_year_id') as string,
    };

    console.log(data);

    
  }

  getFiscalYearCodeConfig(){
    this.fiscalYearApi.getFiscalYearCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.entry_mode == "Auto")
            this.yearForm.yearForm.controls.yearCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
  onPrint(){
    console.log("lets start printing...");
    // this.yearsPrint.printViewYear();
  }

}
