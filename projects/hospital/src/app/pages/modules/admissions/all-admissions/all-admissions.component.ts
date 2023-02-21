import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewAdmissionComponent } from '../new-admission/new-admission.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { AdmissionsApiService } from 'projects/hospital/src/app/services/modules-api/admissions-api/admissions-api.service';
// import { AdmissionsPrintService } from 'projects/hospital/src/app/services/modules-printing/admissions-print/admissions-print.service';


@Component({
  selector: 'app-all-admissions',
  templateUrl: './all-admissions.component.html',
  styleUrls: ['./all-admissions.component.scss']
})
export class AllAdmissionsComponent implements OnInit {

  constructor(
    private router: Router,
    private admissionsApi: AdmissionsApiService,
    // private admissionsPrint: AdmissionsPrintService
  ) { }

  @ViewChild('newAdmissionComponentReference', { read: NewAdmissionComponent, static: false }) newAdmission!: NewAdmissionComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Admissions", url: "/home/admissions/all-admissions" },
  ];

  admissionsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountAdmission(1, 20, "-created_at");
  }

  getAccountAdmission(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.admissionsApi.getAccountAdmission(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.admissionsGridData = res.results;

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
    this.getAccountAdmission(1, 20, column);

    this.currentSortColumn = column;
  }

  viewAdmission(admissionId: any){
    console.log(admissionId);

    sessionStorage.setItem("hospital_admission_id", admissionId);
    this.router.navigateByUrl("/home/admissions/view-admission");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.admissionsPrint.printAllAdmissions();
  }

}
