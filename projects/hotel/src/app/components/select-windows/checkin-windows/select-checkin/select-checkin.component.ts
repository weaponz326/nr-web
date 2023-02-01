import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CheckinApiService } from 'projects/hotel/src/app/services/modules-api/checkin-api/checkin-api.service';


@Component({
  selector: 'app-select-checkin',
  templateUrl: './select-checkin.component.html',
  styleUrls: ['./select-checkin.component.scss']
})
export class SelectCheckinComponent implements OnInit {

  constructor(private checkinApi: CheckinApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  checkinGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.checkinGridData = [];
    this.getAccountCheckin(1, 20, "-created_at");
    this.openButton.nativeElement.click();
  }

  getAccountCheckin(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.checkinApi.getAccountCheckin(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.checkinGridData = res.results;

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
    this.getAccountCheckin(1, 20, column);

    this.currentSortColumn = column;
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
