import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-select-roster',
  templateUrl: './select-roster.component.html',
  styleUrls: ['./select-roster.component.scss']
})
export class SelectRosterComponent implements OnInit {

  constructor(private rosterApi: RosterApiService) { }

  @Output() rowSelected = new EventEmitter<object>();

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  rosterGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.rosterGridData = [];
    this.getAccountRoster(1, 20, "-created_at");
    this.openButton.nativeElement.click();
  }

  getAccountRoster(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.rosterApi.getAccountRoster(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.rosterGridData = res.results;

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
    this.getAccountRoster(1, 20, column);

    this.currentSortColumn = column;
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
