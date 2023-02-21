import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewDiagnosisComponent } from '../new-diagnosis/new-diagnosis.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { DiagnosisApiService } from 'projects/hospital/src/app/services/modules-api/diagnosis-api/diagnosis-api.service';
// import { DiagnosisPrintService } from 'projects/hospital/src/app/services/modules-printing/diagnosis-print/diagnosis-print.service';


@Component({
  selector: 'app-all-diagnosis',
  templateUrl: './all-diagnosis.component.html',
  styleUrls: ['./all-diagnosis.component.scss']
})
export class AllDiagnosisComponent implements OnInit {

  constructor(
    private router: Router,
    private diagnosisApi: DiagnosisApiService,
    // private diagnosisPrint: DiagnosisPrintService
  ) { }

  @ViewChild('newDiagnosisComponentReference', { read: NewDiagnosisComponent, static: false }) newDiagnosis!: NewDiagnosisComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Diagnosis", url: "/home/diagnosis/all-diagnosis" },
  ];

  diagnosisGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountDiagnosis(1, 20, "-created_at");
  }

  getAccountDiagnosis(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.diagnosisApi.getAccountDiagnosis(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.diagnosisGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountDiagnosis(1, 20, column);

    this.currentSortColumn = column;
  }

  viewDiagnosis(diagnosisId: any){
    console.log(diagnosisId);

    sessionStorage.setItem("hospital_diagnosis_id", diagnosisId);
    this.router.navigateByUrl("/home/diagnosis/view-diagnosis");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.diagnosisPrint.printAllDiagnosis()
  }

}
