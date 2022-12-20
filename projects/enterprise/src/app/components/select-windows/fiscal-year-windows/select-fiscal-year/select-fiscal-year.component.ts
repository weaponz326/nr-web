import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { FiscalYearApiService } from 'projects/enterprise/src/app/services/modules-api/fiscal-year-api/fiscal-year-api.service';


@Component({
  selector: 'app-select-fiscal-year',
  templateUrl: './select-fiscal-year.component.html',
  styleUrls: ['./select-fiscal-year.component.scss']
})
export class SelectFiscalYearComponent implements OnInit {

  constructor(private fiscalYearApi: FiscalYearApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  fiscalYearGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.fiscalYearGridData = [];
    this.getAccountFiscalYear(1, 20, "-created_at");
    this.openButton.nativeElement.click();
  }

  getAccountFiscalYear(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.fiscalYearApi.getAccountFiscalYear(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.fiscalYearGridData = res.results;

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
    this.getAccountFiscalYear(1, 20, column);

    this.currentSortColumn = column;
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
