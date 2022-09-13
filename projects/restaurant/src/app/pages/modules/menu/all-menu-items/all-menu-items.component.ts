import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';
import { MenuPrintService } from 'projects/restaurant/src/app/services/modules-printing/menu-print/menu-print.service';


@Component({
  selector: 'app-all-menu-items',
  templateUrl: './all-menu-items.component.html',
  styleUrls: ['./all-menu-items.component.scss']
})
export class AllMenuItemsComponent implements OnInit {

  constructor(
    private menuApi: MenuApiService,
    private menuPrint: MenuPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "All Menu Items", url: "/home/menu/all-menu-items" },
  ];

  menuItemsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountMenuItem(1, 20, "-created_at");
  }

  getAccountMenuItem(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.menuApi.getAccountMenuItem(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.menuItemsGridData = res.results;

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
    this.getAccountMenuItem(1, 20, column);

    this.currentSortColumn = column;
  }

  onPrint(){
    console.log("lets start printing...");
    this.menuPrint.printAllMenuItems();
  }

}
