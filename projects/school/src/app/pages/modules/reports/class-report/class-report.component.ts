import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ReportAssessmentsComponent } from '../report-assessments/report-assessments.component';
import { ClassSheetComponent } from '../class-sheet/class-sheet.component';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';
// import { SelectClassComponent } from '../../../select-windows/classes-windows/select-class/select-class.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { ReportsApiService } from 'projects/school/src/app/services/modules-api/reports-api/reports-api.service';
// import { ReportsPrintService } from 'projects/school/src/app/services/printing/reports-print/reports-print.service';

import { Report } from 'projects/school/src/app/models/modules/reports/reports.model';


@Component({
  selector: 'app-class-report',
  templateUrl: './class-report.component.html',
  styleUrls: ['./class-report.component.scss']
})
export class ClassReportComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private reportsApi: ReportsApiService,
    // private reportPrint: ReportPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;
  // @ViewChild('selectClassComponentReference', { read: SelectClassComponent, static: false }) selectClass!: SelectClassComponent;
  @ViewChild('reportAssessmentsComponentReference', { read: ReportAssessmentsComponent, static: false }) reportAssessments!: ReportAssessmentsComponent;
  @ViewChild('classSheetComponentReference', { read: ClassSheetComponent, static: false }) classSheet!: ClassSheetComponent;

  navHeading: any[] = [
    { text: "All Reports", url: "/home/reports/all-reports" },
    { text: "Class Report", url: "/home/reports/view-report" },
  ];

  reportFormData: any;

  selectedTermId = "";
  selectedTermData: any;
  selectedClassId = "";
  selectedClassData: any;

  isReportLoading = false;
  isReportSaving = false;
  isReportDeleting = false;

  reportForm = new FormGroup({
    reportCode: new FormControl(''),
    reportName: new FormControl(''),
    reportDate: new FormControl(''),
    term: new FormControl({value: "", disabled: true}),
    clase: new FormControl({value: "", disabled: true}),
  })

  ngOnInit(): void {
    this.getReport();
  }

  ngAfterViewInit(): void {
    // let activeTerm = this.activeTerm.getActiveTerm();
    // this.reportForm.controls.term.setValue(activeTerm.data.term_name);
    // this.selectedTermId = activeTerm.id;
    // this.selectedTermData = activeTerm.data;
  }

  getReport(){
    this.isReportLoading = true;

    this.reportsApi.getReport()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.reportFormData = res;
          this.isReportLoading = false;

          this.reportForm.controls.reportCode.setValue(this.reportFormData.report_code);
          this.reportForm.controls.reportName.setValue(this.reportFormData.report_name);
          this.reportForm.controls.reportDate.setValue(this.reportFormData.report_date);

          this.selectedClassId = this.reportFormData.clase.id;
          this.reportForm.controls.clase.setValue(this.reportFormData.clase.class_name);
        },
        error: (err) => {
          console.log(err);
          this.isReportLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putReport(){
    let data = {
      report_code: this.reportForm.controls.reportCode.value,
      report_name: this.reportForm.controls.reportName.value,
      report_date: this.reportForm.controls.reportDate.value,
      term: this.selectedTermId,
      clase: this.selectedClassId,
    }

    console.log(data);
    this.isReportSaving = true;

    this.reportsApi.putReport(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isReportSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isReportSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteReport(){
    this.isReportDeleting = true;

    this.reportsApi.deleteReport()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/reports/all-reports');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onAssessmentSelected(assessmentData: any){
    // this.classSheet.assessmentData = assessmentData;
    // this.classSheet.getAssessmentSheet();
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    this.reportForm.controls.term.setValue(termData.term.term_name);
    this.selectedTermId = termData.id;
    this.selectedTermData = termData;
  }

  openClassWindow(){
    console.log("You are opening select term window")
    // this.selectClass.openModal();
  }

  onClassSelected(classData: any){
    console.log(classData);

    this.reportForm.controls.clase.setValue(classData.clase.class_name);
    this.selectedClassId = classData.id;
    this.selectedClassData = classData;
  }

  onPrint(){
    console.log("lets start printing...");
    // this.reportPrint.printViewReport();
  }

}
