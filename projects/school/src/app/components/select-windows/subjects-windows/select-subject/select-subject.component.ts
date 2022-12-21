import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { SubjectsApiService } from 'projects/school/src/app/services/modules-api/subjects-api/subjects-api.service';


@Component({
  selector: 'app-select-subject',
  templateUrl: './select-subject.component.html',
  styleUrls: ['./select-subject.component.scss']
})
export class SelectSubjectComponent implements OnInit {

  constructor(private subjectsApi: SubjectsApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  subjectsGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
  }

  openModal(){
    this.subjectsGridData = [];
    this.getAccountSubject(1, 20, "-created_at");
    this.openButton.nativeElement.click();
  }

  getAccountSubject(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.subjectsApi.getAccountSubject(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subjectsGridData = res.results;

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
    this.getAccountSubject(1, 20, column);

    this.currentSortColumn = column;
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
