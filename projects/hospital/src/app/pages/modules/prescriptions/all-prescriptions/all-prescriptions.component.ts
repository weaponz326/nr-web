import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NewPrescriptionComponent } from '../new-prescription/new-prescription.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { PrescriptionsApiService } from 'projects/hospital/src/app/services/modules-api/prescriptions-api/prescriptions-api.service';
// import { PrescriptionsPrintService } from 'projects/hospital/src/app/services/modules-printing/prescriptions-print/prescriptions-print.service';


@Component({
  selector: 'app-all-prescriptions',
  templateUrl: './all-prescriptions.component.html',
  styleUrls: ['./all-prescriptions.component.scss']
})
export class AllPrescriptionsComponent implements OnInit {

  constructor(
    private router: Router,
    private prescriptionsApi: PrescriptionsApiService,
    // private prescriptionsPrint: PrescriptionsPrintService
  ) { }

  @ViewChild('newPrescriptionComponentReference', { read: NewPrescriptionComponent, static: false }) newPrescription!: NewPrescriptionComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Prescriptions", url: "/home/prescriptions/all-prescriptions" },
  ];

  prescriptionsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountPrescription(1, 20, "-created_at");
  }

  getAccountPrescription(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.prescriptionsApi.getAccountPrescription(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.prescriptionsGridData = res.results;

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
    this.getAccountPrescription(1, 20, column);

    this.currentSortColumn = column;
  }

  viewPrescription(prescriptionId: any){
    console.log(prescriptionId);

    sessionStorage.setItem("hospital_prescription_id", prescriptionId);
    this.router.navigateByUrl("/home/prescriptions/view-prescription");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.prescriptionsPrint.printAllPrescriptions();
  }

}
