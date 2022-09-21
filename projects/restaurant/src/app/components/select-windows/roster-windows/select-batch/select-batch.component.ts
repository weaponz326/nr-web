import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';


@Component({
  selector: 'app-select-batch',
  templateUrl: './select-batch.component.html',
  styleUrls: ['./select-batch.component.scss']
})
export class SelectBatchComponent implements OnInit {

  constructor(private rosterApi: RosterApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  batchesGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.batchesGridData = [];
    this.getRosterBatch(1, 20, "-created_at");
    this.openButton.nativeElement.click();
  }

  getRosterBatch(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.rosterApi.getRosterBatch()
      .subscribe({
        next: (res) => {
          console.log(res);
          
          this.batchesGridData = res;
          this.isFetchingGridData = false;
          
          if(res.length == 0)
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
    this.getRosterBatch(1, 20, column);

    this.currentSortColumn = column;
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
