import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddServiceComponent } from '../add-service/add-service.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

// import { ServicesApiService } from 'projects/restaurant/src/app/services/modules-api/services-api/services-api.service';
// import { ServicesPrintService } from 'projects/restaurant/src/app/services/modules-printing/services-print/services-print.service';


@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss']
})
export class AllServicesComponent implements OnInit {

  constructor(
    private router: Router,
    // private servicesApi: ServicesApiService,
    // private servicesPrint: ServicesPrintService
  ) { }

  @ViewChild('addServiceComponentReference', { read: AddServiceComponent, static: false }) addService!: AddServiceComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Services", url: "/home/services/all-services" },
  ];

  servicesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountService(1, 20, "-created_at");
  }

  getAccountService(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    // this.servicesApi.getAccountService(page, size, sortField)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.servicesGridData = res.results;

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
    this.getAccountService(1, 20, column);

    this.currentSortColumn = column;
  }

  viewService(serviceId: any){
    console.log(serviceId);

    sessionStorage.setItem("restaurant_service_id", serviceId);
    this.router.navigateByUrl("/home/services/view-service");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.servicesPrint.printAllServices()
  }

}
