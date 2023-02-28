import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { DiagnosisApiService } from 'projects/hospital/src/app/services/modules-api/diagnosis-api/diagnosis-api.service';


@Component({
  selector: 'app-select-diagnosis',
  templateUrl: './select-diagnosis.component.html',
  styleUrls: ['./select-diagnosis.component.scss']
})
export class SelectDiagnosisComponent implements OnInit {

  constructor(private diagnosisApi: DiagnosisApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  diagnosisGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.diagnosisGridData = [];
    this.getAccountDiagnosis(1, 20, "-created_at");
    this.openButton.nativeElement.click();
  }

  getAccountDiagnosis(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.diagnosisApi.getAccountDiagnosis(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.diagnosisGridData = res.results;

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
    this.getAccountDiagnosis(1, 20, column);

    this.currentSortColumn = column;
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
