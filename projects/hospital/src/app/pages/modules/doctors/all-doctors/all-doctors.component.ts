import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { DoctorsApiService } from 'projects/hospital/src/app/services/modules-api/doctors-api/doctors-api.service';
// import { DoctorsPrintService } from 'projects/hospital/src/app/services/modules-printing/doctors-print/doctors-print.service';


@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.scss']
})
export class AllDoctorsComponent implements OnInit {

  constructor(
    private router: Router,
    // private doctorsApi: DoctorsApiService,
    // private doctorsPrint: DoctorsPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Doctors", url: "/home/doctors/all-doctors" },
  ];

  doctorsGridData: any[] = [];

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
    this.getAccountDoctor(1, 20, "-created_at");
  }

  getAccountDoctor(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.doctorsApi.getAccountDoctor(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.doctorsGridData = res.results;

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
    this.getAccountDoctor(1, 20, column);

    this.currentSortColumn = column;
  }

  viewDoctor(doctorId: any){
    console.log(doctorId);

    sessionStorage.setItem('hospital_doctor_id', doctorId);
    this.router.navigateByUrl('/home/doctors/view-doctor');
  }

  onPrint(){
    console.log("lets start printing...");
    // this.doctorsPrint.printAllDoctors();
  }

}
