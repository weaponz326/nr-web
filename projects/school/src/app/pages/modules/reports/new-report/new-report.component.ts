import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { SelectClassComponent } from '../../../select-windows/classes-windows/select-class/select-class.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { ReportsApiService } from 'projects/school/src/app/services/modules-api/reports-api/reports-api.service';

import { Report } from 'projects/school/src/app/models/modules/reports/reports.model';


@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private reportsApi: ReportsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  // @ViewChild('selectClassComponentReference', { read: SelectClassComponent, static: false }) selectClass!: SelectClassComponent;

  navHeading: any[] = [
    { text: "New Report", url: "/home/report/new-report" },
  ];

  selectedTermId = "";
  selectedClassId = "";

  isReportSaving = false;

  reportForm = new FormGroup({
    reportCode: new FormControl(''),
    reportName: new FormControl(''),
    reportDate: new FormControl(),
    term: new FormControl({value: "", disabled: true}),
    clase: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
    this.getNewReportCodeConfig();
  }

  ngAfterViewInit(): void {
    this.reportForm.controls.reportDate.setValue(new Date().toISOString().slice(0, 10));

    // let activeTerm = this.activeTerm.getActiveTerm();
    // this.reportForm.controls.term.setValue(activeTerm.data.term_name);
    // this.selectedTermId = activeTerm.id;
    // this.selectedTermData = activeTerm.data;
  }

  postReport(){
    let data: Report = {
      account: localStorage.getItem('school_id') as string,
      report_code: this.reportForm.controls.reportCode.value as string,
      report_name: this.reportForm.controls.reportName.value as string,
      report_date: this.reportForm.controls.reportDate.value,
      term: this.selectedTermId,
      clase: this.selectedClassId,
    }

    this.isReportSaving = true;

    this.reportsApi.postReport(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('school_report_id', res.id);
        },
        error: (err) => {
          console.log(err);
          this.isReportSaving = true;
          this.connectionToast.openToast();
        }
      })
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.reportForm.controls.term.setValue(termData.data().term_name);
    this.selectedTermId = termData.id;
  }

  openClassWindow(){
    console.log("You are opening select term window")
    // this.selectClass.openModal();
  }

  onClassSelected(classData: any){
    console.log(classData);

    this.reportForm.controls.clase.setValue(classData.data().class_name);
    this.selectedClassId = classData.id;
  }

  getNewReportCodeConfig(){
    this.reportsApi.getNewReportCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.reportForm.controls.reportCode.disable();

          if(res.code)
            this.reportForm.controls.reportCode.setValue(res.code);
          else
            this.reportForm.controls.reportCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

}
