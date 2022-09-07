import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddTableComponent } from '../add-table/add-table.component';
import { ViewTableComponent } from '../view-table/view-table.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { TablesApiService } from 'projects/restaurant/src/app/services/modules-api/tables-api/tables-api.service';
// import { TablesPrintService } from 'projects/restaurant/src/app/services/printing/tables-print/tables-print.service';


@Component({
  selector: 'app-all-tables',
  templateUrl: './all-tables.component.html',
  styleUrls: ['./all-tables.component.scss']
})
export class AllTablesComponent implements OnInit {

  constructor(
    private router: Router,
    private tablesApi: TablesApiService,
    // private tablesPrint: TablesPrintService
  ) { }

  @ViewChild('addTableComponentReference', { read: AddTableComponent, static: false }) addTable!: AddTableComponent;
  @ViewChild('viewTableComponentReference', { read: ViewTableComponent, static: false }) viewTable!: ViewTableComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Tables", url: "/home/tables/all-tables" },
  ];

  tablesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId: any;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountTable(1, 20, "-created_at");
  }

  getAccountTable(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.tablesApi.getAccountTable(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.tablesGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalItems = res.count;

          this.isFetchingGridData = false;
          if(this.totalItems == 0)
            this.isDataAvailable = false;
          else
            this.isDataAvailable = true;
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
    this.getAccountTable(1, 20, column);

    this.currentSortColumn = column;
  }

  postTable(data: any){
    console.log('u are saving a new table');

    console.log(data);
    this.addTable.isTableSaving = true;

    this.tablesApi.postTable(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.addTable.isTableSaving = false;
          this.addTable.resetForm();
          this.addTable.dismissButton.nativeElement.click();
          this.isDataAvailable = false;

          this.getAccountTable(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.addTable.isTableSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putTable(table: any){
    console.log('u are updating a table');

    console.log(table);
    this.viewTable.isTableSaving = true;

    this.tablesApi.putTable(table.id, table.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.viewTable.dismissButton.nativeElement.click();
          this.viewTable.isTableSaving = false;
          this.getAccountTable(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.viewTable.isTableSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  deleteTable(){
    this.viewTable.isTableDeleting = true;

    this.tablesApi.deleteTable(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.viewTable.isTableDeleting = false;
          this.viewTable.editButton.nativeElement.click();
          this.getAccountTable(1, 20, "-created_at");
        },
        error: (err) => {
          console.log(err);
          this.viewTable.isTableDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.tablesPrint.printAllTables()
  }

}
