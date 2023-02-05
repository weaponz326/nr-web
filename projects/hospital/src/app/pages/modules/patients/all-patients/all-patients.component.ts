import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { PatientsApiService } from 'projects/hospital/src/app/services/modules-api/patients-api/patients-api.service';
// import { PatientsPrintService } from 'projects/hospital/src/app/services/modules-printing/patients-print/patients-print.service';


@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.scss']
})
export class AllPatientsComponent implements OnInit {

  constructor(
    private router: Router,
    // private patientsApi: PatientsApiService,
    // private patientsPrint: PatientsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Patients", url: "/home/patients/all-patients" },
  ];

  patientsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  sortParams = {
    field: "created_at",
    direction: "desc"
  }

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountPatient(1, 20, "-created_at");
  }

  getAccountPatient(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.patientsApi.getAccountPatient(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.patientsGridData = res.results;

    //       this.currentPage = res.current_page;
    //       this.totalPages = res.total_pages;
    //       this.totalItems = res.count;

    //       this.isFetchingGridData = false;
    //       if(this.totalItems == 0)
    //         this.isDataAvailable = false          
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountPatient(1, 20, column);

    this.currentSortColumn = column;
  }

  viewPatient(patientId: any){
    console.log(patientId);

    sessionStorage.setItem('hospital_patient_id', patientId);
    this.router.navigateByUrl('/home/patients/view-patient');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.patientsPrint.printAllPatients();
  }

}
