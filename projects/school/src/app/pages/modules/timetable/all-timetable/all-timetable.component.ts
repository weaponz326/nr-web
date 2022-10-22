import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { NewTimetableComponent } from '../new-timetable/new-timetable.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

// import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';
import { TimetableApiService } from 'projects/school/src/app/services/modules-api/timetable-api/timetable-api.service';
// import { TimetablePrintService } from 'projects/school/src/app/services/printing/timetable-print/timetable-print.service';


@Component({
  selector: 'app-all-timetable',
  templateUrl: './all-timetable.component.html',
  styleUrls: ['./all-timetable.component.scss']
})
export class AllTimetableComponent implements OnInit {

  constructor(
    private router: Router,
    // private activeTerm: ActiveTermService,
    private timetableApi: TimetableApiService,
    // private timetablePrint: TimetablePrintService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newTimetableComponentReference', { read: NewTimetableComponent, static: false }) newTimetable!: NewTimetableComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "All Timetable", url: "/home/timetable/all-timetable" },
  ];

  activeTermName: any;

  timetableGridData: any[] = [];

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getActiveTerm();
    this.getAccountTimetable(1, 20, "-created_at");
  }

  getActiveTerm(){
    // this.activeTermName = this.activeTerm.getActiveTerm().data.term_name;
  }

  getAccountTimetable(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.timetableApi.getAccountTimetable(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.timetableGridData = res.results;

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
    this.getAccountTimetable(1, 20, column);

    this.currentSortColumn = column;
  }

  viewTimetable(timetableId: any){
    console.log(timetableId);

    sessionStorage.setItem('school_timetable_id', timetableId);
    this.router.navigateByUrl('/home/timetable/full-timetable');
  }

  openTermWindow(){
    console.log("You are opening select term window")
    // this.selectTerm.openModal();
  }

  onTermSelected(termData: any){
    console.log(termData);

    // this.activeTerm.setActiveTerm(termData);
    this.getActiveTerm();
    this.getAccountTimetable(1, 20, "-created_at");
  }

  onPrint(){
    console.log("lets start printing...");
    // this.timetablePrint.printAllTimetable();
  }

}
