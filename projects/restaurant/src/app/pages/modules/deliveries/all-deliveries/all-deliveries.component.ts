import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { DeliveriesApiService } from 'projects/restaurant/src/app/services/modules-api/deliveries-api/deliveries-api.service';
import { DeliveriesPrintService } from 'projects/restaurant/src/app/services/modules-printing/deliveries-print/deliveries-print.service';


@Component({
  selector: 'app-all-deliveries',
  templateUrl: './all-deliveries.component.html',
  styleUrls: ['./all-deliveries.component.scss']
})
export class AllDeliveriesComponent implements OnInit {

  constructor(
    private router: Router,
    private deliveriesApi: DeliveriesApiService,
    private deliveriesPrint: DeliveriesPrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Deliveries", url: "/home/deliveries/all-deliveries" },
  ];

  deliveriesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountDelivery(1, 20, "-created_at");
  }

  getAccountDelivery(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.deliveriesApi.getAccountDelivery(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.deliveriesGridData = res.results;

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
    this.getAccountDelivery(1, 20, column);

    this.currentSortColumn = column;
  }

  viewDelivery(id: any){
    console.log(id);

    sessionStorage.setItem("restaurant_delivery_id", id);
    this.router.navigateByUrl("/home/deliveries/view-delivery");
  }

  onPrint(){
    console.log("lets start printing...");
    this.deliveriesPrint.printAllDeliveries();
  }

}
